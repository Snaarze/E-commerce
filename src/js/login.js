import { user } from "./data.js";

const loginBtn = document.querySelectorAll(".login-btn");
const logoutBtn = document.querySelectorAll(".logout-btn");
const closeForm = document.querySelectorAll(".close-form-btn");
const openForm = document.querySelector(".login-form");
const submitBtn = document.querySelector(".submit-btn");
const emailInput = document.querySelector("#email_login");
const passwordInput = document.querySelector("#password_login");
const emailLogged = document.querySelector(".email-logged");
const btnInteraction = document.querySelector(".btn-interaction");
const btnLogged = document.querySelector(".logged-container");

loginBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openForm.showModal();
  });
});

closeForm.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("test");
    openForm.close();
  });
});

logoutBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("user");
    console.log(JSON.parse(localStorage.getItem("user")));
    location.reload();
  });
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const isAuth = user.find(
    (users) =>
      users.email === emailInput.value && users.password === passwordInput.value
  );

  console.log(emailInput.value);
  console.log(passwordInput.value);
  console.log(isAuth);

  if (isAuth) {
    openForm.close();
    localStorage.setItem("user", JSON.stringify(isAuth));
    checkLoginUser();
    location.reload();
  }
});

function checkLoginUser() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    emailLogged.textContent = user.email;
    btnLogged.classList.remove("hide-btn");
    btnInteraction.classList.add("hide-btn");
  } else {
    btnLogged.classList.add("hide-btn");
    btnInteraction.classList.remove("hide-btn");
  }
}
// submitBtn.foreach((btn) => {
checkLoginUser();
// });

export const loggedUser = JSON.parse(localStorage.getItem("user"));
