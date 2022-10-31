<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Dictionary</title>
    <link rel="stylesheet" href="style1.css">
</head>
<body>
<div class="container">
<%--    <div id="layer_one" class="modal"></div>--%>
    <div id="dictionary" class="dictionary"></div>
    <div id="updates" class="updates">
        <div id="add" class="update">
            <input type="text" name="keyword" id="keyword" placeholder="Слово">
            <input type="button" id="addButton" value="Add" onclick="addRequest()">
        </div>
        <div id="delete" class="update">
            <select id="select"></select>
            <input type="button" id="delButton" value="Delete" onclick="deleteRequest()">
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js"></script>
<script src="script.js"></script>
<script src="addDelRequest1.js"></script>
<%--<a href="hello-servlet">Hello Servlet</a>--%>
</body>
</html>