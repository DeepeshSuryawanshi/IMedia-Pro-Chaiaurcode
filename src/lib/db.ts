import mongoose, { mongo } from "mongoose";

const MONGODB_URI = process.env.MOGODB_URI!;

if(!MONGODB_URI) throw new Error("Please define mongoDB uri in env file");

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn:null,promise:null};
}

export async function connectToDataBase() {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const opts ={
            bufferCommands:true,
            maxPoolSize:10
        }
       cached.promise = mongoose.connect(MONGODB_URI,opts)
       .then(()=>mongoose.connection)
    }

    try {
        cached.conn = await cached.promise;
        console.log("DB Connecting")
    } catch (e) {
        console.log("Fail to DB Connect")
        cached.promise = null;
        throw e 
    }
    return cached.conn;
}