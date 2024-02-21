document.getElementById("deleteButton").addEventListener("click", async function() {
    const productId = document.getElementById('productId').value;

    try {
        const response = await fetch(`/products/${productId}`, {
            method: 'DELETE'
        });

        const responseData = await response.json();

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