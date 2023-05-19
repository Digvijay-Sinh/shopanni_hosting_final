async function getOrderItems() {
    // axios.get('http://localhost:5000/wishlistItems')
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // // try {



    const response = await axios.get('/getOrderByUser');
    const orders = response.data;
    console.log(orders);
    var i = 0;
    for (const order of orders) {
        console.log("Orders reached")
        console.log(order);

        const responseOrderItems = await axios.get(`http://localhost:5000/order-items/${order.orders_id}`);
        console.log(order.orders_id);
        const orderItems = responseOrderItems.data;


        for (const item of orderItems) {
            console.log("Orders Items reached")
            console.log(order);

            const responseProduct = await axios.get(`http://localhost:5000/api/v1/products/${item.product_id}`);
            const product = responseProduct.data[0];

            console.log(product);
            const responseImage = await axios.get(`http://localhost:5000/images/${item.product_id}`);
            const imageData = responseImage.data;
            const imageName = imageData.image_url1;
            console.log(imageName);

            // Get the table body element
            var tableBody = document.querySelector('#orderHistoryTable tbody');

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
            var cell4 = document.createElement('td')
            cell4.classList.add('column-4');

            const dateObj = new Date(order.created_at);
            const localDatetimeStr = dateObj.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '');
            cell4.innerHTML = localDatetimeStr;

            var cell5 = document.createElement('td');
            cell5.classList.add('column-5');
            cell5.textContent = `${order.payment_method}`;

            var cell6 = document.createElement('td');
            cell6.classList.add('column-6');
            cell6.textContent = `${order.status}        `;
            var cell7 = document.createElement('td');
            cell7.classList.add('column-7');
            cell7.textContent = `    ${item.quantity}`;
            var cell8 = document.createElement('td');
            cell8.classList.add('column-8');
            cell8.textContent = `${item.quantity*product.price}`;


            // Add the table cells to the new row
            newRow.appendChild(cell1);
            newRow.appendChild(cell2);
            newRow.appendChild(cell3);
            newRow.appendChild(cell4);
            newRow.appendChild(cell5);
            newRow.appendChild(cell6);
            newRow.appendChild(cell7);
            newRow.appendChild(cell8);


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
}
getOrderItems()



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