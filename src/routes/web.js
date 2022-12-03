import express from "express";
import controller from "../controller/homeController";

let router = express.Router();
const initWebRoute = (app) => {
    // home
    router.get('/', controller.getHomePage);
    return app.use('/', router);
}

export default initWebRoute;