// Function to create a product list item
function createProductItem() {
    console.log("Creating")
    const productList = document.getElementById('product-list-items');
    fetch('../assets/product.json')
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}"/>
            <h3>Price: ${product.price}$</h3>
            <button onclick="loadDetailsPage(${product.id})">View Details</button>
            `
            productList.appendChild(productItem);
        });
    });
}
function loadDetailsPage(id){
    window.location.href = `product-details.html?productId=${id}`;
}

//Function to display the details of a product
function showProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const productDetail = document.getElementById('product-details');
    fetch(`../assets/product.json`)
    .then(response => response.json())
    .then(products => products.find(product => product.id === Number(productId)))
    .then(product => {
        productDetail.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}"/>
            <h2>Price: ${product.price}$</h2>
            <p>${product.description}</p>
            <button onclick="addProductToCart(${product.id},'${product.name}','${product.price}')">Add to Cart</button>
            `
      })
}

// Function to add a product to the cart
function addProductToCart(id, name, price) {
    // Get the cart data from localStorage (or create an empty object if it doesn't exist)
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
  
    // Check if the product is already in the cart
    const existingProduct = cart[id];
  
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart[id] = { id, name, price, quantity: 1 }; // Create new entry with id as key
    }
  
    // Update the cart data in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
  }

  //function to show the cart
  function showCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItems = document.getElementById('cart-items');
    let totalPrice = 0;
  
    Object.values(cart).forEach(item => {
      cartItems.innerHTML += `
        <div>
          <h3>${item.name}</h3>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: ${item.quantity * item.price}$</p>
        </div>
      `;
      totalPrice += item.quantity * item.price;
    });
  
    cartItems.innerHTML += `
      <div>
        <h3>Total Price:</h3>
        <p>${totalPrice}$</p>
      </div>
    `;
  }