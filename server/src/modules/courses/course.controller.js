import ErrorHandler from "../../utils/ErrorHandler.utils.js";
import courseServics from "./course.servics.js"


class CourseController {
  #_service
  constructor() {
    this.#_service = courseServics;
  }


  createCourse = async (req, res, next) => {
    try {
      const {title, description, language, select_Category, course_Level} = req.body;
      const { file } = req;
      const userId = req.user?.id

      if(!userId){
        throw new ErrorHandler(404, "Id Not Found");
      }
      
      if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
      const imageUrl = file.path;

      const data = await this.#_service.createCourseService(userId, title, description, language, select_Category, course_Level, imageUrl)
      
      res.send(data)
    } catch (error) {
      next(error);
    }
  }

  getByIdCategory = async (req, res, next) => {
    try {
      const userId = req.user?.id

      if(!userId){
        throw new ErrorHandler(404, "Id Not Found");
      }

      const data = await this.#_service.getByIdServics(userId);

      res.send(data);
    } catch (error) {
      next(error)
    }
  }

  getCourseTitle = async (req, res, next) => {
    try {
      const userId = req.user?.id

      if(!userId){
        throw new ErrorHandler(404, "Id Not Found");
      }

      const data = await this.#_service.getCourseTitleService(userId);


      res.send(data);

    } catch (error) {
      next(error)
    }
  }


  getCourseByCategory = async (req, res, next) => {
    try {
      const {title} = req.body;

      const data = await this.#_service.getCourseByCategory(title);
 
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}

export default new CourseController();