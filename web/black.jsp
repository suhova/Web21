<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ru">
<head>
  <title>Messages</title>
  <meta charset="utf-8">
</head>
<body>
<header class="todos-header">MESSAGES</header>
<nav>
  <div id="div_logout">
    <button id="logout" class="but_logout" OnClick="logout();">LOG OUT</button>
  </div>
  <script language="JavaScript">
    function logout()
    {
      window.open('http://localhost:8080/','_self');
    }
  </script>
</nav>
<main class="todo-list">
  <div id="listblack">
    <form method="post">
    <div class="todo-list__head list-head">
      <button id="addblack" name="addblack" type="submit" class="list-head__select-all">ADD</button>
      <div class="list-head__create-new">
        <input type="text" id="useridblack" name="useridblack" class="list-head__create-new-input_list" placeholder="NEW BLOCKED USER LOGIN"
               autofocus="autofocus"/>
      </div>
    </div>
    </form>
  </div>
  <div id="res" class="todo-list__tasks">
    <%
      List<String> names = (List<String>) request.getAttribute("blist");
      if (names != null && !names.isEmpty()) {
        out.println("<ul class=\"todo-list__task-list tasks\">");
        for (String s : names) {
          out.println("<li class=\"todo-list__task-item task-item\">\n" +
                  "                <div class=\"task-item__view\"> \n" +
                  "                    <span class=\"task-item__text\">" + s.substring(11, s.length()-2) + "</span>\n" +
                  "                </div>\n" +
                  "            </li>");
        }
        out.println("</ul>");
      }
    %>
  </div>
  <style type="text/css">
    body {
      display: flex;
      font-family: "Roboto", sans-serif;
      background: rgba(0, 0, 0, 0.001);
      color: #CCCCCC;
      flex-flow: column;
      align-items: center;
    }
    .todos-header {
      font-size: 100px;
      letter-spacing: -2.5px;
      top: 50px;
      position: relative;
    }

    .todo-list {
      display: flex;
      flex-flow: column;
      width: 762px;
      height: 402px;
      background-color: white;
      border-radius: 2px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
      position: relative;
      top: 50px;
    }

    .todo-list__head {
      display: flex;
      flex-direction: row;
      height: 66px;
      box-shadow: inset 0px -1px 0px #E6E6E6;
    }

    .list-head__select-all {
      width: 70px;
      height: 66px;
      border: white 1px solid;
      font-size: 14px;
      background-color: darkorange;
      color: white;
      font-style: italic;
      letter-spacing: -0.6px;
    }

    .list-head__create-new {
      align-self: center;
    }

    .list-head__create-new-input_list {
      font-style: italic;
      position: relative;
      left: 5px;
      height: 50px;
      border: 0;
      width: 650px;
      font-size: 24px;
      letter-spacing: -0.6px;
      color: #666666;
    }

    input, textarea {
      outline: none;
    }

    input:active, textarea:active {
      outline: none;
    }

    :focus {
      outline: none;
    }

    textarea {
      resize: none;
    }

    textarea {
      resize: vertical;
    }

    textarea {
      resize: horizontal;
    }

    .todo-list__tasks {
      flex-grow: 1;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    nav {
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      height: 43px;
      width: 100%;
      font-size: 14px;
      letter-spacing: -0.35px;
      color: #888888;
      background-color: darkorange;
      box-shadow: inset 0px 1px 0px #E6E6E6;
      align-items: center;
      position: absolute;
      top: 0px;
    }

    .actions-bar__item {
      padding: 0px 12px 0px 12px;
      align-self: center;
    }

    .task-filter {
      display: flex;
    }

    .task-filter__text {
      border: 1px solid white;
      width: 300px;
      border-radius: 2px;
      padding: 3px;
      font-size: 20px;
      background-color: darkorange;
      color: white;
    }
    .but_logout {
      background-color: white;
      color: darkorange;
      font-weight: bolder;
      border: 0px;
      width: 80px;
    }
    .tasks {
      width: 100%;
      padding: 0;
      margin: 0;
    }

    .todo-list__task-item {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 64px;
      box-shadow: inset 0px -1px 0px #E6E6E6;
      font-size: 24px;
      letter-spacing: -0.6px;
      color: #666666;
      overflow-wrap: break-word;
      word-wrap: normal;
    }

    .task-item__text {
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      width: 80px;
      height: auto;
      border: 0;
    }

    .task-item__user {
      position: relative;
      left: 0;
      padding-left: 10px;
      padding-right: 10px;
      width: max-content;
      float: left;
      height: 100%;
      background-color: white;
      color: darkorange;
      border: darkorange 1px solid;
    }
    .but_logout:hover {
      background-color: darkorange;
      color: white;
      font-weight: bolder;
      border: 2px solid white;
    }
    .list-head__create-new-input_list::placeholder {
      font-style: italic;
      font-size: 24px;
      letter-spacing: -0.6px;
      color: #cccccc;
    }
    h1 {
      color: white;
    }
  </style>
</main>
</body>
</html>