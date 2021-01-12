// module.exports = (sequelize, Sequelize) => {
//   const User = sequelize.define(
//     'user',
//     {
//       // sequelize will auto add id primary key
//       //   id: {
//       //     type: Sequelize.INTEGER,
//       //     autoIncrement: true,
//       //     primaryKey: true,
//       //   },
//       full_name: {
//         type: Sequelize.STRING(100),
//         allowNull: true,
//       },
//       username: {
//         type: Sequelize.STRING(40),
//         allowNull: false,
//         unique: true,
//       },
//       title: {
//         type: Sequelize.STRING(120),
//         allowNull: true,
//       },
//       role: {
//         type: Sequelize.STRING(120),
//         allowNull: true,
//       },
//       groups: {
//         type: Sequelize.TEXT,
//         allowNull: true,
//       },
//       login_first_date: {
//         type: Sequelize.DATE(6),
//         allowNull: false,
//       },
//       login_latest_date: {
//         type: Sequelize.DATE(6),
//         allowNull: true,
//       },
//       login_counter: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//     },
//     // should this instead be added globally?
//     { timestamps: false }
//   );
//   User.associate = function (models) {
//     User.hasMany(models.Comment, { as: 'comments' });
//     User.hasMany(models.Decision, { as: 'decisions' });
//     User.hasMany(models.Commentrelation, { as: 'commentrelations' });
//   };
//   //   define is supposed to return for us?
//   return User;
// };

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: 'username',
      },
      title: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      groups: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      login_first_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      login_latest_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      login_counter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'username',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'username' }],
        },
      ],
    }
  );
};
