/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express');
const sql = require('mssql');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// SQL Server connection configuration
const sqlConfig = {
  user: 'tp',
  password: 'tp',
  server: 'db11.sauels.de',
  database: 'PP-ProzesseTS1',
  options: {
    encrypt: false,
    enableArithAbort: true
  }
};

// Function to connect to SQL Server database and execute a query
async function connectToSqlServer() {
  try {
  const sqlConnetion =  await sql.connect(sqlConfig);
    console.log('Connected to SQL Server');

    return sqlConnetion;
  
  } catch (err) {
    console.error('Error connecting to SQL Server or executing query:', err);
  }
}

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello remote world!\n');
});

app.listen(PORT, HOST, async () => {
 const sqlConnetion = await connectToSqlServer();
 sqlConnetion.query('SELECT * FROM users where id = 204', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Query result:', result.recordset);
  }
 );
  console.log(`Running on http://${HOST}:${PORT}`);
});
