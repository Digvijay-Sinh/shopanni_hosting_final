async function getCartItems() {
    // axios.get('http://localhost:5000/wishlistItems')
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // // try {



    const response = await axios.get('/wishlist');
    const wishlistItems = response.data;
    console.log(wishlistItems);
    var i = 0;
    for (const item of wishlistItems) {
        console.log("Wishlist reached")
        console.log(item.product_id);
        const responseProduct = await axios.get(`http://localhost:5000/api/v1/products/${item.product_id}`);
        const product = responseProduct.data[0];

        console.log(product);
        const responseImage = await axios.get(`http://localhost:5000/images/${item.product_id}`);
        const imageData = responseImage.data;
        const imageName = imageData.image_url1;
        console.log(imageName);

        // Get the table body element
        var tableBody = document.querySelector('#wishlistTable tbody');

        // Create a new table row element
        var newRow = document.createElement('tr');
        newRow.classList.add('table_row');

        // Create the table cells for the new row
        var cell1 = document.createElement('td');
        cell1.classList.add('column-1');
        cell1.innerHTML = `<div class="how-itemcart1"><img src="images/${imageName}" alt="IMG" /></div>`;

        var cell2 = document.createElement('td');
        cell2.classList.add('column-2');
        cell2.textContent = `${product.name}`;

        var cell3 = document.createElement('td');
        cell3.classList.add('column-3');
        cell3.textContent = `${product.price}`;


        // Add the table cells to the new row
        newRow.appendChild(cell1);
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);


        // Add the new row to the table body
        tableBody.appendChild(newRow);
    }
    //     amount = amount + (parseInt(product.price) * parseInt(item.quantity));
    //     // console.log(totalAmount);
    //     var span = document.querySelector('#totalAmount');
    //     span.innerHTML = `₹ ${amount}`
    // console.log("fwdfdefewfwfw");

    // }
    // } catch {
    //     console.log("Some exception occured")
    // }
}

getCartItems()



function updateCart() {
    // Get the update button element
    const updateBtn = document.querySelector('#update-cart-btn');

    // Add an event listener to the update button
    updateBtn.addEventListener('click', async function() {
        try {
            // Get all the rows in the cart table
            const cartRows = document.querySelectorAll('#cartTable tbody tr');

            // Create an array to store the updated cart data
            const updatedCart = [];

            // Loop through all the rows in the cart table
            for (const row of cartRows) {
                // Get the product ID, name, and quantity from the row
                const productId = row.querySelector('.column-1 img').getAttribute('src').split('/').pop().split('.')[0];
                const name = row.querySelector('.column-2').textContent.trim();
                const quantity = row.querySelector('.num-product').value;

                // Create an object to represent the updated cart item
                const updatedCartItem = {
                    product_id: productId,
                    name: name,
                    quantity: quantity
                };

                // Add the updated cart item to the array
                updatedCart.push(updatedCartItem);
            }

            // Send an Axios POST request to the server with the updated cart data
            const response = await axios.post('/updateCart', { cart: updatedCart });

            // Log the response from the server
            console.log(response.data);
        } catch {
            console.log("Some exception occurred");
        }
    });

}



// function checkout() {
//     console.log("checkout function reached");
//     // add checkout
//     const form = document.getElementById('checkoutForm');
//     console.log(form); // check the value of form


//     const formData = new FormData(form);

//     const name = formData.get('name');
//     const address = formData.get('address');
//     const phone = formData.get('phone');
//     const email = formData.get('email');
//     const landmark = formData.get('landmark');
//     const state = formData.get('state');
//     const district = formData.get('district');

//     // const price = formData.get('price');
//     // const category_id = formData.get('category_id');
//     // const image_url = "/abc.jpg"
//     const data = {
//         name,
//         address,
//         phone,
//         email,
//         landmark,
//         state,
//         district,

//         // ,
//         // price,
//         // category_id,
//         // image_url
//     };
//     console.log(data);

//     axios.post('http://localhost:5000/checkout', data)
//         .then(response => {
//             console.log(response.data);
//             // location.reload()
//         })
//         .catch(error => {
//             console.error(error);
//         });


// }




function logout() {
    axios.get('/logout')
        .then(response => {

            // handle successful logout
            console.log(response.data);
        })
        .catch(error => {
            // handle error
            console.log(error);
        });
}