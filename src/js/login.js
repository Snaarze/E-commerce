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
const signupModalBtn = document.querySelector(".signup-modal-btn");
const signupForm = document.querySelector(".signup-form");
const memberBtn = document.querySelector(".member-btn");
const closeSignupBtn = document.querySelectorAll(".close-signup-btn");
const validationText = document.querySelector(".validation-text");
const signupBtn = document.querySelector(".signup-btn");

signupBtn.addEventListener("click", () => {
  signupForm.showModal();
});
loginBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openForm.showModal();
  });
});

memberBtn.addEventListener("click", () => {
  openForm.showModal();
  signupForm.close();
});

signupModalBtn.addEventListener("click", () => {
  openForm.close();
  signupForm.showModal();
});

closeForm.forEach((btn) => {
  btn.addEventListener("click", () => {
    openForm.close();
    emailInput.value = "";
    passwordInput.value = "";
  });
});

closeSignupBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    signupForm.close();
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
  console.log(isAuth);

  if (!isAuth) {
    validationText.style.display = "block";
    validationText.textContent = "Wrong Email or Password";
    setTimeout(() => {
      validationText.style.display = "none";
      emailInput.style.border = "1px solid red";
    }, 3000);
  }

  if (!emailInput.validity.valid) {
    // if the email field is invalid
    // display an appropriate error message
    showError();
    // prevent form submission
    e.preventDefault();
  }

  console.log(emailInput.value);
  console.log(passwordInput.value);
  console.log(isAuth);

  if (isAuth) {
    openForm.close();
    location.reload();
    localStorage.setItem("user", JSON.stringify(isAuth));
  }
});

emailInput.addEventListener("event", checkEmailValidation);

function checkEmailValidation() {
  if (emailInput.validity.valid) {
    validationText.textContent = ""; // Remove the message content
    validationText.className = "error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showError();
  }
}

function showError() {
  if (emailInput.validity.valueMissing) {
    // If empty
    validationText.textContent = "You need to enter an email address.";
  } else if (emailInput.validity.typeMismatch) {
    // If it's not an email address,
    validationText.textContent = "Entered value needs to be an email address.";
  } else if (emailInput.validity.tooShort) {
    // If the value is too short,
    validationText.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  // Add the `active` class
  validationText.className = "error active";
}

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

checkLoginUser();

export const loggedUser = JSON.parse(localStorage.getItem("user"));
