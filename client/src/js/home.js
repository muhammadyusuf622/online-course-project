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
          if (window.scrollY > 70) {
              header.style.backgroundColor = '#003d99';
          } else {
              header.style.backgroundColor = '#0052cc';
          }
      });

const courseGrid2 = document.querySelector(".course-grid2");
const BlogCourses = document.querySelector(".course-grid");
const liProfil_img = document.querySelector(".profil_img");
const goBackBtn2 = document.querySelector(".go-back_Btn2");

liProfil_img.addEventListener('click', () => {
  return window.location.href = "/pages/profil.html";
})

function createCategory(){

  BlogCourses.innerHTML = ``;
  

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




function defaultCreateCourse( data ){

  document.querySelector(".go-back_Btn").style.display = "block"

  if(BlogCourses.style.display != "none"){
      BlogCourses.style.display = "none";
      courseGrid2.style.display = "grid"
  }
  courseGrid2.innerHTML = ``;

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
        courseGrid2.appendChild(div)
  });
}



BlogCourses.addEventListener("click", function(e) {
  const courseCard = e.target.closest(".course-card");
  if (courseCard) {
    const h3 = courseCard.querySelector("h3");
    const courseTitle = h3.textContent;
    console.log(courseTitle)
    localStorage.setItem("title", JSON.stringify({title: courseTitle}));

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
  courseGrid2.style.display = "none";
  BlogCourses.style.display = "grid";
  goBackBtn.style.display = "none";
  createCategory();
})



async function getLesson (data) {

  document.querySelector(".go-back_Btn2").style.display = "block"

  courseGrid2.innerHTML = ``;
  data.forEach(lesson => {
    const div = document.createElement("div");
    div.classList.add("course-card");
  
    // Video yoki iframe
    if (lesson.video_url.startsWith("https://www.youtube.com")) {
      const iframe = document.createElement("iframe");
      iframe.src = lesson.video_url.replace("watch?v=", "embed/");
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.style.width = "100%";
      iframe.style.height = "250px";
      iframe.style.borderRadius = "10px";
      iframe.style.border = "none";
      div.appendChild(iframe);
    } else {
      const video = document.createElement("video");
      video.src = lesson.video_url;
      video.muted = true;
      video.controls = false;
      video.style.width = "100%";
      video.style.borderRadius = "10px";
  
      video.addEventListener("mouseenter", () => {
        video.muted = false;
        video.play();
      });
  
      video.addEventListener("mouseleave", () => {
        video.muted = true;
        video.pause();
        video.currentTime = 0;
      });
  
      video.addEventListener("click", () => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      });
  
      div.appendChild(video);
    }
  
    // Text qismlari
    const div2 = document.createElement("div");
    div2.classList.add("course-card-content");
  
    const h3 = document.createElement("h3");
    h3.textContent = lesson.title;
  
    const p1 = document.createElement("p");
    p1.textContent = lesson.description;
  
    const p2 = document.createElement("p");
    p2.innerHTML = `<b>Lesson Number:</b> <span>${lesson.order_number}</span> `;
  
    const p3 = document.createElement("p");
    p3.innerHTML = `<b>Duration:</b> <span>${lesson.duration}</span>`;
  
    div2.appendChild(h3);
    div2.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(p3);
  
    div.appendChild(div2);
    courseGrid2.appendChild(div);
  });
  
}


courseGrid2.addEventListener("click", function(e) {
  const courseCard = e.target.closest(".course-card");
  if (courseCard) {
    const h3 = courseCard.querySelector("h3");
    const courseTitle = h3.textContent;
    console.log(courseTitle)
    goBackBtn.style.display = "none";

    customAxios.post("/lesson/getLessonByTitle", {title: courseTitle})
    .then(res => {
      if(res.data.message == 'ok'){
        getLesson(res.data.data)
      } else {
        console.log(res.data.message);
      }
    })
    .catch(err => console.log(err));
  }
});



goBackBtn2.addEventListener('click', () => {
  const courseTitle = JSON.parse(localStorage.getItem("title"));
  goBackBtn2.style.display = "none";
  // console.log(courseTitle)

  customAxios.post("/course/getCourseByCategory", courseTitle)
  .then(res => {
    if(res.data.message == 'ok'){
      defaultCreateCourse(res.data.data)
    } else {
      console.log(res.data.message);
    }
  })
  .catch(err => console.log(err));
})