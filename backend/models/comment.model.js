// module.exports = (sequelize, Sequelize) => {
//   const Comment = sequelize.define(
//     'comment',
//     {
//       // id: {
//       //   type: Sequelize.INTEGER,
//       //   autoIncrement: true,
//       //   primaryKey: true,
//       // },

//       commentrelation_id: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'commentrelations',
//           key: 'id',
//         },
//       },
//       username: {
//         type: Sequelize.STRING(40),
//         references: {
//           model: 'users',
//           key: 'username',
//         },
//       },
//       comment: {
//         type: Sequelize.TEXT,
//         allowNull: false,
//       },
//       date_created: {
//         type: Sequelize.DATE(6),
//         allowNull: false,
//       },
//       date_updated: {
//         type: Sequelize.DATE(6),
//         allowNull: true,
//       },
//     },
//     { timestamps: false }
//   );
//   Comment.associate = function (models) {
//     Comment.belongsTo(models.Commentrelation, { as: 'commentrelation_id' });
//     Comment.belongsTo(models.User, { foreignKey: 'username', targetKey: 'username' });
//   };
//   return Comment;
// };

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comments',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      commentrelation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'commentrelations',
          key: 'id',
        },
      },
      username: {
        type: DataTypes.STRING(40),
        allowNull: true,
        references: {
          model: 'users',
          key: 'username',
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'comments',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'commentrelation_id',
          using: 'BTREE',
          fields: [{ name: 'commentrelation_id' }],
        },
        {
          name: 'username',
          using: 'BTREE',
          fields: [{ name: 'username' }],
        },
      ],
    }
  );
};
