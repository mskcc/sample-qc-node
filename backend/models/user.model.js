module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true,
    },
    title: {
      type: Sequelize.STRING(120),
      allowNull: true,
    },
    role: {
      type: Sequelize.STRING(120),
      allowNull: true,
    },
    groups: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    login_first_date: {
      type: Sequelize.DATE(6),
      allowNull: false,
    },
    login_latest_date: {
      type: Sequelize.DATE(6),
      allowNull: true,
    },
    login_counter: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return User;
};

// comments = relationship('Comment');
// decisions = relationship('Decision');
// commentrelations = relationship('CommentRelation');
