// Misol ma'lumotlar (haqiqiy ma'lumotlar backenddan olinadi)
const userData = {
    username: "John Doe",
    email: "john.doe@example.com",
    bio: "Dasturchi va o'quvchi. Texnologiya va biznesga qiziqaman.",
    created_at: "2025-04-18",
    profile_image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167"
};
const enrollments = [
    {
        course: {
            title: "Python dasturlash",
            language: "Ingliz"
        },
        enrolled_at: "2025-04-10"
    },
    {
        course: {
            title: "Web dasturlash",
            language: "O'zbek"
        },
        enrolled_at: "2025-04-12"
    }
];
const createdCourses = [
    {
        course: {
            title: "Sun'iy intellekt asoslari",
            language: "Ingliz"
        },
        enrollment_count: 150,
        views_count: 1000
    },
    {
        course: {
            title: "Ma'lumotlar tahlili",
            language: "O'zbek"
        },
        enrollment_count: 80,
        views_count: 500
    }
];
const likes = [
    {
        course: {
            title: "Marketing strategiyalari"
        }
    },
    {
        course: {
            title: "Dizayn asoslari"
        }
    }
];
const comments = [
    {
        text: "Ajoyib kurs, ko'p narsa o'rgandim!",
        course: {
            title: "Python dasturlash"
        },
        create_at: "2025-04-15"
    },
    {
        text: "Tushunarli tushuntirilgan!",
        course: {
            title: "Web dasturlash"
        },
        create_at: "2025-04-16"
    }
];
// Profil ma'lumotlarini ko'rsatish
document.getElementById("username").textContent = userData.username;
document.getElementById("email").textContent = userData.email;
document.getElementById("bio").textContent = userData.bio;
document.getElementById("created_at").textContent = `Ro'yxatdan o'tgan: ${userData.created_at}`;
document.querySelector(".profile-image").src = userData.profile_image;
// Ro'yxatdan o'tgan kurslarni ko'rsatish
const enrollmentList = document.getElementById("enrollment-list");
enrollments.forEach((enrollment)=>{
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
createdCourses.forEach((course)=>{
    const item = document.createElement("div");
    item.className = "course-item";
    item.innerHTML = `
              <div>
                  <h3>${course.course.title}</h3>
                  <p>Til: ${course.course.language}</p>
                  <p class="stats">Sotib olingan: ${course.enrollment_count} | Ko'rishlar: ${course.views_count}</p>
              </div>
              <a href="#edit-course" class="edit-profile-btn">Tahrirlash</a>
          `;
    createdCourseList.appendChild(item);
});
// Yoqtirilgan kurslarni ko'rsatish
const likeList = document.getElementById("like-list");
likes.forEach((like)=>{
    const item = document.createElement("div");
    item.className = "course-item";
    item.innerHTML = `
              <div>
                  <h3>${like.course.title}</h3>
              </div>
              <a href="#view-course" class="edit-profile-btn">Ko'rish</a>
          `;
    likeList.appendChild(item);
});
// Izohlarni ko'rsatish
const commentList = document.getElementById("comment-list");
comments.forEach((comment)=>{
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
tabs.forEach((tab)=>{
    tab.addEventListener("click", ()=>{
        tabs.forEach((t)=>t.classList.remove("active"));
        tabContents.forEach((content)=>content.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

//# sourceMappingURL=profil.6c2c04d4.js.map
