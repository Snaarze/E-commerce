import { products } from "./data.js";

const productContainer = document.querySelector(".product-container");
const categoriesContainer = document.querySelector(".categories ul");
const productCount = document.querySelector(".product-count");

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
    img.src = "../assets/images/shoe1.png";
    img.classList.add("product-img");

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
    ratings.textContent = "36 Ratings";

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

  let liElement = e.target.closest("li").querySelector("p").textContent.trim();

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

categoriesContainer.addEventListener("click", renderSelectedCategory);

// initial run
renderCategories();
renderAllProduct();
