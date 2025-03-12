import { loggedUser } from "./login.js";
import { user } from "./data.js";
const cartListContainer = document.querySelector(".cart-list-container");
const totalItemsAmount = document.querySelector(".total-items-amount");
const totalAmount = document.querySelector(".total-amount");
const shippingFee = document.querySelector(".shipping-fee-price");
const cartCount = document.querySelector(".cart-count");
const findUserIndex = user.findIndex(
  (users) => loggedUser && users.username === loggedUser.username
);

function displayUserCart() {
  user[findUserIndex] = loggedUser;
  updateCartCount();

  while (cartListContainer.firstChild) {
    cartListContainer.removeChild(cartListContainer.firstChild);
  }

  if (loggedUser) {
    createCartList();
  }

  if (!loggedUser || loggedUser.cart.length === 0) {
    createEmptyList();
  }
  updateOrderSummary();
  updateCartCount();
  console.log(user[findUserIndex]);
}

function createEmptyList() {
  const createLi = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.textContent = "Continue Shopping";
  anchor.href = "../html/index.html";

  createLi.textContent = "There are no item in this cart";
  createLi.classList.add("no-cart-item");

  createLi.appendChild(anchor);
  cartListContainer.appendChild(createLi);
}

function updateCartCount() {
  cartCount.textContent = loggedUser
    ? `Cart (${loggedUser.cart.length})`
    : "Cart (0)";
}

function createCartList() {
  loggedUser.cart.forEach((item, index) => {
    const liContainer = document.createElement("li");
    const img = document.createElement("img");
    img.alt = `Item ${index}`;
    img.src = item.src;
    console.log(item);
    liContainer.appendChild(img);

    // create a container for price and item Name
    const infoContainer = document.createElement("div");
    const itemName = document.createElement("p");
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("price");
    itemName.textContent = item.itemName;
    itemPrice.textContent = item.price;

    infoContainer.appendChild(itemName);
    infoContainer.appendChild(itemPrice);
    liContainer.appendChild(infoContainer);

    // create a container for quantity
    const quantityContainer = document.createElement("div");
    const quantityText = document.createElement("p");
    quantityText.classList.add("quantity");
    const quantityInput = document.createElement("input");
    quantityInput.value = item.quantity;
    quantityText.textContent = "Quantity";

    quantityContainer.appendChild(quantityText);
    quantityContainer.appendChild(quantityInput);
    liContainer.appendChild(quantityContainer);

    // create a container for total amount
    const totalContainer = document.createElement("div");
    const itemTotalText = document.createElement("p");
    const itemTotalPrice = document.createElement("p");
    itemTotalPrice.classList.add("total-amount");
    itemTotalText.textContent = "Total Amount";
    itemTotalPrice.textContent = `${item.quantity * item.price} `;

    totalContainer.appendChild(itemTotalText);
    totalContainer.appendChild(itemTotalPrice);
    liContainer.appendChild(totalContainer);

    // create remove button
    const removeButton = document.createElement("button");
    const buttonIcon = document.createElement("i");
    removeButton.classList.add("remove-btn");
    buttonIcon.classList.add("fa-solid", "fa-xmark");
    removeButton.appendChild(buttonIcon);
    liContainer.appendChild(removeButton);
    cartListContainer.appendChild(liContainer);

    removeButton.addEventListener("click", removeItem);
    quantityInput.addEventListener("input", updateQuantity);
  });
}

function updateQuantity(e) {
  console.log(e.target.value);
}

function removeItem(e) {
  const grandParentElement = e.target.parentElement.parentElement.parentElement;
  const selectedParentElement = e.target.parentElement.parentElement;
  let index = Array.from(grandParentElement.children).indexOf(
    selectedParentElement
  );

  user[findUserIndex].cart = loggedUser.cart;

  user[findUserIndex].cart.splice(index, 1);
  console.log(user[findUserIndex]);

  localStorage.setItem("user", JSON.stringify(user[findUserIndex]));

  grandParentElement.removeChild(selectedParentElement);
  displayUserCart();
}

function updateOrderSummary() {
  const totalAmountOrder = loggedUser
    ? loggedUser.cart.reduce((acc, ojb) => acc + ojb.price * ojb.quantity, 0)
    : 0;
  let shippingFeePrice = 0;
  // checks if the current cart checkout is higher than 1000
  if (
    totalAmountOrder < 1000 &&
    loggedUser &&
    user[findUserIndex].cart.length
  ) {
    shippingFeePrice = 20;
  }

  if (loggedUser) {
    totalItemsAmount.textContent = `$${totalAmountOrder}`;
    shippingFee.textContent = `$${shippingFeePrice}`;
    totalAmount.textContent = `$${totalAmountOrder + shippingFeePrice}`;
    return;
  }

  totalAmount.textContent = "$0";
  totalItemsAmount.textContent = "$0";
  shippingFee.textContent = "$0";
}

displayUserCart();
