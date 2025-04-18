import customAxios from "./axios";
import CryptoJS from "crypto-js";

customAxios.post("/user/checkToken")
.then(res => {
  if(res.data.message == "ok"){
    return window.location.href = "/pages/home.html";
  }
})
.catch(err => console.log(err));

const loginForm = document.querySelector("#loginForm");

if(loginForm){
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const inputs = loginForm.querySelectorAll("input");
  
    const user = {}
  
    inputs.forEach(input => {
      user[input.name] = input.value;
    });
  
    if(!user.email || !user.password){
      return alert("Enter email or password");
    }
  
    customAxios.post("/user/login", user)
    .then(data => {

      if(data.data.message == 'ok'){
        return window.location.href = "/pages/home.html";
      } else {
        return alert("Email Or Password Error");
      }
    })
    .catch(err => console.log(err));
  });
}

const forgotForm = document.querySelector("#forgotForm");

if (forgotForm) {
  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = forgotForm.querySelector("input");
    if (!input) {
      alert("Input Not Found!");
      return;
    }

    if (!input.name || !input.value) {
      alert("Enter Email");
      return;
    }

    const user = { [input.name]: input.value };

    customAxios.post("/user/forgotPassword", user)
      .then(data => {
        if (data?.data?.message === "ok" && data?.data?.password) {
          try {
            const hashedPassword = CryptoJS.SHA256(data.data.password).toString();
            console.log("sadnajsnda")
            user['password'] = hashedPassword;
            localStorage.setItem("forgot", JSON.stringify(user));
            window.location.href = "/pages/secretPage.html";
          } catch (e) {
            console.error("localStorage ga yozishda xato:", e);
            alert("Ma'lumotni saqlashda xato yuz berdi!");
          }
        } else {
          console.error("Backenddan kutilgan javob kelmadi:", data);
          alert("Ma'lumot noto'g'ri, qayta urinib ko'ring!");
        }
      })
      .catch(err => {
        console.error("Xato yuz berdi:", err);
        alert("Xato yuz berdi, qayta urinib ko'ring!");
      });
  });
}

const secretForm = document.querySelector("#secretForm");

if(secretForm) {

  secretForm.addEventListener("submit" , (e) => {
    e.preventDefault()

    const input = secretForm.querySelector("input")
    const goodPas = secretForm.querySelector("#goodPas");
    const label = secretForm.querySelector("label");


    const storedData = localStorage.getItem("forgot");
    const userData = JSON.parse(storedData);

    if(input.name == "newPassword"){

      if(input.value.length < 4){
        return alert("Password must be at least 4 characters long");
      }

      userData.password = input.value
      customAxios.post("/user/createNewPassword", userData)
      .then(res => console.log(res.data))
      .catch(err => console(err))
      localStorage.removeItem("forgot");
      window.location.href = "/pages/login.html";
      return;
    }


    if (!storedData) {
      alert("Hech qanday ma'lumot topilmadi!");
      return;
    }

    if (!userData.email || !userData.password) {
      alert("Saqlangan ma'lumotda email yoki parol yo'q!");
      return;
    }

    const storedHash = userData.password;
    const hashedGuess = CryptoJS.SHA256(input.value).toString();

    if(storedHash === hashedGuess){
      goodPas.textContent = "Password OK"
      label.textContent = "Enter Your New Password"
      input.name = "newPassword"
      input.placeholder = "New Password"
      input.value = ''
    }else{
      alert("Error Parol");
    }
    
    
  })
}
