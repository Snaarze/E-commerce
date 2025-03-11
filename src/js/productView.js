import { products } from "./data.js";
import { user } from "./data.js";
import { loggedUser } from "./login.js";
const productCount = document.querySelector(".product-link-count");
const productName = document.querySelector(".product-name");
const productPrice = document.querySelector(".product-price");
const productRating = document.querySelector(".item-rating");
const addCartBtn = document.querySelector(".add-to-cart-btn");
const cartCount = document.querySelector(".cart-count");

// initial  render
function displayProduct() {
  const params = new URLSearchParams(window.location.search);
  const itemData = JSON.parse(decodeURIComponent(params.get("data")));

  //   change the product count
  productCount.textContent = ` << All Products (${products.length})`;
  productName.textContent = `${itemData.itemName}`;
  productPrice.textContent = `${itemData.price}`;
  productRating.textContent = ` ${itemData.ratingCount} Ratings`;
}

function addCart() {
  const id = loggedUser.cart.length;
  const params = new URLSearchParams(window.location.search);
  const itemData = JSON.parse(decodeURIComponent(params.get("data")));
  const findUserIndex = user.findIndex(
    (users) => users.username === loggedUser.username
  );

  const findDuplicate = user[findUserIndex].cart.find(
    (product) => product.itemName === itemData.itemName
  );
  console.log(findDuplicate);
  user[findUserIndex] = loggedUser;

  if (!findDuplicate) {
    user[findUserIndex].cart.push({
      id: id,
      itemName: itemData.itemName,
      price: itemData.price,
      quantity: 1,
    });
  } else {
    const findIndex = user[findUserIndex].cart.findIndex(
      (product) => product.itemName === itemData.itemName
    );
    console.log(findIndex);
    user[findUserIndex].cart[findIndex].quantity += 2;
  }

  localStorage.setItem("user", JSON.stringify(user[findUserIndex]));

  cartCount.textContent = `Cart (${user[findUserIndex].cart.length})`;
}

addCartBtn.addEventListener("click", addCart);

cartCount.textContent = `Cart (${loggedUser.cart.length})` || "Cart (0)";
displayProduct();
