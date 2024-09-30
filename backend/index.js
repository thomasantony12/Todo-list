import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

dotenv.config();
const app = express();
const port = process.env.APIPORT || 3000;
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials:true,
    optionSuccessStatus:200
}
const db = new pg.Client({
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.UNAME,
    password: process.env.PASSWORD,
    port: process.env.DBPORT
})

db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", async (req, res) => {
    const result = await db.query('SELECT * FROM todolist ORDER BY date');
    res.send(result.rows);
})

app.post("/newTask", async (req, res) => {
    // console.log(req.body);
    const task = req.body["task"];
    const time = req.body["time"];
    const status = "Active";
    await db.query('INSERT INTO todolist (task, date, status) VALUES ($1, $2, $3)',[task, time, status]);
})

app.delete("/deleteTask", async (req, res) => {
    // console.log(req.body);
    const id = req.body["dId"];
    await db.query('DELETE FROM todolist WHERE id = $1',[id]);
})

app.patch("/updateTask", async (req, res) => {
    const id = req.body["dId"];
    const task = req.body["task"];
    await db.query('UPDATE todolist SET task=$1 WHERE id = $2',[task,id]);
})

app.patch("/updateStatus", async (req, res) => {
    const id = req.body["dId"];
    const status = req.body["status"];
    await db.query('UPDATE todolist SET status=$1 WHERE id = $2',[status,id]);
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})