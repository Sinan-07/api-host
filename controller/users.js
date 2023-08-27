import { v4 as uuid } from "uuid";
import crypto from "crypto";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("student.db");

// Log database connection
console.log("Connected to the database");

export const getUsers = (req, res) => {
  console.log("getUsers");
  const query = `SELECT * FROM doctors_list;`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).send("An error occurred while executing the SQL query");
    }

    console.log("Rows:", rows);
    res.send(rows);
  });
};

export const createUsers = (req, res) => {
  let uniq_id = crypto.randomUUID();
  const { Name, Category, Qualification, Hospital, Number, Picture_link } = req.body;

  const query = `INSERT INTO doctors_list (Name, Category, Qualification, Hospital, Number, Picture_link, uniq_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?);`;

  db.run(query, [Name, Category, Qualification, Hospital, Number, Picture_link, uniq_id], function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("An error occurred while executing the SQL query");
    }

    res.send("User added to the database!");
  });
};

export const getUser = (req, res) => {
  const { ID } = req.params;
  const query = `SELECT * FROM doctors_list WHERE ID = ?;`;

  db.get(query, [ID], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while executing the SQL query");
    }

    console.log(row);
    res.send(row);
  });
};

export const deleteUser = (req, res) => {
  const { ID } = req.params;
  const query = `DELETE FROM doctors_list WHERE ID = ?;`;

  db.run(query, [ID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while executing the SQL query");
    }

    res.send(`User deleted from the database!`);
  });
};

export const updateUser = (req, res) => {
  const { ID } = req.params;
  const { Name, Category, Qualification, Hospital, Number, Picture_link } = req.body;
  const query = `UPDATE doctors_list SET Name = ?, Category = ?, Qualification = ?, Hospital = ?, Number = ?, Picture_link = ? WHERE ID = ?;`;

  db.run(
    query,
    [Name, Category, Qualification, Hospital, Number, Picture_link, ID],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred while executing the SQL query");
      }

      res.send(`User with id ${ID} has been updated!`);
    }
  );
};
