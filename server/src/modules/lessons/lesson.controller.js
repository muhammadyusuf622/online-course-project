import lessonService from "./lesson.service.js"


class LessonController{
  #_service
  constructor(){
    this.#_service = lessonService
  }


  createLesson = async (req, res, next) => {
    try {
      const {title, description, orderNumber, courseTitle, duration} = req.body
      const { file } = req;

      if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
      const videoUrl = file.path;

      const data = await this.#_service.createLessonServics(title, description, orderNumber, courseTitle, duration, videoUrl);


      res.send(data);
    } catch (error) {
      next(error)
    }
  }

  getLessonByTitle = async (req, res, next) => {
    try {
      const {title} = req.body;

      const data = await this.#_service.getLessonByTitleServics(title);
      
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}

export default new LessonController();