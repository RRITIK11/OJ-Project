const express = require("express");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get("/",(req,res)=>{
    res.json({online : "Compiler"});
});

app.post("/run",(req,res)=>{
    const {language = "cpp", code} = req.body;
    if(code === undefined){
        return res.status(400).json({
            success : false,
            message: "Empty code body!"
        })
    }

    try{

    }catch(err){
        res.status(500).json({
            success : false,
            message : "Error: "+ err
        })
    }
    res.send({
        language ,
        code
    });
})

app.listen(8000, () => {
    console.log("Server is listening on the port 8000!");
})