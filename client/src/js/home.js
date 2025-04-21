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
const liProfil_img = document.querySelector(".profil_img");

liProfil_img.addEventListener('click', () => {
  return window.location.href = "/pages/profil.html";
})

function createCategory(){

  document.querySelector(".go-back_Btn").style.display = "none"

  customAxios.get("/category/getAllCategory")
  .then(res => {
    const data = res.data.data

    if(res.data.message == "ok"){

      liProfil_img.innerHTML = `<img src="${res.data.user.profil_image}" alt="${res.data.user.username}">`

      BlogCourses.innerHTML = ``;

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


const courseGrid = document.querySelector(".course-grid")


function defaultCreateCourse( data ){

  document.querySelector(".go-back_Btn").style.display = "block"

  courseGrid.innerHTML = ``;

    data.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-card");
        const img = document.createElement("img");
        img.src = course.course_id.image_url;
        div.appendChild(img);
        const div2 = document.createElement("div");
        div2.classList.add("course-card-content");
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        h3.textContent = course.course_id.title
        p1.textContent = course.course_id.description;
        p2.innerHTML = `<b>Level:</b> <span>${course.course_id.level}</span> `
        p3.innerHTML = `<b>Language:</b><span> ${course.course_id.language} </span>`
        div2.appendChild(h3)
        div2.appendChild(p1)
        div2.appendChild(p2)
        div2.appendChild(p3)
        div.appendChild(div2);
        courseGrid.appendChild(div)
  });
}



courseGrid.addEventListener("click", function(e) {
  const courseCard = e.target.closest(".course-card");
  if (courseCard) {
    const h3 = courseCard.querySelector("h3");
    const courseTitle = h3.textContent;
    console.log(courseTitle)

    customAxios.post("/course/getCourseByCategory", {title: courseTitle})
    .then(res => {
      if(res.data.message == 'ok'){
        defaultCreateCourse(res.data.data)
      } else {
        console.log(res.data.message);
      }
      
    })
    .catch(err => console.log(err));
  }
});

const goBackBtn = document.querySelector(".go-back_Btn");

goBackBtn.addEventListener('click', () => {

  createCategory()
})