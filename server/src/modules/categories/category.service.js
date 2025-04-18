import categoryModel from "./category.model.js";


class CategoryService {
  #_categoryModel
  constructor(){
    this.#_categoryModel = categoryModel
    this.#_seedCasegory();
  }

  getAllcategory = async () => {

    const allCategory = await this.#_categoryModel.find();

    return {
      message: "ok",
      data: allCategory
    }
  }



  #_seedCasegory = async () => {
    const defaultCategory = [
      {name: "Programming", imageUrl: "https://thumbs.dreamstime.com/b/white-humanoid-robot-examines-programming-code-computer-screen-set-against-deep-blue-backdrop-highlighting-futuristic-342858644.jpg"},
      {name: "Business", imageUrl: "https://cloudinary.hbs.edu/hbsit/image/upload/s--O0PXWnT3--/f_auto,c_fill,h_375,w_750,/v20200101/BDD0688FF02068E5C427B0954F8A2297.jpg"},
      {name: "Trading", imageUrl: "https://www.wealthwithin.com.au/public/img/4x3/trading-the-stock-market.jpg"},
      {name: "Doctor", imageUrl: "https://t4.ftcdn.net/jpg/03/21/23/37/360_F_321233723_3nSdORPnL4nPOfGEocyCGVCI0RoXuRVo.jpg"},
      {name: "Sport", imageUrl: "https://lh6.googleusercontent.com/proxy/jIt_sKTrra_6CgeANTgs4I__dFGmuH0tl877iJbBaTNcrqICMiDJ_yo9YUI3Kh9eVQlt8grbBwzCTkvHmJjbOfKs3-ZmHtJNxhuneHu2M7dnrVpTco5cfiA2"},
      {name: "Cook", imageUrl: "https://www.hrcacademy.com/wp-content/uploads/2024/03/professional-cook.jpg"},
      {name: "Builder", imageUrl: "https://t4.ftcdn.net/jpg/02/14/20/51/360_F_214205168_JqvyKVeKzYGTpQEdy3Y1c7CUh6fRMg0W.jpg"},
      {name: "Musician", imageUrl: "https://i0.wp.com/encoremusicians.com/blog/wp-content/uploads/2019/02/phil-short.jpg?fit=1617%2C1080&ssl=1"},
      {name: "Designer", imageUrl: "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/main-image/2018/12/17/1403076-781178554.jpg?itok=h41u-snM"},
      {name: "Architect", imageUrl: "https://img.freepik.com/free-photo/crop-architect-opening-blueprint_23-2147710985.jpg?semt=ais_hybrid&w=740"},
      {name: "Driver", imageUrl: "https://img.freepik.com/free-photo/man-car-driving_23-2148889981.jpg"},
      {name: "Sewing", imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/003/668/958/small_2x/sewing-accessories-on-a-white-background-photo.jpg"},
    ]

    for(let c of defaultCategory){
      const category = await this.#_categoryModel.findOne({name: c.name});

      if(!category){
        await this.#_categoryModel.create({ name: c.name, imageUrl: c.imageUrl });
      };
    }

    console.log("Default categorylar yaratildi ✅");
  }
}


export default new CategoryService();