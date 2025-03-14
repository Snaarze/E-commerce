import { products } from "./data.js";
import { loggedUser } from "./login.js";
const cartCount = document.querySelector(".cart-count");
const productContainer = document.querySelector(".product-container");
const categoriesContainer = document.querySelector(".categories ul");
const productCount = document.querySelector(".product-count");

if (loggedUser) {
  cartCount.textContent = `Cart (${loggedUser.cart.length})`;
} else {
  cartCount.textContent = "Cart (0)";
}

function renderAllProduct() {
  // remove all the section child if any existing
  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }

  productCount.textContent = `All Products (${products.length})`;
  //   re-render each item of the products
  createProduct(products);
}

function createProduct(array) {
  array.forEach((item) => {
    // create element
    const liContainer = document.createElement("li");
    const productTag = document.createElement("a");
    const img = document.createElement("img");
    img.classList.add("product-img");
    img.src = item.imgSrc[0];

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    const leftContainer = document.createElement("div");
    leftContainer.classList.add("left-container");

    const shoeNameText = document.createElement("p");
    shoeNameText.textContent = item.itemName;
    shoeNameText.classList.add("shoe-name");

    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("ratings-container");

    leftContainer.append(shoeNameText);
    infoContainer.appendChild(leftContainer);
    for (let i = 0; i < 5; i++) {
      const starImg = document.createElement("img");
      starImg.classList.add("star");
      starImg.src = "../assets/images/star.png";

      ratingContainer.appendChild(starImg);
    }

    const ratings = document.createElement("p");
    ratings.classList.add("ratings");
    ratings.textContent = `${item.ratingCount} ratings`;

    ratingContainer.appendChild(ratings);

    const shoePrice = document.createElement("p");
    shoePrice.textContent = `$ ${item.price}`;
    shoePrice.classList.add("price");

    leftContainer.appendChild(ratingContainer);

    // append all the children to their respective parent
    productTag.appendChild(img);
    productTag.appendChild(infoContainer);
    liContainer.appendChild(productTag);
    infoContainer.appendChild(shoePrice);
    productContainer.appendChild(liContainer);

    // add event for productTag
    liContainer.addEventListener("click", (e) => {
      viewProduct(e, item);
    });
  });
}

function renderCategories() {
  const unique = products.filter(
    (obj, index) =>
      products.findIndex((item) => item.brand === obj.brand) === index
  );

  unique.forEach((item) => {
    const liElement = document.createElement("li");
    const imgContainer = document.createElement("a");
    const img = document.createElement("img");
    const categoryName = document.createElement("p");
    categoryName.textContent = item.brand;

    imgContainer.appendChild(img);
    liElement.appendChild(imgContainer);
    liElement.appendChild(categoryName);
    categoriesContainer.appendChild(liElement);
  });
}

function renderSelectedCategory(e) {
  // checks if current target is valid
  if (!e.target.closest("li")) {
    // if not stop the function
    return;
  }

  const liElement = e.target
    .closest("li")
    .querySelector("p")
    .textContent.trim();

  if (liElement === "All Products") {
    renderAllProduct();
    return;
  }

  const filteredProduct = products.filter((item) => item.brand === liElement);
  productCount.textContent = `${filteredProduct[0].brand} (${filteredProduct.length})`;

  //   // remove all the section child if any existing
  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }

  createProduct(filteredProduct);
}

function viewProduct(e, item) {
  e.preventDefault();
  window.location.href = `../html/productViewcopy.html?data=${encodeURIComponent(
    JSON.stringify(item)
  )}`;
}

categoriesContainer.addEventListener("click", renderSelectedCategory);

// initial run
renderCategories();
renderAllProduct();
console.log(JSON.parse(localStorage.getItem("user")));
