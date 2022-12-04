import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";

const app = express();
const port = 20593;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);

initWebRoute(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});