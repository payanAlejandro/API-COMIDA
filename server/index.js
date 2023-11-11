const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"comida"
});


app.get("/comida",(req,res)=>{
    db.query('SELECT * FROM menu',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/comida/:id",(req,res)=>{
    const comidaId = req.params.id;
    db.query('SELECT * FROM menu WHERE comida_id = ?', [comidaId], (error, results) => {
      if (error) throw error;
      res.json(results[0]); 
    });
})


app.listen(3002,()=>{
    console.log("Corriendo en el puerto 3002")
})