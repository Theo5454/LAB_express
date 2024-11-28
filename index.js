const express = require('express');
const mysql = require('mysql2');
const port = 3000;

const app = express();

let dbConnect = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',

   database: 'MyDataBase',
});

dbConnect.connect((error) => {
   if (error) {
      throw error;
   }
   console.log('Everything looks good !');
});

app.get('/', (req, res) => {
   res.send('Hello World');
});

app.get('/db', (req, res) => {
   let sql = 'CREATE DATABASE IF NOT EXISTS MyDataBase';
   dbConnect.query(sql, (err, result) => {
      if (err) {
         throw err;
      }
      console.log(result);
      res.send('Database created or already exists!');
   });
});

app.get('/users', (req, res) => {
   const sql =
      'CREATE TABLE users (first_name VARCHAR(40),last_name VARCHAR(40), email VARCHAR(40), id INT AUTO_INCREMENT, PRIMARY KEY(id))';
   dbConnect.query(sql, (err, result) => {
      if (err) {
         throw err;
      }
      console.log(result);
   });
   res.send('users table is created !');
});

app.get('/adduser', (req, res) => {
   let firstName = 'Alex';
   let lastName = 'Chow';
   let email = 'alex.chow@yahoo.ca';

   const sql = 'INSERT INTO users (first_name,last_name,email) VALUES(?,?,?)';

   dbConnect.query(sql, [firstName, lastName, email], (err, result) => {
      if (err) {
         throw err;
      }
      console.log('One user was added');
   });
});

app.get('/update/:id', (req, res) => {
   const userId = req.params.id;
   const sql = 'UPDATE users SET first_name = "Jake" WHERE id = ?';
   dbConnect.query(sql, [userId], (err, result) => {
      if (err) {
         throw err;
      }
      console.log(result);
   });
   res.send('One user was updated');
});

app.get('/delete/:id', (req, res) => {
   const userId = req.params.id;
   const sql = 'DELETE FROM users WHERE id = ?';
   dbConnect.query(sql, [userId], (err, result) => {
      if (err) {
         throw err; // show message and stop my application
      }
      console.log(result);
   });
   res.send('One user was deleted');
});

app.listen(port, () => {
   console.log(`Website : http://localhost:${port}`);
});
