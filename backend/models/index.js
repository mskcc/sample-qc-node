// const dbConfig = require('../config/db.config.js');

// const { connection } = require('mongoose');
const Sequelize = require('sequelize');
// use sequelize to connect to db
// update .env with connection string
// const sequelize = new Sequelize
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PW, {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  operatorsAliases: 0,
  //   if we want to globally disable
  //   define: {
  //       timestamps: false
  //   }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

var initModels = require('./init-models');
db.models = initModels(sequelize);

// db.users = require('./user.model.js')(sequelize, Sequelize);
// db.comments = require('./comment.model.js')(sequelize, Sequelize);
// db.decisions = require('./decision.model.js')(sequelize, Sequelize);
// db.commentrelations = require('./commentrelation.model.js')(sequelize, Sequelize);

// relationships
// db.comments.belongsTo(db.users);

// db.decisions.hasOne(db.users, {
//   foreignKey: db.users.username,
// });

module.exports = db;
