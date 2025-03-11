import { user } from "./data.js";

const loginBtn = document.querySelectorAll(".login-btn");

let isLogged = false;
loginBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const username = prompt("Please Enter your Username : ", "");
    const password = prompt("Please Enter your Password : ", "");

    const isAuth = user.find(
      (users) => users.username === username && users.password === password
    );
    if (isAuth) {
      localStorage.setItem("user", JSON.stringify(isAuth));
      alert(isAuth.username + " is Logged in");
    } else {
      alert("Wrong Credentials");
    }
  });
});

export const loggedUser = JSON.parse(localStorage.getItem("user"));
