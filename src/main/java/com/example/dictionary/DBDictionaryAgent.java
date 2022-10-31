package com.example.dictionary;

import jakarta.servlet.http.HttpServletRequest;

import java.sql.*;
import java.util.LinkedList;

public class DBDictionaryAgent {
    private String url;
    private String userName;
    private String password;
    private Connection connection;

    private LinkedList<String> list;


    public DBDictionaryAgent(String url, String userName, String password) {
        this.url = url;
        this.userName = userName;
        this.password = password;
        try {
            this.connection = DriverManager.getConnection(url, userName, password);
            System.out.println("start connect");
        }catch (SQLException e){
            System.out.println("connection failed");
            throw new RuntimeException(e);
        }
        list = new LinkedList<String>();
    }

    public LinkedList<String> dictionaryList(){
        String query = "SELECT stationName FROM KEYWORD ORDER BY(stationName)";
        Statement statement;
        try{
            statement = this.connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()){
                list.add(resultSet.getString("stationName"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return list;
    }

    public LinkedList<LinkedList<String>> getDictionary(LinkedList<String> lists){
        LinkedList<LinkedList<String>> listToAdd = new LinkedList<>();
        int index = 0;

        while (index < lists.size() - 1){
            index = getListByLetter(lists, index, listToAdd);
        }
        return listToAdd;
    }

    public int getListByLetter(LinkedList<String> lists, int index, LinkedList<LinkedList<String>> listToAdd){
        LinkedList<String> getFirstLetter = new LinkedList<>();
        getFirstLetter.add(String.valueOf(lists.get(index).charAt(0)));
        while(String.valueOf(lists.get(index).charAt(0)).equals(getFirstLetter.get(0)) && index < lists.size() - 1){
            getFirstLetter.add(lists.get(index));
            index++;
        }
        if(index == lists.size() - 1){
            getFirstLetter.add(lists.get(index));
        }
        listToAdd.add(getFirstLetter);
            return index;
    }

    public void deleteDictionary(String keyword) throws SQLException{
        String query = "DELETE FROM KEYWORD WHERE stationName = \"" + keyword + "\"";
        System.out.println(query);
        Statement statement = connection.createStatement();
        statement.executeUpdate(query);
    }

    public void addDictionary(String keyword) throws SQLException{
        if(((byte)keyword.charAt(0) > 15 && (byte)keyword.charAt(0) < 49) || (byte)keyword.charAt(0) == 1){
            String query = "INSERT INTO KEYWORD (stationName) VALUES (\"" + keyword + "\");";
            System.out.println(query);
            Statement statement = connection.createStatement();
            statement.executeUpdate(query);
        }else return;
    }


}
