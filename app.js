// Selecting UI elements
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Show/Hide Cart Modal
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Product List with Category Info
let products = [
    { id: 1, name: 'Aloe vera', image: 'aloe vera.png', price: 220, category: 'Skin' },
    { id: 2, name: 'Amla', image: 'amla.png', price: 120, category: 'Immunity' },
    { id: 3, name: 'Chamomile', image: 'chamomile.png', price: 200, category: 'Stress' },
    { id: 4, name: 'Garlic', image: 'garlic.png', price: 50, category: 'Digestion' },
    { id: 5, name: 'Giloy', image: 'giloy.png', price: 320, category: 'Immunity' },
    { id: 6, name: 'Ginger', image: 'ginger.png', price: 75, category: ['Digestion', 'Menstruation'] },
    { id: 7, name: 'Neem', image: 'neem.png', price: 35, category: 'Skin' },
    { id: 8, name: 'Tulsi', image: 'tulsi.png', price: 68, category: ['Menstruation', 'Stress'] },
    { id: 9, name: 'Turmeric', image: 'turmeric.png', price: 45, category: 'Skin' },
];

// Cart Array
let listCards = [];

function initApp() {
    list.innerHTML = ''; // Clear the list first
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₹${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
            <button onclick="exploreProduct(${key})" class="explore-btn">Explore</button>
        `;
        list.appendChild(newDiv);
    });
}

// Call initApp() at start
initApp();

// Add to Cart Function
function addToCard(key) {
    if (!listCards[key]) {
        listCards[key] = { ...products[key], quantity: 1 };
    }
    reloadCard();
}

// Reload/Update Cart Display
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value) {
            totalPrice += value.price;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>₹${value.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = `Total: ₹${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
}

// Increase or Decrease Quantity in Cart
function changeQuantity(key, qty) {
    if (qty === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = qty;
        listCards[key].price = qty * products[key].price;
    }
    reloadCard();
}

// Explore Product Function - Redirect to Specific Pages
function exploreProduct(key) {
    const product = products[key];
    let productPage = '';

    switch (product.id) {
        case 1: productPage = 'aloevera_explore.html'; break;
        case 2: productPage = 'amla_explore.html'; break;
        case 3: productPage = 'chamomile_explore.html'; break;
        case 4: productPage = 'garlic_explore.html'; break;
        case 5: productPage = 'giloy_explore.html'; break;
        case 6: productPage = 'ginger_explore.html'; break;
        case 7: productPage = 'neem_explore.html'; break;
        case 8: productPage = 'tulsi_explore.html'; break;
        case 9: productPage = 'turmeric_explore.html'; break;
        default:
            alert('Product details coming soon!');
            return;
    }

    // Open product page in same tab
    window.location.href = productPage;
}

// Checkout Functionality
document.querySelector('.checkout-btn').addEventListener('click', goToInvoice);

function goToInvoice() {
    const cartItems = listCards.filter(item => item); // Remove undefined entries
    const totalPrice = total.innerText;

    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Save data to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice);

    // Redirect to invoice page
    window.location.href = 'invoice.html';
}

// CATEGORY FILTER FUNCTIONALITY
function filterByCategory(category) {
    list.innerHTML = ''; // Clear the list

    // Debug: Log the selected category
    console.log(`Filtering by category: ${category}`);

    // Filter products by category
    let filteredProducts = products.filter(product => 
        Array.isArray(product.category) ? product.category.includes(category) : product.category === category
    );

    // Debug: Log the filtered products
    console.log('Filtered Products:', filteredProducts);

    // Populate filtered product list
    filteredProducts.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₹${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${products.indexOf(value)})">Add To Cart</button>
            <button onclick="exploreProduct(${products.indexOf(value)})" class="explore-btn">Explore</button>
        `;
        list.appendChild(newDiv);
    });
}

// Check if the user is logged in (you can use a token or a flag stored in localStorage)
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Get references to the buttons
const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const logoutLink = document.getElementById('logout-link');

// Function to update the UI based on login status
function updateUI() {
    if (isLoggedIn) {
        // Hide Sign up and Log in buttons
        signupLink.style.display = 'none';
        loginLink.style.display = 'none';
        // Show Logout button
        logoutLink.style.display = 'inline';
    } else {
        // Show Sign up and Log in buttons
        signupLink.style.display = 'inline';
        loginLink.style.display = 'inline';
        // Hide Logout button
        logoutLink.style.display = 'none';
    }
}

// Update UI on page load
document.addEventListener('DOMContentLoaded', updateUI);

// Logout functionality
logoutLink.addEventListener('click', () => {
    localStorage.setItem('isLoggedIn', 'false');
    updateUI();
});

// Add Event Listeners to Category Buttons
const categoryButtons = document.querySelectorAll('.category');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCategory = button.innerText;

        if (selectedCategory === 'All') {
            initApp(); // Show all products
        } else {
            filterByCategory(selectedCategory);
        }
    });
});