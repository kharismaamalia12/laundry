'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.hasMany(models.transaksi, {
        foreignKey: "id_member",
        as: "transaksi"
      })
    }
  };
  member.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    jenis_kelamin: DataTypes.ENUM('L', 'P'),
    tlp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'member',
    tableName: 'member'
  });
  return member;
};