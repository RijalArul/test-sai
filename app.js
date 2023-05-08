const express = require('express')
const { Product, Transaction, HistoryTransaction } = require('./models')
const { json } = require('sequelize')
const app = express()
require('dotenv').config()
// const router = express.Router()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
function palindrome (req, res) {
  console.log(req.body)
  const { word } = req.body
  const newWord =
    word.split('').reverse().join('').toLowerCase() === word.toLowerCase()

  res.status(201).json({
    status: true,
    data: newWord
  })
}

async function CreateProduct (req, res) {
  const { nama_item, stock, harga } = req.body

  try {
    const newProduct = await Product.create({ nama_item, stock, harga })
    res.status(201).json({
      status: true,
      data: newProduct
    })
  } catch (err) {
    console.log(err)
  }
}

async function GetProducts (req, res) {
  try {
    const products = await Product.findAll()
    res.status(201).json({
      status: true,
      data: products
    })
  } catch (err) {}
}

async function CreateTransactions (req, res) {
  try {
    const { product_id, total_qty } = req.body

    const product = await Product.findOne({
      where: {
        id: product_id
      }
    })

    const transactions = await Transaction.create({
      product_id,
      total_qty,
      total_harga: total_qty * product.harga
    })
    res.status(201).json({
      status: true,
      data: transactions
    })
  } catch (err) {}
}

async function GetTransactions (req, res) {
  try {
    const transactions = await Transaction.findAll()

    res.status(200).json({
      status: true,
      data: transactions
    })
  } catch (err) {}
}

async function GetTransaction (req, res) {
  try {
    const { id } = req.params
    const transaction = await Transaction.findOne({
      where: {
        id: id
      }
    })

    res.status(200).json({
      status: true,
      data: transaction
    })
  } catch (err) {}
}

const port = process.env.PORT

app.post('/palindromes', palindrome)
app.post('/products/create', CreateProduct)
app.get('/products', GetProducts)
app.post('/transactions/create', CreateTransactions)
app.get('/transactions', GetTransactions)
app.get('/transactions/:id', GetTransaction)
app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
