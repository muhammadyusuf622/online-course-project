import categoryService from "./category.service.js"



class CategoryController {
  #_service
  constructor(){
    this.#_service = categoryService
  }

  getAllCategory = async (req, res, next) => {
    try {
      const data = await this.#_service.getAllcategory(req.user);

      if (!data) {
      return res.status(404).json({ message: "Categories not found" });
    }
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}

export default new CategoryController();