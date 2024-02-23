
document.getElementById('product-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const stockquantity = parseInt(document.getElementById('stockquantity').value);

    console.log(price);

    if (name.length > 100) {
        alert('Name is too long. Maximum length is 255 characters.');
        return;
    }

    if (description.length > 500) {
        alert('Description is too long. Maximum length is 255 characters.');
        return;
    }

    if (price < 0) {
        alert('Price must be a non-negative number.');
        return;
    }

    if (isNaN(stockquantity) || stockquantity < 0 || !Number.isInteger(stockquantity)) {
        alert('Stock quantity must be a positive integer.');
        return;
    }

    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            price,
            stockquantity
        })
    });

    const message = document.getElementById('Message');

    if (response.ok) {
        const product = await response.json();
        console.log('Product created:', product);
        message.textContent = "Success";

    } else {
        console.error('Error:', response.statusText);
        message.textContent = "Add Fail";
    }
});

