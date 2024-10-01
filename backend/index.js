import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

dotenv.config();
const app = express();
const port = process.env.APIPORT || 3000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const db = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todolist ORDER BY date");
    res.send(result.rows);
  } catch (err) {
    console.log("/", err);
  }
});

app.post("/newTask", async (req, res) => {
  try {
    const task = req.body["task"];
    const time = req.body["time"];
    const status = req.body["status"];
    await db.query(
      "INSERT INTO todolist (task, date, status) VALUES ($1, $2, $3)",
      [task, time, status]
    );
  } catch (err) {
    console.log("/newTask", err);
  }
  // console.log(req.body);
});

app.delete("/deleteTask", async (req, res) => {
  // console.log(req.body);
  try {
    const id = req.body["dId"];
    await db.query("DELETE FROM todolist WHERE id = $1", [id]);
  } catch (err) {
    console.log("/deleteTask", err);
  }
});

app.patch("/updateTask", async (req, res) => {
  try {
    const id = req.body["dId"];
    const task = req.body["task"];
    await db.query("UPDATE todolist SET task=$1 WHERE id = $2", [task, id]);
  } catch (err) {
    console.log("/updateTask", err);
  }
});

app.patch("/updateStatus", async (req, res) => {
  try {
    const id = req.body["dId"];
    const status = req.body["status"];
    await db.query("UPDATE todolist SET status=$1 WHERE id = $2", [status, id]);
  } catch (err) {
    console.log("/updateStatus", err);
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
