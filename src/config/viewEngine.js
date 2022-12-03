import express from "express";
import { engine } from 'express-handlebars';

const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './src/views');
};

export default configViewEngine;