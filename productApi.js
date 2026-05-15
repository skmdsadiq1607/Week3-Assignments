//create min-express app(seperate route)
import exp from 'express'
import {compare} from 'bcryptjs'
import {ProductModel} from '../models/ProductModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
export const productApp=exp.Router()

//product login

//create new product
productApp.post("/products",async(req,res)=>{
    //get new product obj from req
    const newProduct=req.body
    //create new product document
const newProductDocument=new ProductModel(newProduct)
//save
const result=await newProductDocument.save()
console.log("result:",result)
//send res
res.status(201).json({message:"Product created"})
})
//read all products(protected route)
productApp.get("/products",verifyToken,async(req,res)=>{
    //read all users from db
   let productsList=await ProductModel.find()
    //send res
    res.status(200).json({message:"products",payload:productsList})
})
//read a product by object id
productApp.get("/products/:id",verifyToken,async(req,res)=>{
    //read obj id from req params
    const pid=req.params.id
    //find product by id
    const productObj=await ProductModel.findById(pid)
    if(!productObj){
        res.status(404).json({message:"Product not found"})
    }
    //send res
    res.status(200).json({message:"products",payload:productObj})
})
//update product by id
productApp.put("/products/:id",async(req,res)=>{
    //get modified product from req
    const modifiedProduct=req.body
    const pid=req.params.id
    //find product by id
  const updatedProduct= await ProductModel.findByIdAndUpdate(pid,{$set:{...modifiedProduct}},{new:true,runValidators:true})
  //send res
res.status(200).json({message:"product modified",payload:updatedProduct})
})
//delete product by id
productApp.delete("/products/:id",async(req,res)=>{
    const pid=req.params.id
    const deletedProduct=await ProductModel.findByIdAndDelete(pid)
    if(!deletedProduct){
        return res.status(404).json({message:"Product not found"})
    }
    res.status(200).json({message:"deleted",payload:deletedProduct})
})
