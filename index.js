import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Thoma$2580",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function select() {
  const result = await db.query("SELECT * FROM items ORDER BY title ASC;");
  const data = [];
  result.rows.forEach((element) => {
    data.push(element);
  });
  return data;
}

async function insert(title) {
  return await db.query("INSERT INTO items (title) VALUES ($1);", [title]);
}

async function update(id, title) {
  return await db.query("UPDATE items SET title = $1 WHERE id = $2;", [
    title,
    id,
  ]);
}
async function dlt(id) {
  return await db.query("DELETE FROM items where id = $1;", [id]);
}

app.get("/", async (req, res) => {
  items = await select();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const title = req.body.newItem;
  await insert(title);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const id = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;
  await update(id, title);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  await dlt(id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
