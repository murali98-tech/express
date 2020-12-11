const express= require('express');
 const myapp = express();
 const path= require('path');
 const port=5000;
 const bodyParser = require('body-parser');
 const admin = require("firebase-admin");
 const serviceAccount = require("./serviceAccountKey.json");
 myapp.listen(port,()=>{
  console.log("running");
  });
 admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore();
 myapp.use(express.json()) 
 myapp.post('/create',(req,res)=>{
   let student= req.body ;
    setData(student);
   console.log(student);
    //  res.send("hello everyone");
    res.sendFile(path.join(__dirname+'/hello.html'));


 });

 myapp.get('/read',(req,res)=>{
  // let student ;
  let number=req.query.id;
  db.collection("names").doc(""+number+"").get().then((data) =>{
    // let student=data.data();
   console.log(data.data());
   
   //console.log(student);
   res.send(data.data());
   
   });
  
 });

 myapp.delete('/delete',(req,res)=>{
   let number=req.query.id;
   console.log(number)
   db.collection("names").doc(""+number+"").delete();
   res.send("deleted sucessfully");
 });

 myapp.put('/update',(req,res)=>{

  let number=req.query.id;
  console.log(number)
  let data=req.body;
  db.collection("names").doc(""+number+"").update(data)
  res.send("updated sucessfully");

 });
 
// function viewById(number){
//   let student;
//   let names;
 
// console.log(student);
// return student;
//}

function setData(data){
  db.collection("names").doc("2").set(data);
}
