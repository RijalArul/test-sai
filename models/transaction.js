'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here

      Transaction.hasMany(models.HistoryTransaction, {
        foreignKey: 'transaction_id'
      })

      Transaction.belongsTo(models.Product, {
        foreignKey: 'product_id'
      })
    }
  }
  Transaction.init(
    {
      product_id: DataTypes.INTEGER,
      total_qty: DataTypes.INTEGER,
      total_barang: DataTypes.INTEGER,
      total_harga: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Transaction'
    }
  )
  return Transaction
}
