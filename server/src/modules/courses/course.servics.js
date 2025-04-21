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

  getCourseTitleService = async (userId) => {

    const data = await this.#_courseModel.find({ user_id: userId }, { title: 1, _id: 0 });

    if(!data){
      return {message: "Data Not Found"};
    }

    return{
      message: "ok",
      data: data
    }
  }


  getCourseByCategory = async (title) => {

    if(!title.trim()){
      return { message: "Title Not Found" }
    }

    const category = await this.categoryModel.findOne({ name: title })

    const allData = await this.CourseCategoriesModel.find( {category_id: category?.id }).populate("course_id");

    if (!allData || allData.length === 0) {
      return {
        message: "User courses not found"
      };
    }


    const data = allData
    .filter(item => item.course_id !== null && item.course_id._id) // faqat populate qilingan course_id bo'lganlarni olish
    .map(item => {
      item = item.toObject();
      // category_id ni olib tashlash
      delete item.category_id;
      
      if (item.course_id && item.course_id.image_url) {
        if (!item.course_id.image_url.startsWith("http://") && !item.course_id.image_url.startsWith("https://")) {
          item.course_id.image_url = `http://localhost:${PORT}${item.course_id.image_url.split("server")[1]}`;
        }
      }
      
      return item;
    });
  
    return {
      message: "ok",
      data: data
    }
  }

}

export default new CourseService();