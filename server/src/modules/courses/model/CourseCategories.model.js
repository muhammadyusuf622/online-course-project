import mongoose from "mongoose";


const CourseCategoriesSchema = new mongoose.Schema({

  course_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Course",
    require: true
  },

  category_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "category",
    required: true
  }
}, {
  timestamps: true,
  collection: "courseCategories",
  versionKey: false
});

export default mongoose.model("CourseCategories", CourseCategoriesSchema);