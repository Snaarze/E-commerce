import { products } from "./data.js";
import { user } from "./data.js";
import { loggedUser } from "./login.js";
const openForm = document.querySelector(".login-form");
const productCount = document.querySelector(".product-link-count");
const productName = document.querySelector(".product-name");
const productPrice = document.querySelector(".product-price");
const productRating = document.querySelector(".item-rating");
const addCartBtn = document.querySelector(".add-to-cart-btn");
const cartCount = document.querySelector(".cart-count");
const productQuantity = document.querySelector("#quantity");
const mainImg = document.querySelector(".main-product");
const productOtherImg = document.querySelectorAll(
  ".product-left-container div img"
);
const similarContainer = document.querySelector(".similar-container");

// view of image selectors
const frontView = document.querySelector(".front-view");
const sideView = document.querySelector(".side-view");
const backView = document.querySelector(".back-view");
const topView = document.querySelector(".top-view");
// initial  render
function displayProduct() {
  const params = new URLSearchParams(window.location.search);
  const itemData = JSON.parse(decodeURIComponent(params.get("data")));

  //   change the product count
  productCount.textContent = ` << All Products (${products.length})`;
  productName.textContent = `${itemData.itemName}`;
  productPrice.textContent = `${itemData.price}`;
  mainImg.src = itemData.imgSrc[0];
  productRating.textContent = ` ${itemData.ratingCount} Ratings`;
  productQuantity.setAttribute("max", `${itemData.quantity}`);

  // attach img to preview
  frontView.src = itemData.imgSrc[0];
  sideView.src = itemData.imgSrc[1];
  topView.src = itemData.imgSrc[2];
  backView.src = itemData.imgSrc[3];

  productQuantity.addEventListener("input", (e) => {
    const changeLimitValue = loggedUser.cart.find(
      (item) => item.itemName === itemData.itemName
    );

    if (Number(e.target.value) > Number(e.target.getAttribute("max"))) {
      productQuantity.value = Number(e.target.getAttribute("max"));
    }
  });

  createSimilarItems(itemData);

  cartCount.textContent = loggedUser
    ? `Cart (${loggedUser.cart.length})`
    : `Cart (0)`;
}

function addCart() {
  if (!loggedUser) {
    return openForm.showModal();
  }

  const id = loggedUser.cart.length;
  const params = new URLSearchParams(window.location.search);
  const itemData = JSON.parse(decodeURIComponent(params.get("data")));
  const findUserIndex = user.findIndex(
    (users) => users.username === loggedUser.username
  );

  if (Number(productQuantity.value) < 0) {
    return alert("Please type a valid number");
  }

  user[findUserIndex] = loggedUser;

  const findDuplicate = user[findUserIndex].cart.find(
    (product) => product.itemName === itemData.itemName
  );

  productQuantity.setAttribute(
    "max",
    itemData.quantity - Number(productQuantity.value)
  );

  if (
    findDuplicate &&
    findDuplicate.quantity + Number(productQuantity.value) > itemData.quantity
  ) {
    addCartBtn.setAttribute("disabled", "disabled");
    return;
  }
  if (!findDuplicate) {
    // if (itemData.quantity > findDuplicate.quantity) {
    //   return alert("You have exceeded the Maximum amount to cart");
    // }

    user[findUserIndex].cart.push({
      id: id,
      itemName: itemData.itemName,
      price: itemData.price,
      quantity: Number(productQuantity.value),
    });
  } else {
    const findIndex = user[findUserIndex].cart.findIndex(
      (product) => product.itemName === itemData.itemName
    );
    console.log(findIndex);
    user[findUserIndex].cart[findIndex].quantity += Number(
      productQuantity.value
    );
  }

  localStorage.setItem("user", JSON.stringify(user[findUserIndex]));

  cartCount.textContent = `Cart (${user[findUserIndex].cart.length})`;
}

function createSimilarItems(array) {
  const filteredSimilarProduct = products.filter(
    (product) => product.brand === array.brand
  );
  filteredSimilarProduct.forEach((item, index) => {
    if (array.itemName === item.itemName) {
      return;
    }
    if (index > 5) {
      return;
    }
    // create element
    const liContainer = document.createElement("li");
    const productTag = document.createElement("a");
    const img = document.createElement("img");
    img.src = item.imgSrc[0];
    img.classList.add("product-img");

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("item-info-container");

    const leftContainer = document.createElement("div");
    leftContainer.classList.add("info-left-container");

    const shoeNameText = document.createElement("p");
    shoeNameText.textContent = item.itemName;
    shoeNameText.classList.add("similar-product-name");

    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("star-container");

    leftContainer.append(shoeNameText);
    infoContainer.appendChild(leftContainer);
    for (let i = 0; i < 5; i++) {
      const starImg = document.createElement("img");
      starImg.classList.add("star");
      starImg.src = "../assets/images/star.png";

      ratingContainer.appendChild(starImg);
    }

    const ratings = document.createElement("p");
    ratings.classList.add("similar-item-rating");
    ratings.textContent = `${item.ratingCount} ratings`;

    ratingContainer.appendChild(ratings);

    const shoePrice = document.createElement("p");
    shoePrice.textContent = `$ ${item.price}`;
    shoePrice.classList.add("similar-item-price");

    leftContainer.appendChild(ratingContainer);

    // append all the children to their respective parent
    productTag.appendChild(img);
    productTag.appendChild(infoContainer);
    liContainer.appendChild(productTag);
    infoContainer.appendChild(shoePrice);
    similarContainer.appendChild(liContainer);

    // add event for productTag
    liContainer.addEventListener("click", (e) => {
      viewProduct(e, item);
    });
  });
}

function viewProduct(e, item) {
  e.preventDefault();
  window.location.href = `../html/productView.html?data=${encodeURIComponent(
    JSON.stringify(item)
  )}`;
}

addCartBtn.addEventListener("click", addCart);

productOtherImg.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    mainImg.src = e.target.src;
  });
});

displayProduct();
