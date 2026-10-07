import mongoose from "mongoose";

export async function connectionMongoDb() {

    try {
        await mongoose.connect(process.env.URI_MONGO);
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        console.log ("Error en la conexión: ", error)
    }
    
}