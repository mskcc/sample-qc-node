// module.exports = (sequelize, Sequelize) => {
//   const Commentrelation = sequelize.define(
//     'commentrelation',
//     {
//       request_id: {
//         type: Sequelize.STRING(40),
//         allowNull: false,
//       },
//       report: {
//         type: Sequelize.TEXT,
//         allowNull: false,
//       },
//       author: {
//         type: Sequelize.STRING(40),
//         references: {
//           model: 'user',
//           key: 'username',
//         },
//       },
//       recipients: {
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
//       is_cmo_pm_project: {
//         type: Sequelize.BOOLEAN,
//         allowNull: true,
//       },
//     },
//     { timestamps: false }
//   );
//   Commentrelation.associate = function (models) {
//     CommentRelation.belongsTo(Users, { foreignKey: 'author', targetKey: 'username' });
//     Commentrelation.hasMany(models.Comment, { as: 'children' });
//     Commentrelation.hasOne(models.Decision, { as: 'decision' });
//   };
//   return Commentrelation;
// };

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'commentrelations',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      request_id: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      report: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING(40),
        allowNull: true,
        references: {
          model: 'users',
          key: 'username',
        },
      },
      recipients: {
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
      is_cmo_pm_project: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'commentrelations',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'author',
          using: 'BTREE',
          fields: [{ name: 'author' }],
        },
      ],
    }
  );
};
