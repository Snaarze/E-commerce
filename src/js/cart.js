import { loggedUser } from "./login.js";
const cartListContainer = document.querySelector(".cart-list-container");
function displayUserCart() {}

function createCartList() {
  loggedUser.cart.forEach((item, index) => {
    const liContainer = document.createElement("li");
    const img = document.createElement("img");
    img.alt = `Item ${index}`;
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
    buttonIcon.classList.add("fa-solid", "fa-xmark");
    removeButton.appendChild(buttonIcon);
    liContainer.appendChild(removeButton);
    cartListContainer.appendChild(liContainer);
  });
}

createCartList();
