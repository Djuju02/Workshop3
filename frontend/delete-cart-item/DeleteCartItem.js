document.getElementById('deleteProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const productId = document.getElementById('productId').value;

    try {
        const response = await fetch(`http://localhost:3000/cart/${userId}/item/${productId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Product deleted from cart successfully!');

        } else {
            const errorMessage = await response.text();
            alert(`Failed to delete product from cart: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        alert('Failed to delete product from cart. Please try again.');
    }
});