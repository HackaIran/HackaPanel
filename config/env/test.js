
module.exports = {
  env: 'test',
  secret: 'server',
  db: {
    database: 'server-test',
    host: 'localhost',
    port: 3306,
    user: '',
    password: '',
    connectionLimit: 10,
    multipleStatements: true
  }
};