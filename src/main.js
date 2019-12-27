const {Pool, Client} = require('pg');
const client = new Client();

const pool = new Pool({
    user: 'postgres',
    host : 'localhost',
    database : 'postgres',
    port : 5432
});

pool.query('SELECT * from child', (err, res) => {
    for (let i = 0; i < res.rows.length; i++) {
        const row = res.rows[i];
        console.log(row["firstname"]);
        console.log(row);
    }

    pool.end();
});