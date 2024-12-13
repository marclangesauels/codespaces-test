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
  user: 'your_username',
  password: 'your_password',
  server: 'your_server',
  database: 'your_database',
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

// Function to connect to SQL Server database
async function connectToSqlServer() {
  try {
    await sql.connect(sqlConfig);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Error connecting to SQL Server:', err);
  }
}

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello remote world!\n');
});

app.listen(PORT, HOST, async () => {
  await connectToSqlServer();
  console.log(`Running on http://${HOST}:${PORT}`);
});
