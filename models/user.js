const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // 테이블 칼럼 설정
      {
        userid: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      // 테이블 옵션 설정
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // //1대 N의 관계 중 1의 관계
    // db.User.hasMany(db.Pin, {
    //   foreignKey: "user",
    //   sourceKey: "id",
    //   onDelete: "CASCADE",
    // });
  }
};
