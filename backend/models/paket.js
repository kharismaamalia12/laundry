'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.belongsTo(models.outlet, {
        foreignKey: "id_outlet",
        as: "outlet"
      })

      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_paket",
        as: "detail_transaksi"
      })
    }
  };
  paket.init({
    id_outlet: DataTypes.INTEGER,
    jenis: DataTypes.ENUM('kiloan', 'selimut', 'bed_cover', 'kaos', 'lainnya'),
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paket',
    tableName: 'paket'
  });
  return paket;
};