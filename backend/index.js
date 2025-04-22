const express=require('express');
const cors = require('cors');
const app=express();


const env=require('dotenv');
env.config();

app.use(cors({ 
    origin:"*",
    methods:["GET","POST","PUT","DELETE","PATCH"],
    allowedHeaders:["Content-Type","Authorization"]
}));
app.use(express.json());


const libroRouter = require("./router/librorouter");
const usuarioRouter = require("./router/usuariorouter");
const prestamoRouter = require("./router/prestamorouter");
app.use("/apil", libroRouter);
app.use("/apiu", usuarioRouter);
app.use("/apip", prestamoRouter);





//server 
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log('Servidor en el puerto:',PORT);
})