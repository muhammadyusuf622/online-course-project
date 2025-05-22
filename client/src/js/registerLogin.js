import customAxios from "./axios.js";

customAxios.post("/user/checkToken")
.then(res => {
  if(res.data.message == "ok"){
    return window.location.href = "/pages/home.html";
  }
})
.catch(err => console.log(err));

const registerForm = document.querySelector('#registerForm');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = {}
  const inputs = registerForm.querySelectorAll('input');

  inputs.forEach(input => {

    if ((input.name == "password" || input.name == "confirm_password") && input.value.length < 4) {
      return alert("Password must be more than four characters");
    }
    

    user[input.name] = input.value;
  });

  if(user.password !== user.confirm_password){
    return alert(`The passwords are not the same.`);
  }

  customAxios.post("/user/register", user)
  .then(response => {
    if(response.data.message == "ok"){
      return window.location.href = "/pages/home.html";
    }
  })
  .catch(error => {
    console.error(error);
  });

})