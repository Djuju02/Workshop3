document.getElementById('addProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productId = document.getElementById('productId').value;
    const quantity = document.getElementById('quantity').value;

    const userId = document.getElementById('userIdSelect').value;

    try {
        const response = await fetch(`http://localhost:3000/cart/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newproduct: {
                    productid: parseInt(productId),
                    quantity: parseInt(quantity)
                }
            })
        });

        if (response.ok) {
            alert('Product added to cart successfully!');
            // Redirect to another page or perform any other action upon successful addition
        } else {
            const errorMessage = await response.text();
            alert(`Failed to add product to cart: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart. Please try again.');
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

