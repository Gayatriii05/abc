const mysql = require('mysql2/promise'); // Ensure this line is present
require('dotenv').config();


const pool = mysql.createPool({
    host: 'localhost',   // Keep localhost unless you're using a remote DB
    user: 'clinic_user', // Use the new MySQL user
    password: '@bt23f05f062!', // Use the password you set
    database: 'skin_elegance_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
