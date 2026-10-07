import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: [true, 'El nombre completo es obligatorio'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      lowercase: true,
      trim: true
    },
    eventType: {
      type: String,
      required: [true, 'El tipo de evento es obligatorio'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'El mensaje es obligatorio'],
      trim: true
    },
    status: {
      type: String,
      enum: ['pendiente', 'leido', 'respondido'],
      default: 'pendiente'
    }
},
{ timestamps: true }
);
export default mongoose.model('ContactMessage', contactMessageSchema);