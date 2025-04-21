import PORT from "../../config/app.config.js";
import courseModel from "../courses/model/course.model.js";
import lessonModel from "./lesson.model.js"

class LessonService {
  #_lessonModel
  constructor (){
    this.#_lessonModel = lessonModel
    this.courseModel = courseModel
  }


  createLessonServics = async (title, description, orderNumber, courseTitle, duration, videoUrl) => {

    orderNumber = Number(orderNumber);
    if(!orderNumber){
      return {message: "lesson Number Error"}
    }

    
    const course = await this.courseModel.findOne({ title: courseTitle }).select('_id');
    
    const checkOrderNumber = await this.#_lessonModel.findOne({course_id: course.id, order_number: orderNumber})

    if(checkOrderNumber){
      return { message: "The lesson number already exists" };
    }

    const data = await this.#_lessonModel.create({
      title,
      description,
      video_url: videoUrl,
      order_number: orderNumber,
      duration,
      course_id: course.id
    });



    return {
      message: "ok"
    }
  }

  getLessonByTitleServics = async (title) => {

    if(!title.trim()){
      return {message: "Title Not Found"}
    }

    const course = await this.courseModel.findOne({ title: title }).select('_id');

    if(!course){
      return {message: "Title Not Found"};
    }

    const allData = await this.#_lessonModel.find({course_id: course.id});

    if(!allData){
      return {message: "Lesson Not Found"}
    }

    const data = allData.map(item => {
      item = item.toObject();
      if (item.video_url && !item.video_url.startsWith("https")) {
        item.video_url = `http://localhost:${PORT}${item.video_url.split("server")[1]}`;
      }
      return item;
    });
    
    return {
      message: "ok",
      data: data
    }
  }
}




export default new LessonService();