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
      


const previewDiv = document.getElementById("previewDiv");
const imgIconLabel = document.getElementById("imgIconLabel");
const mediaInput = previewDiv.querySelector("#media");

mediaInput.addEventListener("change", function() {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imgIconLabel.innerHTML = "";
      const removImg = previewDiv.querySelector("img");
      if (removImg) {
        previewDiv.removeChild(removImg);
      }
      const img = document.createElement("img");
      img.src = e.target.result;

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

  document.querySelector(".go-back_Btn").style.display = "none"

  courseGrid.innerHTML = ``;

    data.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-card");
        const img = document.createElement("img");
        img.src = course.image_url;
        div.appendChild(img);
        const div2 = document.createElement("div");
        div2.classList.add("course-card-content");
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        h3.textContent = course.title
        p1.textContent = course.description;
        p2.innerHTML = `<b>Level:</b> <span>${course.level}</span> `
        p3.innerHTML = `<b>Language:</b><span> ${course.language} </span>`
        div2.appendChild(h3)
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



const previewDiv2 = document.getElementById("previewDiv2");
const imgIconLabel2 = document.getElementById("imgIconLabel2");
const mediaInput2 = previewDiv2.querySelector("#media2");

mediaInput2.addEventListener("change", function() {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Iconni tozalab olamiz
      imgIconLabel2.innerHTML = `<label id="imgIconLabel2" for="media2"><i class="fa-solid fa-file-video"></i></label>`;

      // Avvalgi videoni olib tashlaymiz
      const existingVideo = previewDiv2.querySelector("video");
      if (existingVideo) {
        previewDiv2.removeChild(existingVideo);
      }

      // Yangi video elementini yaratamiz
      const video = document.createElement("video");
      video.src = e.target.result;
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.style.maxWidth = "100%";
      video.style.borderRadius = "10px";


            // Metadata yuklanganda video uzunligini olish
            video.addEventListener("loadedmetadata", function() {
              const durationInSeconds = video.duration;
              const minutes = Math.floor(durationInSeconds / 60);
              const seconds = Math.floor(durationInSeconds % 60);
              // console.log(`Video uzunligi: ${minutes} daqiqa ${seconds} soniya`);
            });

      // Videoni divga qo'shamiz
      previewDiv2.appendChild(video);
    };
    reader.readAsDataURL(file);
  }
});

const selectCourse = document.getElementById("selectCourse")


function createTitle(data){

  data.forEach(item => {
    const optiono = document.createElement("option");
    optiono.value = item.title;
    optiono.textContent = item.title;
    selectCourse.appendChild(optiono);
  });
}


customAxios.get("/course/getCourseTitle")
.then(res => {
  if(res.data.message == "ok"){
    createTitle(res.data.data);
  } else {
    console.log(res.data.message);
  }
})
.catch(err => console.log(err));



const lessonForm = document.getElementById("lessonForm");

lessonForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const videoFile = document.getElementById("media2").files[0];
  const title = document.querySelector('input[placeholder="Enter Lesson Title"]').value.trim();
  const description = document.querySelector('textarea[name="lessonDescription"]').value.trim();
  const orderNumber = document.querySelector('input[placeholder="Enter Lesson Number"]').value.trim();
  const selectedCourse = document.getElementById("selectCourse").value;

  if (!videoFile) {
    alert("Video not loaded! Please load the video.");
    return;
  }
  if (!title || !description || !orderNumber || !selectedCourse) {
    alert("Please fill in all fields.!");
    return;
  }

  const video = document.createElement("video");
  video.preload = "metadata";

  video.onloadedmetadata = function() {
    window.URL.revokeObjectURL(video.src);
    const durationInSeconds = video.duration;
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const time = `${minutes}:${seconds}`

    const formData = new FormData();
    formData.append("media", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("orderNumber", orderNumber);
    formData.append("courseTitle", selectedCourse);
    formData.append("duration", time);

    customAxios.post("/lesson/createLesson", formData)
      .then(res => {
        if(res.data.message == 'The lesson number already exists'){
          return alert("The lesson number already exists")
        } else {
          lessonForm.reset();
        }
      })
      .catch(err => console.log(err));
  };

  video.src = URL.createObjectURL(videoFile);
});



async function getLesson (data) {

  document.querySelector(".go-back_Btn").style.display = "block"

  courseGrid.innerHTML = ``;
  data.forEach(lesson => {
    const div = document.createElement("div");
    div.classList.add("course-card");

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
    courseGrid.appendChild(div);
  });
}



courseGrid.addEventListener("click", function(e) {
  const courseCard = e.target.closest(".course-card");
  if (courseCard) {
    const h3 = courseCard.querySelector("h3");
    const courseTitle = h3.textContent;
    

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


const goBackBtn = document.querySelector(".go-back_Btn");

goBackBtn.addEventListener('click', () => {

  customAxios.get("/course/getByIdcategory")
  .then(res =>  {

    if(res.data.message == 'ok'){
        defaultCreateCourse(res.data.data)
    } else {
        console.log(res.data.message);
    }
  })
  .catch(err => console.log(err));
})