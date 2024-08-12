import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL! || "");
    // console.log(db);
    connection.isConnected = db.connections[0].readyState;
    // console.log(db.connection)
    console.log("DB Connected Successfully");
  } catch (error : any) {
    console.log("Database connection failed", error.message);
    // process.exit(1);
  }
}

// export async function connect(){
//     try{

//         await mongoose.connect(process.env.MONGO_URL!);
//         const connection = mongoose.connection;
//         console.log("Db Connected");
//         connection.on('connected', (err)=>{
//             console.log("Mongodb connection error, please make sure db is up and running"+ err);
//             process.exit()
//         })
//     }catch(err){
//         console.log("Something went wrong in db connection", err);
//     }
// }
