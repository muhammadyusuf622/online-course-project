import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  imageUrl: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
}, {
  collection: "category",
  timestamps: true,
  versionKey: false
});

export default mongoose.model("category", categorySchema);