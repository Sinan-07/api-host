import {v4 as uuid} from "uuid";
import crypto from 'crypto';
// const sql = require('mssql');
import sql from "mssql";
let users = [];
const config = {
    user: 'sinan1',
    password: '12345',
    server: 'SINAN-LAPTOP',
    database: 'student',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  };
export const getUsers = (req, res) => {
    const pool = new sql.ConnectionPool(config);

    pool.connect((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while connecting to the database');
      }
  
      const request = pool.request();
      const query = `SELECT * FROM doctors_list;`;
  
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred while executing the SQL query');
        }
  
        const rows = result.recordset;
        console.log(rows);
        res.send(rows);
        // res.render('display', { rows });
    // res.send(users);
    
});
});
};

export const createUsers = (req, res) => {
    // const user = req.body;
    // users.push({...user, id: uuid()});
    // res.send(`User added to the database!`);
    let uniq_id= crypto.randomUUID();
// let {uniq_id}=uuid;
console.log(uniq_id);
const {Name, Category, Qualification,Hospital,Number,Picture_link} = req.body;
  const pool = new sql.ConnectionPool(config);
//   console.log(ID);

  pool.connect((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while connecting to the database');
    }

    const request = pool.request();
    // request.input('ID', sql.Int, ID);
    request.input('Name', sql.NVarChar(50), Name);
    request.input('Category', sql.NVarChar(50), Category);
    request.input('Qualification', sql.NVarChar(100), Qualification);
    request.input('Hospital', sql.NVarChar(100), Hospital);
    request.input('Number', sql.NVarChar(20), Number);
    request.input('Picture_link', sql.NVarChar(500), Picture_link);
    request.input('uniq_id', sql.NVarChar(50), uniq_id);


    const query = `INSERT INTO doctors_list (Name,Category, Qualification,Hospital,Number,Picture_link,uniq_id) VALUES (@Name, @Category, @Qualification,@Hospital,@Number,@Picture_link, @uniq_id);`;
    request.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while executing the SQL query');
      }
      // res.send(`user with the id ${ID} added to the database.`);
      // req.flash('inserted', 'User Added Successfully');
      // res.redirect('/users');
      res.send(`User added to the database!`);
    //   return res.redirect('/success');
    });
  });
}

export const getUser = (req, res) => {
    const {ID} = req.params;
    // const foundUser = users.filter((user) => user.id === id);
    // res.send(foundUser);
    const pool = new sql.ConnectionPool(config);

    pool.connect((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while connecting to the database');
      }
  
      const request = pool.request();
      request.input('ID', sql.Int, ID);
      const query = `SELECT * FROM doctors_list where ID=@ID;`;
  
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred while executing the SQL query');
        }
  
        const rows = result.recordset;
        console.log(rows);
        res.send(rows);
        // res.render('display', { rows });
    // res.send(users);
    
});
});

}

export const deleteUser = (req, res) => {
    // const {id} = req.params;
    // users = users.filter((user) => user.id !== id);
    const {ID}=req.params;
    const pool = new sql.ConnectionPool(config);

    pool.connect((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while connecting to the database');
      }
  
      const request = pool.request();
      
      request.input('ID', sql.Int, ID);
      const query = `DELETE FROM doctors_list WHERE ID = @ID;`;
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred while executing the SQL query');
        }
     
        res.send(`User deleted from the database!`);

      });
    });
    // users= users.filter((user)=>user.id!= id );
   
}

export const updateUser = (req, res) => {

    const {ID}=req.params;
    const {Name, Category, Qualification,Hospital,Number,Picture_link,}= req.body;
    const pool = new sql.ConnectionPool(config);
    //   console.log(ID);
    
      pool.connect((err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred while connecting to the database');
        }
    
        const request = pool.request();
        request.input('ID', sql.Int, ID);
        request.input('Name', sql.NVarChar(50), Name);
        request.input('Category', sql.NVarChar(50), Category);
        request.input('Qualification', sql.NVarChar(100), Qualification);
        request.input('Hospital', sql.NVarChar(100), Hospital);
        request.input('Number', sql.NVarChar(20), Number);
        request.input('Picture_link', sql.NVarChar(500), Picture_link);
    
        const query = `UPDATE doctors_list SET Name = @Name, Category = @Category, Qualification= @Qualification,Hospital=@Hospital,Number=@Number,Picture_link=@Picture_link where ID=@ID;`;
        request.query(query, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while executing the SQL query');
          }
  
         
        res.send(`User with id ${ID} has been updated!`);
       
        });
      });
}