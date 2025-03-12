import { user } from "./data.js";

const loginBtn = document.querySelectorAll(".login-btn");
const logoutBtn = document.querySelectorAll(".logout-btn");

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
      location.reload();
    } else {
      alert("Wrong Credentials");
    }
  });
});

logoutBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("user");
    console.log(JSON.parse(localStorage.getItem("user")));
    location.reload();
  });
});

export const loggedUser = JSON.parse(localStorage.getItem("user"));
