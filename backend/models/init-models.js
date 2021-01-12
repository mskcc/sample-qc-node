var DataTypes = require('sequelize').DataTypes;
var _commentrelations = require('./commentrelation.model');
var _comments = require('./comment.model');
var _decisions = require('./decision.model');
var _users = require('./user.model');

function initModels(sequelize) {
  var commentrelations = _commentrelations(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var decisions = _decisions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  commentrelations.belongsTo(users, { foreignKey: 'author' });
  users.hasMany(commentrelations, { foreignKey: 'author' });
  comments.belongsTo(commentrelations, { foreignKey: 'commentrelation_id' });
  commentrelations.hasMany(comments, { foreignKey: 'commentrelation_id' });
  comments.belongsTo(users, { foreignKey: 'username' });
  users.hasMany(comments, { foreignKey: 'username' });
  decisions.belongsTo(users, { foreignKey: 'decision_maker' });
  users.hasMany(decisions, { foreignKey: 'decision_maker' });
  decisions.belongsTo(commentrelations, { foreignKey: 'comment_relation_id' });
  commentrelations.hasMany(decisions, { foreignKey: 'comment_relation_id' });

  return {
    commentrelations,
    comments,
    decisions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
