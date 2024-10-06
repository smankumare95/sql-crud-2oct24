const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const connect = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12735709",
  password: "Vxy2pZLfGN",
  database: "sql12735709",
});

app.post("/store", (req, res) => {
  let data = [req.body.rno, req.body.name, req.body.marks];
  let sql = "insert into student values (?, ?, ?)";
  connect.query(sql, data, (error, result) => {
    if (error) res.send(error);
    else res.send(result);
  });
});

app.get("/get", (req, res) => {
  let sql = "select * from student";
  connect.query(sql, (error, result) => {
    if (error) res.send(error);
    else res.send(result);
  });
});

app.delete("/delete", (req, res) => {
  let data = [req.body.rno];
  let sql = "delete from student where rno=?";
  connect.query(sql, data, (error, result) => {
    if (error) res.send(error);
    else res.send(result);
  });
});

app.get("/get/:rno", (req, res) => {
  let data = [req.params.rno];
  let sql = "select * from student where rno=?";
  connect.query(sql, data, (error, result) => {
    if (error) res.send(error);
    else if (result.affectedRows === 0)
      res.status(404).send("Student not found");
    else res.send(result[0]);
  });
});

app.put("/update", (req, res) => {
  let data = [req.body.name, req.body.marks, req.body._rno];
  let sql = "update student set name=?, marks=? where rno=?";
  connect.query(sql, data, (error, result) => {
    if (error) res.send(error);
    else if (result.affectedRows === 0)
      res.status(404).send("Student not found");
    else res.send(result);
  });
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
