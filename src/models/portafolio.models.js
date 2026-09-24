import mongoose from "mongoose";

const portafolioSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'El título de la fotografía es obligatorio'],
      trim: true
    },
    imageUrl: {
      type: String,
      required: [true, 'La URL de la imagen es obligatoria'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      trim: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    isFeatured: {
      type: Boolean,
      default: false
    }
},
{ timestamps: true }
);
export default mongoose.model('Portfolio', portafolioSchema);