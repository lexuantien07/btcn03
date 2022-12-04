import express from "express";
import controller from "../controller/homeController";

let router = express.Router();
const initWebRoute = (app) => {
    // home
    router.get('/', controller.getPage);
    router.post('/home', controller.getHomePageLogin);
    router.get('/home', controller.getHomePage);
    router.get('/detail/:movieID', controller.getDetailPage);
    router.get('/page', controller.getSearchPage);
    router.post('/search', controller.postSearchPage);
    router.get('/signup', controller.getSignUpPage);
    router.post('/signuppost', controller.postSignUpPage);
    return app.use('/', router);
}

export default initWebRoute;