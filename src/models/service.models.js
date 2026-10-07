import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'El título del servicio es obligatorio'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'El precio base es obligatorio']
    },
    features: [
      {
        type: String,
        trim: true
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
export default mongoose.model('Service', serviceSchema);