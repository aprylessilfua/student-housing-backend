const db = require('./db');

(async () => {
  console.log('Fetching all students...');
  const result = await db.query('SELECT * FROM users WHERE role = $1', ['student']);
  console.log(result.rows);
})();
