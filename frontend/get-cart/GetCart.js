async function fetchCartItems(userId) {
    try {
        const response = await fetch(`http://localhost:3000/cart/${userId}`);
        const cart = await response.json();

        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = '';

        if (cart && cart.length > 0) {
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
}

// Add event listener to the dropdown menu
document.getElementById('userIdSelect').addEventListener('change', async (event) => {
    const selectedUserId = event.target.value;
    if (selectedUserId) {
        await fetchCartItems(selectedUserId);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const userIdSelect = document.getElementById('userIdSelect');
    const selectedUserId = document.getElementById('selectedUserId');

    try {

        const response = await fetch('http://localhost:3000/userId');
        const users = await response.json();


        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.customerid;
            option.textContent = user.customerid;
            userIdSelect.appendChild(option);
        });


        userIdSelect.addEventListener('change', () => {
            const selectedId = userIdSelect.value;
            selectedUserId.textContent = `Selected User ID: ${selectedId}`;

        });
    } catch (error) {
        console.error('Error fetching user IDs:', error);
        alert('Failed to fetch user IDs. Please try again.');
    }
});