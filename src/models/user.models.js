import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin'
    }
},
{ timestamps: true }// crea campos createAt y updateAt - para controlar fechas de creación y modificación. 
);
export default mongoose.model('User', userSchema);