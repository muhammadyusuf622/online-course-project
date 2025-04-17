import customAxios from "./axios.js";

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
    return alert("The passwords are not the same.");
  }

  console.log(user);

  customAxios.post("/createUser", user)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

})