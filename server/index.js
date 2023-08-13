const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//Schema
const schemadata = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    address: String
},{
    timestamps: true
})

const userModel = mongoose.model("user", schemadata)


//Read "http://localhost:8080/"
app.get("/", async(req,res)=>{
    const data = await userModel.find({})
    res.json({success: true, data: data})
})

//Create "http://localhost:8080/create"
app.post("/create", async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()

    res.send({success: true, message: "Data Created", data: data})
})

//Update "http://localhost:8080/update"
app.put("/update", async(req, res)=>{
    console.log(req.body)
    const{ _id,...rest} = req.body

    console.log(rest)
    const data = await userModel.updateOne({_id: _id}, rest)

    
    res.send({success: true, message: "Data Updated", data: data})
})

//Delete "http://localhost:8080/delete/64d53dbae7e2595c079ca009"
app.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id: id})

    res.send({success: true, message: "Data Deleted", data: data})
})


mongoose.connect("mongodb+srv://userDB:xpij0NCjeDytjs9K@cluster0.xbxtdid.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connect to DB")
    app.listen(PORT, ()=> console.log("Server is Running!"))
})
.catch((err)=>console.log(err))


