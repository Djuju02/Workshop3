let id_modify = 0;
document.getElementById("modifyProductForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const newname = document.getElementById('newName').value ;
    const newdescription = document.getElementById('newDescription').value;
    const newprice = document.getElementById('newPrice').value ;
    const newstock = document.getElementById('newStock').value ;

    try {

        const response = await fetch(`http://localhost:3000/products/${id_modify}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newname,
                newdescription,
                newprice,
                newstock
            })
        });

        const productData = await response.json();

        if (!response.ok) {
            throw new Error('Product not found');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Product not found. Please enter a valid product ID.');
    }

});

document.getElementById("id_to_look_for").addEventListener("input", function(event) {

    var inputValue = event.target.value;

    var numericValue = inputValue.replace(/\D/g, '');

    event.target.value = numericValue;
});

document.getElementById("goButton").addEventListener("click", function() {

    var productId = document.getElementById("id_to_look_for").value;
    var message= document.getElementById("message");
    var call = "http://localhost:3000/products/"+productId;

    const name = document.getElementById("newName").value;
    const description = document.getElementById("newDescription");
    const price = document.getElementById("newPrice").value;
    const stock = document.getElementById("newStock").value;

    if(productId)
        fetch(call)
            .then(response => response.json())
            .then(data => {

                console.log(data);
                if (data && !Array.isArray(data)) {

                    document.querySelector('.hidden-input').style.display = 'block';

                    document.getElementById('newName').value = data.name;
                    document.getElementById("newDescription").value = data.description;
                    document.getElementById("newPrice").value= data.price;
                    document.getElementById("newStock").value= data.stockquantity;

                    id_modify = productId;

                } else {
                    console.log('Aucun produits correspondants');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
});

