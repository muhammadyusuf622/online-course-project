import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
    required: true,
    trim: true,
  },
  description: {
    type: mongoose.SchemaTypes.String,
    trim: true,
  },

  video_url: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  order_number: {
    type: mongoose.SchemaTypes.Number,
    required: true
  },

  duration: {
    type: mongoose.SchemaTypes.String,
    required: true,
    trim: true
  },

  course_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "courses",
    required: true
  }

}, {
  timestamps: true,
  collection: "lessons",
  versionKey: false
});

export default mongoose.model("Lesson", LessonSchema);