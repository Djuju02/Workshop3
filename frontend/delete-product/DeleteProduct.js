document.getElementById("deleteButton").addEventListener("click", function() {
    const productId = document.getElementById('productID').value;
    document.getElementById('productID').value;

    try {
        const response = fetch(`/products/${productId}`, {
            method: 'DELETE'
        });

        const responseData = response.json();

        if (response.ok) {
            alert('Product deleted successfully!');
            // Optionally, perform any other action after successful deletion
        } else {
            alert(responseData.message || 'Failed to delete product. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete product. Please try again.');
    }
});