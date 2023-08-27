import sql from 'mssql';
import sqlite3 from 'sqlite3';

// SQL Server database configuration
const sqlServerConfig = {
    user: 'sinan1',
    password: '12345',
    server: 'SINAN-LAPTOP',
    database: 'student',

  options: {
    // encrypt: true, // Use this if you're connecting to an Azure SQL database
  trustServerCertificate: true,
  },
};

// SQLite database connection
const sqliteDB = new sqlite3.Database('student.db');

// create table named doctors_list in sqlite-database.db
sqliteDB.run('CREATE TABLE IF NOT EXISTS doctors_list (Name TEXT, Category TEXT, Qualification TEXT, Hospital TEXT, Number TEXT, Picture_link TEXT, uniq_id TEXT)');

async function main() {
  try {
    // Connect to SQL Server
    await sql.connect(sqlServerConfig);

    // Retrieve data from SQL Server
    const result = await sql.query('SELECT * FROM doctors_list');

    // Insert data into SQLite
    result.recordset.forEach(row => {
      sqliteDB.run('INSERT INTO doctors_list (Name, Category, Qualification, Hospital, Number, Picture_link, uniq_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [row.Name, row.Category, row.Qualification, row.Hospital, row.Number, row.Picture_link, row.uniq_id], error => {
          if (error) {
            console.error('SQLite Insert Error:', error);
          } else {
            console.log('Row inserted into SQLite:', row);
          }
        });
    });
    
    // Close the SQLite connection
    sqliteDB.close();

    console.log('Data migration complete.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    sql.close();
  }
}

main();
