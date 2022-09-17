import express from "express";
import router from "./src/routes/Router";
import dotenv from "dotenv";
import cors from "cors"
import path from "path";
import engine from "consolidate";
import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

dotenv.config()

const port = process.env.PORT || 3000
const app = express()

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Disney - Alkemy",
            version: "1.0.0"
        },
        servers: [
            {
                url: `${process.env.SERVER_HOST}`
            },
            {
                url: `http://localhost:${process.env.PORT}`
            }
        ]
    },
    apis: ["./src/docs/**/*.yaml"]
}


app.set('views', path.join(__dirname + '/views'));
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.render("index.html")
})

app.use(router)
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)))

app.listen(port, () => {
    console.log(`Servidor Funcionando en puerto: ${port}`)
})
