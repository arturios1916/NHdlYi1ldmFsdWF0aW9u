/*
* Shopping Cart Requirements:
* - Before you start, please run `npm run start:api` to start mock API server
* - data for mock APIs come from ./db/db.json
* - There are 2 APIs you need to call:
*     - http://localhost:4002/cart : this will provide a list of product-ids for current shopping cart
*     - http://localhost:4002/products : this will provide a list of products with full details
*
* We want to display detail of items in shopping carts. i.e: user has added product 1001 and 1004 to the cart.
* product 1001 is TV and product 1002 is iPad. Thus, we would like to display them in tabular format
* inside table#shopping-cart-tbl as below:
* ID     Item
* 1001   TV
* 1002   iPad
*
* */
const getAllProducts = () => {
  return fetch('http://localhost:4002/products', {
    method: 'GET'
  }).then(
    (response) => response.json()
  );
}

const getUsersCart = () => {
  return fetch('http://localhost:4002/cart', {
    method: 'GET'
  }).then(
    (response) => response.json()
  );
}

const generateCell = (text) => {
  const tr = document.createElement('td');
  const textNode = document.createTextNode(text);
  tr.appendChild(textNode);
  return tr;
};

const generateRow = (...args) => {
  const tr = document.createElement('tr');
  for (const arg of args) {
    tr.appendChild(
      generateCell(arg),
    );
  }
  return tr;
};

const View = {
  init: async () => {
    const tbodyElem = document.getElementById('shopping-cart-tbl').querySelector('tbody');

    const allProducts = await getAllProducts();
    const productsInCart = await getUsersCart();

    const rows = productsInCart
    .map(({ id }) => allProducts.find((product) => product.id === id))
    .map(({ id, name }) => generateRow(id, name))

    for (const row of rows) {
      tbodyElem.appendChild(row)
    }
  }
};
document.addEventListener('DOMContentLoaded', View.init);
