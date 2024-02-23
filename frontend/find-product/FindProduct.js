document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            const productsList = document.getElementById('products-list');
            if (Array.isArray(data)) {
                data.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.innerHTML = `
                                <h3>${product.name}</h3>
                                <p>${product.description}</p>
                                <p>Price: $${product.price}</p>
                                <p>Stock: ${product.stockquantity}</p>
                            `;
                    productsList.appendChild(productElement);
                });
            } else {
                console.log('La réponse n\'est pas un tableau de produits.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des produits:', error);
        });
});

document.getElementById("id_to_look_for").addEventListener("input", function(event) {
    // Get the input value
    var inputValue = event.target.value;

    // Remove any non-numeric characters from the input
    var numericValue = inputValue.replace(/\D/g, '');

    // Update the input field value with only numeric characters
    event.target.value = numericValue;
});

document.getElementById("goButton").addEventListener("click", function() {

    var productId = document.getElementById("id_to_look_for").value;
    var message= document.getElementById("message");
    var call = "http://localhost:3000/products/"+productId;
    console.log(call);

    const productElement = document.getElementById("one-product");
    productElement.textContent = "";

    if(productId)
        fetch(call)
            .then(response => response.json())
            .then(data => {

                console.log(data);
                if (data && !Array.isArray(data)) {
                    productElement.innerHTML = `
                            <h3>${data.name}</h3>
                            <p>${data.description}</p>
                            <p>Price: $${data.price}</p>
                            <p>Stock: ${data.stockquantity}</p>
                        `;
                    message.textContent = "Le produit est : ";

                } else {
                    console.log('Aucun produits correspondants');
                    message.textContent = "Aucun produits correspondants";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                message.textContent = "Erreur lors de la récupération d'un item";
            });
});