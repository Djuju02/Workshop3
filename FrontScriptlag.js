//const { fetchData } = require('./DB_api.js');

async function fetchProducts() {
    try {
        const response = fetch('/products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

async function displayProducts() {
    try {
        const products = await fetchProducts();
        /*
        const productList = document.getElementById('product-list');

        products.forEach(product => {
            const productItem = document.createElement('div');
            const nameElement = document.createElement('p');
            const descriptionElement = document.createElement('p');
            const priceElement = document.createElement('p');
            const stockElement = document.createElement('p');

            nameElement.textContent = `Name: ${product.name}`;
            descriptionElement.textContent = `Description: ${product.description}`;
            priceElement.textContent = `Price: ${product.price}`;
            stockElement.textContent = `Stock: ${product.price}`;

            productItem.appendChild(nameElement);
            productItem.appendChild(descriptionElement);
            productItem.appendChild(priceElement);
            productItem.appendChild(stockElement);

            productList.appendChild(productItem);
        });

         */
    } catch (error) {
        console.error('Error displaying products:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayProducts);