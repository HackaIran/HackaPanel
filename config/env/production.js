
module.exports = {
  env: 'production',
  secret: 'server',
  db: {
    database: 'server',
    host: 'localhost',
    port: 3306,
    user: '',
    password: '',
    connectionLimit: 10,
    multipleStatements: false
  }
};