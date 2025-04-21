import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({

  title: {
    type: mongoose.SchemaTypes.String,
    required: true,
    trim: true
  },

  description: {
    type: mongoose.SchemaTypes.String,
    required: true,
    trim: true
  },

  language: {
    type: mongoose.SchemaTypes.String,
    required: true,
    trim: true
  },

  level: {
    type: mongoose.SchemaTypes.String,
    enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
    default: "Beginner"
  },

  image_url: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users"
  }
}, {
  timestamps: true,
  collection: "courses",
  versionKey: false
});

export default mongoose.model("Course", CourseSchema);