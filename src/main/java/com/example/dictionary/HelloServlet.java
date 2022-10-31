package com.example.dictionary;

import java.io.*;
import java.sql.SQLException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        System.out.println("GetStart");
        try {
            if(request.getParameter("task").equals("add")) {
                insertRequest(request);
            }else{
                deleteRequest(request);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private String getJson(Object resp) {
        GsonBuilder builder = new GsonBuilder();
        Gson response = builder.create();
        return response.toJson(resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        System.out.println("****** doPost is working ******");
        PrintWriter printWriter = resp.getWriter();
        DBDictionaryAgent agent = new DBDictionaryAgent(System.getenv("url"), System.getenv("userName"),
                 System.getenv("password"));

        printWriter.print(getJson(agent.getDictionary(agent.dictionaryList())));
    }

    private void deleteRequest(HttpServletRequest request) throws SQLException{
        DBDictionaryAgent agent = new DBDictionaryAgent(System.getenv("url"), System.getenv("userName"),
                System.getenv("password"));
        agent.deleteDictionary(request.getParameter("keyword"));
    }

    public void insertRequest(HttpServletRequest request) throws SQLException{
        DBDictionaryAgent agent = new DBDictionaryAgent(System.getenv("url"), System.getenv("userName"),
                System.getenv("password"));
        agent.addDictionary(request.getParameter("keyword"));
    }

    public void destroy() {
    }
}