import categoryService from "./category.service.js"



class CategoryController {
  #_service
  constructor(){
    this.#_service = categoryService
  }

  getAllCategory = async (req, res, next) => {
    try {
      const data = await this.#_service.getAllcategory();

      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}

export default new CategoryController();