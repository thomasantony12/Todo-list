import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials:true,
    optionSuccessStatus:200
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("hi");
})

app.post("/newTask", (req, res) => {
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})