// const sql = require('msnodesqlv8');

// // Try connecting to news database with working driver
// const newsConnectionString = "Server=Moe;Database=news;Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}";

// console.log("Trying to connect to news database:");
// console.log(newsConnectionString);

// sql.query(newsConnectionString, "SELECT TOP 5 * FROM news", (err, rows) => {
//   if (err) {
//     console.error("Connection to news database failed:", err);
    
//     // Try checking if news database exists
//     const masterConnectionString = "Server=Moe;Database=master;Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}";
//     sql.query(masterConnectionString, "SELECT name FROM sys.databases WHERE name = 'news'", (checkErr, checkRows) => {
//       if (checkErr) {
//         console.error("Error checking if news database exists:", checkErr);
//       } else {
//         if (checkRows.length === 0) {
//           console.log("The 'news' database doesn't exist!");
//         } else {
//           console.log("The 'news' database exists but you may not have permission to access it.");
//         }
//       }
//     });
//   } else {
//     console.log("Connection to news database successful!");
//     console.log(`Retrieved ${rows.length} rows from news table`);
//     console.log(rows);
//   }
// });