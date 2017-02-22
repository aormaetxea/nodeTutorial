'use strict'
const Product = require('../models/product')

function getProduct (req,res){
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!product) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({ product: product })
  })
}

function getProducts (req,res){
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!products) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({ products })
  })
}

function saveProduct(req,res){
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if(err){
      res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
    }
    res.status(200).send({product: productStored})
  })
}

function updateProduct (req,res){
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err,productoUpdated) => {
    if(err){
      res.status(500).send({message: `Error al actualizar: ${err}`})
    }

    res.status(200).send({product: productoUpdated})
  })
}

function deleteProduct (req,res){
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

    product.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
      res.status(200).send({message: 'El producto se ha eliminado'})
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
