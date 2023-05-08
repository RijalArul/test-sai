'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class HistoryTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      HistoryTransaction.belongsTo(models.Product, {
        foreignKey: 'product_id'
      })

      HistoryTransaction.belongsTo(models.Transaction, {
        foreignKey: 'transaction_id'
      })
    }
  }
  HistoryTransaction.init(
    {
      transaction_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'HistoryTransaction'
    }
  )
  return HistoryTransaction
}
