package controllers;


import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render("Your new application is ready. RainBous are awesome!"));
    }

    public static Result hello() {
        return ok(hello.render("Woo!"));
    }



}
