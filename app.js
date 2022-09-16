import express from "express";
import router from "./src/routes/Router";
import dotenv from "dotenv";
import path from "path";
import engine from "consolidate";

dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app.set('views', path.join(__dirname + '/views'));
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(express.json())

app.get("/", (req, res) => {
    res.render("index.html")
})

app.use(router)

app.listen(port, () => {
    console.log(`Servidor Funcionando en puerto: ${port}`)
})
