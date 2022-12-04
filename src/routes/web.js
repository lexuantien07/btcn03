import express from "express";
import controller from "../controller/homeController";

let router = express.Router();
const initWebRoute = (app) => {
    // home
    router.get('/', controller.getHomePage);
    router.get('/detail/:movieID', controller.getDetailPage);
    router.post('/search', controller.postSearchPage);
    return app.use('/', router);
}

export default initWebRoute;