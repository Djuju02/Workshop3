document.addEventListener('DOMContentLoaded', async () => {
    const userId = 1; // Replace with the actual user ID or retrieve it dynamically

    try {
        const response = await fetch(`http://localhost:3000/cart/${userId}`);
        const cart = await response.json();

        if (cart && cart.length > 0) {
            const cartItemsContainer = document.getElementById('cartItems');
            cartItemsContainer.innerHTML = '';

            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.innerHTML = `
                            <p><strong>Cart ID:</strong> ${item.cartid}</p>
                            <p><strong>Customer ID:</strong> ${item.customerid}</p>
                            <p><strong>Selected Products:</strong> ${JSON.stringify(item.sel_product)}</p>
                            <p><strong>Total:</strong> $${item.total}</p>
                            <hr>
                        `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        } else {
            alert('No orders found for this user.');
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        alert('Failed to fetch cart. Please try again.');
    }
});