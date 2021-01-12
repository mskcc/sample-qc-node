// module.exports = (sequelize, Sequelize) => {
//   const Decision = sequelize.define(
//     'decision',
//     {
//       // id: {
//       //   type: Sequelize.INTEGER,
//       //   autoIncrement: true,
//       //   primaryKey: true,
//       // },
//       request_id: {
//         type: Sequelize.STRING(40),
//         allowNull: false,
//       },
//       decision_maker: {
//         type: Sequelize.STRING(40),
//         references: {
//           model: 'user',
//           key: 'username',
//         },
//       },
//       comment_relation_id: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'commentrelations',
//           key: 'id',
//         },
//       },
//       report: {
//         type: Sequelize.STRING(40),
//         allowNull: false,
//       },
//       decisions: {
//         type: Sequelize.TEXT,
//         //   db.Text(4294000000)
//         allowNull: false,
//       },
//       is_igo_decision: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//       is_submitted: {
//         type: Sequelize.BOOLEAN,
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
//   Decision.associate = function (models) {
//     Decision.belongsTo(models.User, { foreignKey: 'decision_maker', targetKey: 'username' });
//     Decision.belongsTo(models.Commentrelation, { as: 'comment_relation_id' });
//   };
//   return Decision;
// };

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'decisions',
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
      decision_maker: {
        type: DataTypes.STRING(40),
        allowNull: true,
        references: {
          model: 'users',
          key: 'username',
        },
      },
      comment_relation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'commentrelations',
          key: 'id',
        },
      },
      report: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      decisions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_igo_decision: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      is_submitted: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'decisions',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'decision_maker',
          using: 'BTREE',
          fields: [{ name: 'decision_maker' }],
        },
        {
          name: 'comment_relation_id',
          using: 'BTREE',
          fields: [{ name: 'comment_relation_id' }],
        },
      ],
    }
  );
};
