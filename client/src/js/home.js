import customAxios from "./axios";


        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              e.preventDefault();
              document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
              });
          });
      });

      // Add scroll effect to header
      window.addEventListener('scroll', () => {
          const header = document.querySelector('header');
          if (window.scrollY > 50) {
              header.style.backgroundColor = '#003d99';
          } else {
              header.style.backgroundColor = '#0052cc';
          }
      });



const BlogCourses = document.querySelector(".course-grid");

function createCategory(){

  customAxios.get("/category/getAllCategory")
  .then(res => {
    const data = res.data.data

    if(res.data.message == "ok"){
      data.forEach(category => {

        const div = document.createElement("div");
        div.classList.add('course-card')
        div.innerHTML = `<img src="${category.imageUrl}" alt="${category.name}">`
        const div2 = document.createElement("div");
        div2.classList.add("course-card-content")
        div2.innerHTML = `<h3>${category.name}</h3>`
        div.appendChild(div2);
        BlogCourses.appendChild(div)
      })
    }else {
      return window.location.href = "/pages/login.html";
    }

  })
  .catch(err => console.log(err));
}

createCategory()

