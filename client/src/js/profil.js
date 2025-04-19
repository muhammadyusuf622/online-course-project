import customAxios from "./axios";

customAxios.get("/user/getByIdUser")
.then(res =>  {
    if(res.data.message == "goLogin"){
        return window.location.href = "/pages/login.html";
    }
    document.getElementById("username").textContent = res.data.data.username;
    document.getElementById("email").textContent = res.data.data.email;
    document.getElementById("bio").textContent = res.data.data?.bio;
    document.getElementById("created_at").textContent = `Registration Date: ${res.data.data.createdAt}`;
    document.querySelector(".profile-image").src = res.data.data.profil_image;
})
.catch(err => console.log(err));


            // Profil ma'lumotlarini ko'rsatish

      const enrollments = [
          { course: { title: "Python dasturlash", language: "Ingliz" }, enrolled_at: "2025-04-10" },
          { course: { title: "Web dasturlash", language: "O'zbek" }, enrolled_at: "2025-04-12" },
      ];



      const comments = [
          { text: "Ajoyib kurs, ko'p narsa o'rgandim!", course: { title: "Python dasturlash" }, create_at: "2025-04-15" },
          { text: "Tushunarli tushuntirilgan!", course: { title: "Web dasturlash" }, create_at: "2025-04-16" },
      ];

      // Ro'yxatdan o'tgan kurslarni ko'rsatish
      const enrollmentList = document.getElementById("enrollment-list");
      enrollments.forEach(enrollment => {
          const item = document.createElement("div");
          item.className = "course-item";
          item.innerHTML = `
              <div>
                  <h3>${enrollment.course.title}</h3>
                  <p>Til: ${enrollment.course.language}</p>
                  <p>Ro'yxatdan o'tgan: ${enrollment.enrolled_at}</p>
              </div>
              <a href="#view-course" class="edit-profile-btn">Ko'rish</a>
          `;
          enrollmentList.appendChild(item);
      });

      // Yaratgan kurslarni ko'rsatish
      const createdCourseList = document.getElementById("created-course-list");


      const commentList = document.getElementById("comment-list");
      comments.forEach(comment => {
          const item = document.createElement("div");
          item.className = "comment-item";
          item.innerHTML = `
              <div>
                  <h3>${comment.course.title}</h3>
                  <p>${comment.text}</p>
                  <p>Sana: ${comment.create_at}</p>
              </div>
              <a href="#edit-comment" class="edit-profile-btn">Tahrirlash</a>
          `;
          commentList.appendChild(item);
      });

      // Tab funksionalligi
      const tabs = document.querySelectorAll(".tab");
      const tabContents = document.querySelectorAll(".tab-content");

      tabs.forEach(tab => {
          tab.addEventListener("click", () => {
              tabs.forEach(t => t.classList.remove("active"));
              tabContents.forEach(content => content.classList.remove("active"));

              tab.classList.add("active");
              document.getElementById(tab.dataset.tab).classList.add("active");
          });
      });
      

const mediaInput = document.getElementById("media");
const previewDiv = document.getElementById("previewDiv");
const imgIconLabel = document.getElementById("imgIconLabel");

mediaInput.addEventListener("change", function() {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      // Rasmni oldin tozalab olamiz
      imgIconLabel.innerHTML = "";
      const removImg = previewDiv.querySelector("img");
      if (removImg) {
        previewDiv.removeChild(removImg);
      }

      // Yangi rasm elementini yaratamiz
      const img = document.createElement("img");
      img.src = e.target.result;

      // Rasmni divga qo'shamiz
      previewDiv.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});


const profilMedia = document.getElementById("profilMedia");
const profileImage = document.getElementById("profileImage");

profilMedia.addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profileImage.src = e.target.result;
      }
      reader.readAsDataURL(file);
  
      const formData = new FormData();
      formData.append("profileImg", file);
  
      customAxios.put("/user/profilImg", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error("Xatolik:", err);
      });
    }
  });
  

const edit_profile_btn = document.querySelector(".edit-profile-btn");
const boxBio = document.querySelector(".boxBio");
const formUserBio = boxBio.querySelector("form");

edit_profile_btn.addEventListener('click', (e) => {

    if (boxBio.style.display === "none" || boxBio.style.display === "") {
        boxBio.style.display = "block";
      } else {
        boxBio.style.display = "none";
      }

});

formUserBio.addEventListener("submit", function(e) {
    e.preventDefault();
    const textarea = this.querySelector("textarea").value;

    if(!textarea.trim()){
       return alert("Enter Your Bio");
    }
    boxBio.style.display = "none"
    document.getElementById("bio").textContent = textarea;
    const userBio = { ["bio"]: textarea}
    customAxios.put("/user/updateBio", userBio)
    .then(res => console.log(res.data.message))
    .catch(err => console.log(err))
});


const formCreateCourse = document.querySelector(".formCreateCourse");

formCreateCourse.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const formData = new FormData();
    if(!this.querySelector("#media").value){
       return alert("Please Insert a Picture");
    }
  
    formData.append("title", this.querySelector("#courseTitleInput").value);
    formData.append("description", this.querySelector("#description").value);
    formData.append("language", this.querySelector("#language").value);
    formData.append("select_Category", this.querySelector("#select_Category").value);
    formData.append("course_Level", this.querySelector("#course_Level").value);
  
    const mediaFile = this.querySelector("#media").files[0];
    formData.append("courseImg", mediaFile); 

    customAxios.post("/course/createCourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    .then(res => {
        if(res.data.message == "ok"){
            this.querySelector("#courseTitleInput").value = '';
            this.querySelector("#description").value = '';
            this.querySelector("#language").value = '';
            this.querySelector("#select_Category").value = '';
            this.querySelector("#course_Level").value = '';
            previewDiv.innerHTML = ` <img> <label id="imgIconLabel" for="media"><i class="fa-solid fa-image"></i></label> <input type="file" id="media" name="media" accept="image/*">`
        } else {
            console.log(res.data)
        }
    })
    .catch(err => console.log(err));
  
  });


const courseGrid = document.querySelector(".course-grid");

function defaultCreateCourse( data ){
    data.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-card");
        const img = document.createElement("img");
        img.src = course.image_url;
        div.appendChild(img);
        const div2 = document.createElement("div");
        div2.classList.add("course-card-content");
        const p1 = document.createElement("p")
        const p2 = document.createElement("p")
        const p3 = document.createElement("p")
        p1.textContent = course.description;
        p2.innerHTML = `<b>Level:</b> <span>${course.level}</span> `
        p3.innerHTML = `<b>Language:</b><span> ${course.language} </span>`
        div2.appendChild(p1)
        div2.appendChild(p2)
        div2.appendChild(p3)
        div.appendChild(div2);
        courseGrid.appendChild(div)
  });
}


customAxios.get("/course/getByIdcategory")
.then(res =>  {

    if(res.data.message == 'ok'){
        defaultCreateCourse(res.data.data)
    } else {
        console.log(res.data.message);
    }
})
.catch(err => console.log(err));

