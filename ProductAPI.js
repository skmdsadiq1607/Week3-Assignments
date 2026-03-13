//Create mini-express app(Seperate Route)
import exp from 'express';
export const productApp=exp.Router();

let products = []
//Create product
productApp.post('/products',(req,res)=>{
    let newProduct = req.body
    products.push(newProduct)
    res.json({message:"Product created"})
})
//Read all products
productApp.get('/products',(req,res)=>{
    res.json({message:"All products",payload:products})
})
//Read all products by brand
productApp.get('/products/brand/:brand',(req,res)=>{
    let brandOfUrl = req.params.brand
    let filteredProducts = products.filter(productObj=>productObj.brand.toLowerCase()===brandOfUrl.toLowerCase())
    res.json({message:"All products of brand "+brandOfUrl,payload:filteredProducts})
})
//Update a product
productApp.put('/products',(req,res)=>{
    let modifiedProduct = req.body
    let index = products.findIndex(productObj=>productObj.productId===modifiedProduct.productId)
    if(index===-1)
     return res.json({message:"Product not found"})
    products.splice(index,1,modifiedProduct)
    res.json({message:"Product updated"})
})
//Delete a product by id
productApp.delete('/products/:id',(req,res)=>{
    let idOfUrl = Number(req.params.id)
    let index = products.findIndex(productObj=>productObj.productId===idOfUrl)
    if(index===-1)
     return res.json({message:"Product not found to delete"})
    products.splice(index,1,)
    res.json({message:"Product removed"})
})