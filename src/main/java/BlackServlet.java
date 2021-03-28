import com.mongodb.BasicDBObject;
import com.mongodb.Cursor;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import groovy.json.JsonOutput;

import javax.servlet.RequestDispatcher;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "BlackServlet", value = "/black")
public class BlackServlet extends HttpServlet {
    String user = "";
    public static String db_name = "admin", db_collection_name = "blacklist";

    private static MongoClient getConnection() throws UnknownHostException {
        int port_no = 27017;
        String url = "localhost";
        MongoClient mongoClntObj = new MongoClient(url, port_no);
        return mongoClntObj;
    }

    public static List<String> getBlockedUsers(String userId) throws UnknownHostException {
        List<String> res = new ArrayList<>();
        DBCollection col =  getConnection().getDB(db_name).getCollection(db_collection_name);
        Cursor cursor = col.find(new BasicDBObject().append("user", userId),
                new BasicDBObject()
                .append("friend", 1)
                .append("_id", 0));
        while (cursor.hasNext()) {
            DBObject o = cursor.next();
            res.add(JsonOutput.toJson(o));
        }
        return res;
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws UnknownHostException, IOException {
        String name = req.getParameter("useridblack");
        if (name != null && name.length()!=0) {
            DBCollection col = getConnection().getDB(db_name).getCollection(db_collection_name);
            if (col.find(new BasicDBObject().append("user", user).append("friend", name)).size() == 0) {
                col.insert(new BasicDBObject().append("user", user).append("friend", name));
            }
        }
        doGet(req, resp);
    }
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter printWriter = response.getWriter();
        String par = request.getParameter("id");
        if(par != null){
            user = par;
        }
        try {
            RequestDispatcher requestDispatcher = request.getRequestDispatcher("black.jsp");
            List<String> res = getBlockedUsers(user);
            request.setAttribute("blist", res);
            requestDispatcher.forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}