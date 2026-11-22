// Product data provided in the assignment PDF.
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    description: "Comfortable wireless headphones with clear sound and deep bass.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    rating: 4.5,
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    description: "A stylish smartwatch for fitness tracking and daily use.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Accessories",
    rating: 4.2,
    inStock: true
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    description: "Lightweight running shoes designed for comfort and everyday workouts.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Footwear",
    rating: 4.4,
    inStock: true
  },
  {
    id: 4,
    name: "Travel Backpack",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    description: "A spacious backpack suitable for college, office, and travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Bags",
    rating: 4.3,
    inStock: true
  },
  {
    id: 5,
    name: "Digital Camera",
    price: 15999,
    originalPrice: 18999,
    discount: 16,
    description: "Capture memorable moments with a compact digital camera.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category: "Electronics",
    rating: 4.6,
    inStock: true
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    description: "Modern sunglasses with a stylish frame for everyday wear.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    category: "Fashion",
    rating: 4.1,
    inStock: true
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    description: "Prepare fresh coffee at home with this easy-to-use coffee maker.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    category: "Home Appliances",
    rating: 4.4,
    inStock: false
  }
];

// Cart stores one entry per product: { productId, quantity }.
let cart = [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartHeadingCount = document.getElementById("cartHeadingCount");
const totalItems = document.getElementById("totalItems");
const subtotalElement = document.getElementById("subtotal");
const grandTotalElement = document.getElementById("grandTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const toastElement = document.getElementById("storeToast");
const toastMessage = document.getElementById("toastMessage");

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

function renderProducts() {
  document.getElementById("productCount").textContent =
    `${products.length} products`;

  productGrid.innerHTML = products.map((product) => `
    <div class="col-6 col-md-6 col-xl-4">
      <article class="product-card">
        <div class="product-image-wrap">
          <img class="product-image"
               src="${product.image}"
               alt="${product.name}"
               loading="lazy"
               onerror="this.src='https://placehold.co/500x400/f1f3ef/286b4b?text=Product+Image'">
          <span class="discount-tag">${product.discount}% OFF</span>
          ${!product.inStock ? '<span class="stock-tag">OUT OF STOCK</span>' : ""}
        </div>
        <div class="product-info">
          <div class="d-flex justify-content-between align-items-center">
            <span class="product-category">${product.category}</span>
            <span class="rating">★ ${product.rating}</span>
          </div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="price-row">
            <span class="current-price">${formatPrice(product.price)}</span>
            <span class="original-price">${formatPrice(product.originalPrice)}</span>
          </div>
          <button class="add-btn" type="button"
                  onclick="addToCart(${product.id})"
                  ${!product.inStock ? "disabled" : ""}>
            ${product.inStock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </article>
    </div>
  `).join("");
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product || !product.inStock) {
    showToast("Sorry, this product is out of stock.");
    return;
  }

  const existingItem = cart.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  renderCart();
  showToast(`${product.name} added to your cart.`);
}

function changeQuantity(productId, change) {
  const item = cart.find((cartItem) => cartItem.productId === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
  }
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function renderCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = cart.reduce((sum, item) => {
    const product = products.find((productItem) => productItem.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  cartCount.textContent = itemCount;
  cartHeadingCount.textContent = `(${itemCount})`;
  totalItems.textContent = itemCount;
  subtotalElement.textContent = formatPrice(grandTotal);
  grandTotalElement.textContent = formatPrice(grandTotal);
  checkoutBtn.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛍️</div>
        <h3>Your cart is empty</h3>
        <p>Find something you love and add it here.</p>
      </div>`;
    return;
  }

  cartItems.innerHTML = cart.map((item) => {
    const product = products.find((productItem) => productItem.id === item.productId);
    const itemSubtotal = product.price * item.quantity;

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}"
             onerror="this.src='https://placehold.co/100x100/f1f3ef/286b4b?text=Item'">
        <div>
          <div class="cart-item-top">
            <p class="cart-item-name">${product.name}</p>
            <button class="remove-btn" type="button"
                    onclick="removeFromCart(${product.id})"
                    aria-label="Remove ${product.name}">×</button>
          </div>
          <p class="cart-item-price">${formatPrice(product.price)}</p>
          <div class="quantity-row">
            <div class="quantity-control" aria-label="Quantity controls">
              <button type="button" onclick="changeQuantity(${product.id}, -1)"
                      aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button type="button" onclick="changeQuantity(${product.id}, 1)"
                      aria-label="Increase quantity">+</button>
            </div>
            <span class="item-subtotal">${formatPrice(itemSubtotal)}</span>
          </div>
        </div>
      </div>`;
  }).join("");
}

function showToast(message) {
  toastMessage.textContent = message;
  if (window.bootstrap) {
    bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 2200 }).show();
  }
}

document.getElementById("clearCart").addEventListener("click", clearCart);
document.getElementById("cartToggle").addEventListener("click", () => {
  document.getElementById("cartPanel").scrollIntoView({ behavior: "smooth", block: "start" });
});
checkoutBtn.addEventListener("click", () => {
  if (cart.length > 0) {
    showToast("Demo checkout: your cart is ready!");
  }
});

renderProducts();
renderCart();
