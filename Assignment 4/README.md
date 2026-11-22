Frontend Lab Assignment 4 — ShopDynamic
A responsive e-commerce product page built with HTML, CSS, Bootstrap 5, and vanilla JavaScript.
Features
- Product cards are generated dynamically from a static JavaScript array.
- Each card displays its image, name, description, category, rating, selling price, original price, and discount.
- Add-to-cart functionality with one cart entry per product.
- Adding the same product again increases its quantity.
- Quantity increase/decrease and remove-item controls.
- Automatic item count, subtotal, and grand-total calculation.
- Out-of-stock products are visibly marked and cannot be added.
- Responsive product grid and shopping-cart layout.
Project structure
Frontend_Lab_Assignment_4/
├── index.html
├── style.css
├── script.js
└── README.md
Run locally
1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open index.html in a browser. For the best development experience, use the VS Code Live Server extension.
Bootstrap is loaded through its CDN, so an internet connection is required for Bootstrap styling and components. Product images are also loaded from Unsplash.
Technologies
- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript (DOM manipulation)
Notes
The checkout button is a front-end demo action only; no payment or backend checkout is connected.
