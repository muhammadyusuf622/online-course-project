import PORT from "../../config/app.config.js"
import categoryModel from "../categories/category.model.js"
import courseModel from "./model/course.model.js"
import CourseCategoriesModel from "./model/CourseCategories.model.js"


class CourseService {
  #_courseModel
  constructor(){
    this.#_courseModel = courseModel
    this.CourseCategoriesModel = CourseCategoriesModel
    this.categoryModel = categoryModel;
  }

  createCourseService = async (userId, title, description, language, select_Category, course_Level, imageUrl) => {


    const foundCategory = await this.categoryModel.findOne({ name: select_Category});

    if(!foundCategory) {
      return {
        message: `Category ${select_Category} Not Found`
      };
    }

    const data = await this.#_courseModel.create({
      title,
      description,
      language,
      level: course_Level,
      image_url: imageUrl,
      user_id: userId
    });

    await this.CourseCategoriesModel.create({
      course_id: data.id,
      category_id: foundCategory.id
    });

    return {
      message: "ok"
    }
  }
  
  getByIdServics = async (userId) => {

    const allData = await this.#_courseModel.find({ user_id: userId });

    if(!allData){
      return {
        message: "user course not found"
      }
    }

    const data = allData.map(item => {
      item = item.toObject();
      item.image_url = `http://localhost:${PORT}${item.image_url.split("server")[1]}`;
      return item;
    });

    return{
      message: "ok",
      data: data
    }
  }
}

export default new CourseService();