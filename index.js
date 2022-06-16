const express = require("express") ;
const bodyParser = require("body-parser") ;
const ejs = require("ejs") ;
const https = require("https");
const mongoose = require("mongoose") ;
const AdminBro = require('admin-bro');
const mongooseAdminBro = require('@admin-bro/mongoose');
const expressAdminBro = require('@admin-bro/express');

const url = 'mongodb://localhost:27017/elementDB' ;
mongoose.connect(url) ;
console.log("server is connected with database");


const app = express() ;
app.set('view engine' , 'ejs') ;
app.use(bodyParser.urlencoded({extended : true })) ;
app.use(express.static('public')) ;


const elementSchema = new mongoose.Schema({
    name : String
} );
const Elements = mongoose.model("element" , elementSchema);

const Navelement1 = new Elements({
    name : "Category"
})
// Navelement1.save(function(err , result)
// {
//     if (err){
//         console.log(err); 
//     }
//     else{
//         console.log("Successfully added to database") ;
//     }
// }) ;
const Navelement2 = new Elements({
    name : "FAQs"
})
// Navelement2.save(function(err , result)
// {
//     if (err){
//         console.log(err); 
//     }
//     else{
//         console.log("Successfully added to database") ;
//     }
// }) ;
const Navelement3 = new Elements({
    name : "My Cart"
})
// Navelement3.save(function(err , result)
// {
//     if (err){
//         console.log(err); 
//     }
//     else{
//         console.log("Successfully added to database") ;
//     }
// }) ;

app.get("/" , function(req , res)
{
    Elements.find(function(err , foundElements)
    {
        console.log(Elements)
        res.render("Home" , {
            NavComp : foundElements
        })

    })
    
    
})
app.post("/" , function(req , res)
{
    let Nav1 = req.body.nav1 ;
    let Nav2 = req.body.nav2 ;
    let Nav3 = req.body.nav3 ;
    Elements.findByIdAndUpdate({id : 1 },{name : Nav1} , function(err , results)
    {
        if (!err)
        {
            console.log("updated")
        }
        
    })
    
    if (Nav2 != undefined)
    { Elements.findByIdAndUpdate({id : 2} , {name : Nav2} , function(err , results)
    {
        if (!err)
        {
            console.log("updated")
        }
    })}
   
    
    if (Nav3!= undefined)
    {
        Elements.findByIdAndUpdate({id: 3} , {name : Nav3} , function(err , results)
        {
            if (!err)
        {
            console.log("updated")
        }
        })
    }
    
    Elements.find(function(err , foundElements)
    {
        res.render("Home" ,{
            NavComp1 : Nav1,
            NavComp2 : Nav2,
            NavComp3 : Nav3
        })

    })
    
})
// const Element = require('./modals/elements')
// const Admin = require('./modals/Admin')
// AdminBro.registerAdapter(mongooseAdminBro)
// const AdminBroOptions = {
//   resources: [Admin, Element],
// }


// const adminBro = new AdminBro(AdminBroOptions)
// const router = expressAdminBro.buildRouter(adminBro)

// app.use(adminBro.options.rootPath, router)
app.get("/admin" , function(req , res)
{
    res.render("admin")
})

app.listen(3010 , function()
{
    console.log("server is connected to the port 3010")
})