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
const productQuantity = document.querySelector(".quantity");
const mainImg = document.querySelector(".main-product");
const totalPrice = document.querySelector(".total-amount");
const productOtherImg = document.querySelectorAll("#shoe-details img");
const similarContainer = document.querySelector(".similar-container");
const cartActionModal = document.querySelector(".cart-action-modal");
const descriptionItem = document.querySelector(".description");
// view of image selectors
const frontView = document.querySelector(".front-view");
const sideView = document.querySelector(".side-view");
const backView = document.querySelector(".back-view");
const topView = document.querySelector(".top-view");
// initial  render

// data that passed from the url
const params = new URLSearchParams(window.location.search);
const itemData = JSON.parse(decodeURIComponent(params.get("data")));

function displayProduct() {
  const params = new URLSearchParams(window.location.search);
  const itemData = JSON.parse(decodeURIComponent(params.get("data")));
  console.log(itemData);
  //   change the product count
  productCount.textContent = ` All Products (${products.length})`;
  productName.textContent = `${itemData.itemName}`;
  productPrice.textContent = `${itemData.price}`;
  mainImg.src = itemData.imgSrc[0];
  productRating.textContent = ` ${itemData.ratingCount} Ratings`;
  totalPrice.textContent = `${itemData.price}`;
  const findDuplicate = loggedUser?.cart.find(
    (product) => product.itemName === itemData.itemName
  );

  console.log(loggedUser);

  if (findDuplicate && itemData.itemName === findDuplicate.itemName) {
    productQuantity.setAttribute(
      "max",
      itemData.quantity - findDuplicate.quantity
    );
  } else {
    productQuantity.setAttribute("max", itemData.quantity);
  }

  descriptionItem.textContent = itemData.description;
  // attach img to preview
  frontView.src = itemData.imgSrc[0];
  sideView.src = itemData.imgSrc[1];
  topView.src = itemData.imgSrc[2];
  backView.src = itemData.imgSrc[3];

  productQuantity.addEventListener("input", (e) => {
    if (Number(e.target.value) > Number(e.target.getAttribute("max"))) {
      productQuantity.value = Number(e.target.getAttribute("max"));
    }
  });

  const maxValue = Number(productQuantity.getAttribute("max"));

  if (maxValue < 1) {
    addCartBtn.disabled = true;
    productQuantity.value = 0;
    productQuantity.disabled = true;
  }

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

  if (Number(productQuantity.value) < 0) {
    return alert("Please type a valid number");
  }

  const findUserIndex = user.findIndex(
    (users) => users.username === loggedUser.username
  );

  user[findUserIndex] = loggedUser;

  const findDuplicate = user[findUserIndex].cart.find(
    (product) => product.itemName === itemData.itemName
  );

  if (!findDuplicate) {
    user[findUserIndex].cart.push({
      id: id,
      itemName: itemData.itemName,
      price: itemData.price,
      quantity: Number(productQuantity.value),
      src: itemData.imgSrc[0],
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
  productQuantity.setAttribute(
    "max",
    Number(productQuantity.getAttribute("max")) - Number(productQuantity.value)
  );

  const maxValue = Number(productQuantity.getAttribute("max"));

  if (maxValue < 1) {
    addCartBtn.disabled = true;
    productQuantity.value = 0;
    productQuantity.disabled = true;
  }

  if (Number(productQuantity.value) > maxValue) {
    productQuantity.value = maxValue;
  }

  localStorage.setItem("user", JSON.stringify(user[findUserIndex]));

  cartCount.textContent = `Cart (${user[findUserIndex].cart.length})`;
  cartActionModal.showModal();

  if (Number(productQuantity.value) > maxValue) {
    productQuantity.value = maxValue;
  }

  setTimeout(() => {
    cartActionModal.close();
  }, 2000);
}

function createSimilarItems(array) {
  const filteredSimilarProduct = products.filter(
    (product) => product.brand === array.brand
  );

  let displayedIndexes = [];

  for (let i = 0; i < 4; i++) {
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * filteredSimilarProduct.length);
    } while (displayedIndexes.includes(randomNumber));

    displayedIndexes.push(randomNumber);

    if (array.itemName === filteredSimilarProduct[randomNumber].itemName) {
      i--;
      continue;
    }

    console.log(filteredSimilarProduct[randomNumber].imgSrc);
    console.log(randomNumber);

    const otherShoesSection = document.querySelector(".other-shoes-section");
    const otherShoesList = document.createElement("ul");
    otherShoesList.classList.add("other-shoes");

    const liImage = document.createElement("li");
    const shoeImage = document.createElement("img");
    shoeImage.src = filteredSimilarProduct[randomNumber].imgSrc[0];
    shoeImage.alt = "shoe image";
    liImage.appendChild(shoeImage);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("other-shoes-details");

    const liShoeName = document.createElement("li");
    liShoeName.textContent = filteredSimilarProduct[randomNumber].itemName;
    liShoeName.classList = "shoe-name";

    detailsContainer.appendChild(liShoeName);

    const ratingDiv = document.createElement("div");
    const liStars = document.createElement("li");
    liStars.id = "star";

    for (let j = 0; j < 5; j++) {
      const starImg = document.createElement("img");
      starImg.src = "../assets/images/star.png";
      starImg.alt = "star";
      liStars.appendChild(starImg);
    }

    const ratings = document.createElement("p");
    ratings.textContent = `${filteredSimilarProduct[randomNumber].ratingCount} Rating`;

    const priceSpan = document.createElement("span");
    priceSpan.textContent = `$${filteredSimilarProduct[randomNumber].price}`;
    priceSpan.classList = "other-price-item";
    ratingDiv.appendChild(liStars);
    ratingDiv.appendChild(ratings);
    ratingDiv.appendChild(priceSpan);
    detailsContainer.appendChild(ratingDiv);

    // Append all elements to the list
    otherShoesList.appendChild(liImage);
    otherShoesList.appendChild(detailsContainer);

    // Append to the section
    otherShoesSection.appendChild(otherShoesList);

    // Add event listener for navigation
    otherShoesList.addEventListener("click", (e) => {
      viewProduct(e, filteredSimilarProduct[randomNumber]);
    });
  }
  // filteredSimilarProduct.forEach((item, index) => {
  //   if (array.itemName === item.itemName) {
  //     return;
  //   }
  //   if (index > 5) {
  //     return;
  //   }
  //   // create element
  //   const liContainer = document.createElement("li");
  //   const productTag = document.createElement("a");
  //   const img = document.createElement("img");
  //   img.src = item.imgSrc[0];
  //   img.classList.add("product-img");

  //   const infoContainer = document.createElement("div");
  //   infoContainer.classList.add("item-info-container");

  //   const leftContainer = document.createElement("div");
  //   leftContainer.classList.add("info-left-container");

  //   const shoeNameText = document.createElement("p");
  //   shoeNameText.textContent = item.itemName;
  //   shoeNameText.classList.add("similar-product-name");

  //   const ratingContainer = document.createElement("div");
  //   ratingContainer.classList.add("star-container");

  //   leftContainer.append(shoeNameText);
  //   infoContainer.appendChild(leftContainer);
  //   for (let i = 0; i < 5; i++) {
  //     const starImg = document.createElement("img");
  //     starImg.classList.add("star");
  //     starImg.src = "../assets/images/star.png";

  //     ratingContainer.appendChild(starImg);
  //   }

  //   const ratings = document.createElement("p");
  //   ratings.classList.add("similar-item-rating");
  //   ratings.textContent = `${item.ratingCount} ratings`;

  //   ratingContainer.appendChild(ratings);

  //   const shoePrice = document.createElement("p");
  //   shoePrice.textContent = `$ ${item.price}`;
  //   shoePrice.classList.add("similar-item-price");

  //   leftContainer.appendChild(ratingContainer);

  //   // append all the children to their respective parent
  //   productTag.appendChild(img);
  //   productTag.appendChild(infoContainer);
  //   liContainer.appendChild(productTag);
  //   infoContainer.appendChild(shoePrice);
  //   similarContainer.appendChild(liContainer);

  //   // add event for productTag
  //   liContainer.addEventListener("click", (e) => {
  //     viewProduct(e, item);
  //   });
  // });
}

function viewProduct(e, item) {
  e.preventDefault();
  window.location.href = `../html/productViewCopy.html?data=${encodeURIComponent(
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
