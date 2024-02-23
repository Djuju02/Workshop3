document.getElementById("deleteButton").addEventListener("click", async function() {
    const productId = document.getElementById('productID').value;
    document.getElementById('productID').value;

    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE'
        });

        const responseData = await response.json();

        if (response.ok) {
            alert('Product deleted successfully!');
        } else {
            alert(responseData.message || 'Failed to delete product. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete product. Please try again.');
    }
});