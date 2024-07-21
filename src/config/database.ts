import mongoose from "mongoose";
export async function connect(){
    try{
        
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        console.log("Db Connected");
        connection.on('connected', (err)=>{
            console.log("Mongodb connection error, please make sure db is up and running"+ err);
            process.exit()
        })
    }catch(err){
        console.log("Something went wrong in db connection", err);
    }
}