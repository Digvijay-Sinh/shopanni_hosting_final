    // axios.get('/cart') // Replace '123' with the actual user ID
    //     .then(response => {
    //         const cartItems = response.data;
    //         const cartList = $('#cart-list');
    //         var i = 0;
    //         cartItems.forEach(item => {
    //             console.log("Cart reached")
    //             console.log(item.product_id);
    //             axios.get(`http://localhost:5000/api/v1/products/${item.product_id}`)
    //                 .then(response => {
    //                     // Pre-fill the input fields with the product data
    //                     const product = response.data[0];
    //                     console.log(product);

    //                     axios.get(`http://localhost:5000/images/${item.product_id}`)
    //                         .then(response => {
    //                             const imageData = response.data;

    //                             const imageName = imageData.image_url1;
    //                             console.log(imageName);
    //                             // Get the table body element
    //                             var tableBody = document.querySelector('#cartTable tbody');

    //                             // Create a new table row element
    //                             var newRow = document.createElement('tr');
    //                             newRow.classList.add('table_row');

    //                             // Create the table cells for the new row
    //                             var cell1 = document.createElement('td');
    //                             cell1.classList.add('column-1');
    //                             cell1.innerHTML = `<div class="how-itemcart1"><img src="images/${imageName}" alt="IMG" /></div>`;

    //                             var cell2 = document.createElement('td');
    //                             cell2.classList.add('column-2');
    //                             cell2.textContent = `${product.name}`;

    //                             var cell3 = document.createElement('td');
    //                             cell3.classList.add('column-3');
    //                             cell3.textContent = `${product.price}`;


    //                             var cell4 = document.createElement('td');
    //                             cell4.classList.add('column-4');

    //                             var numWrap = document.createElement('div');
    //                             numWrap.classList.add('wrap-num-product', 'flex-w', 'm-l-auto', 'm-r-0');

    //                             // Create the plus and minus buttons
    //                             var minusButton = document.createElement('div');
    //                             minusButton.classList.add('btn-num-product-down', 'cl8', 'hov-btn3', 'trans-04', 'flex-c-m');
    //                             minusButton.innerHTML = '<i class="fs-16 zmdi zmdi-minus"></i>';

    //                             var input = document.createElement('input');
    //                             input.classList.add('mtext-104', 'cl3', 'txt-center', 'num-product');
    //                             input.type = 'number';
    //                             input.name = 'num-product1';
    //                             input.value = 1;

    //                             var plusButton = document.createElement('div');
    //                             plusButton.classList.add('btn-num-product-up', 'cl8', 'hov-btn3', 'trans-04', 'flex-c-m');
    //                             plusButton.innerHTML = '<i class="fs-16 zmdi zmdi-plus"></i>';

    //                             // Add event listeners to the plus and minus buttons
    //                             minusButton.addEventListener('click', function() {
    //                                 var input = this.parentNode.querySelector('.num-product');
    //                                 var currentValue = parseInt(input.value);
    //                                 if (currentValue > 1) {
    //                                     input.value = currentValue - 1;
    //                                 }
    //                             });

    //                             plusButton.addEventListener('click', function() {
    //                                 var input = this.parentNode.querySelector('.num-product');
    //                                 input.value = parseInt(input.value) + 1;
    //                             });

    //                             // Add the plus and minus buttons to the cell
    //                             numWrap.appendChild(minusButton);
    //                             numWrap.appendChild(input);
    //                             numWrap.appendChild(plusButton);
    //                             cell4.appendChild(numWrap);


    //                             var cell5 = document.createElement('td');
    //                             cell5.classList.add('column-5');
    //                             cell5.textContent = '$ 36.00';

    //                             // Add the table cells to the new row
    // newRow.appendChild(cell1);
    // newRow.appendChild(cell2);
    // newRow.appendChild(cell3);
    // newRow.appendChild(cell4);
    // newRow.appendChild(cell5);

    // // Add the new row to the table body
    // tableBody.appendChild(newRow);

    //                         })
    //                         .catch(error => console.log(error));
    //                 })
    //                 .catch(error => console.log(error));

    //         });
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });

    var amountbeforecoupon = 0;
    var amount = 0;
    var deliveryCharge = 0;
    async function getCartItems() {
        try {
            // const paymentButton = document.getElementById('paymentButton');


            const response = await axios.get('/cart');
            const cartItems = response.data;
            const cartList = $('#cart-list');
            var i = 0;
            for (const item of cartItems) {
                console.log("Cart reached")
                console.log(item.product_id);
                const responseProduct = await axios.get(`http://localhost:5000/api/v1/products/${item.product_id}`);
                const product = responseProduct.data[0];

                console.log(product);
                const responseImage = await axios.get(`http://localhost:5000/images/${item.product_id}`);
                const imageData = responseImage.data;
                const imageName = imageData.image_url1;
                console.log(imageName);

                // Get the table body element
                var tableBody = document.querySelector('#cartTable tbody');

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

                var cell4 = document.createElement('td');
                cell4.classList.add('column-4');

                var numWrap = document.createElement('div');
                numWrap.classList.add('wrap-num-product', 'flex-w', 'm-l-auto', 'm-r-0');

                // Create the plus and minus buttons
                var minusButton = document.createElement('div');
                minusButton.classList.add('btn-num-product-down', 'cl8', 'hov-btn3', 'trans-04', 'flex-c-m');
                minusButton.innerHTML = '<i class="fs-16 zmdi zmdi-minus"></i>';

                var input = document.createElement('input');
                input.classList.add('mtext-104', 'cl3', 'txt-center', 'num-product');
                input.type = 'number';
                input.name = 'num-product1';
                input.value = item.quantity;
                input.setAttribute('id', `prod-${product.product_id}-${item.colour}-${item.product_size_id}-input`);

                var plusButton = document.createElement('div');
                plusButton.classList.add('btn-num-product-up', 'cl8', 'hov-btn3', 'trans-04', 'flex-c-m');
                plusButton.innerHTML = '<i class="fs-16 zmdi zmdi-plus"></i>';

                // Add event listeners to the plus and minus buttons
                minusButton.addEventListener('click', async function() {
                    var input = this.parentNode.querySelector('.num-product');
                    var currentValue = parseInt(input.value);
                    if (currentValue > 0) {
                        input.value = currentValue - 1;
                        try {
                            const session = await axios.get('/session');
                            const userId = session.data.userId;
                            console.log(input.value);
                            const response = await axios.put('/cart', {
                                product_id: item.product_id,
                                user_id: userId,
                                colour: item.colour,
                                product_size_id: item.product_size_id,
                                quantity: input.value
                            });

                            console.log(response.data);
                        } catch (error) {
                            console.error(error);
                        }
                        var newAmount = parseInt(product.price) * parseInt(input.value);

                        const cellNew = document.getElementById(`prod-${product.product_id}-${item.colour}-${item.product_size_id}`);
                        cellNew.textContent = `₹ ${newAmount}`
                        amount = amount - (parseInt(product.price));


                        // var span2 = document.querySelector('#deliveryCharges');
                        // if (amount < 2000) {
                        //     deliveryCharge = 120;

                        //     amount += deliveryCharge;

                        // }else{
                        //     deliveryCharge=0
                        //     amount-=deliveryCharge
                        // }
                        // span2.innerHTML = `₹ ${deliveryCharge}`

                        var span = document.querySelector('#totalAmount');
                        span.innerHTML = `₹ ${amount}`

                    }


                });

                plusButton.addEventListener('click', async function() {
                    var input = this.parentNode.querySelector('.num-product');
                    input.value = parseInt(input.value) + 1;
                    try {
                        const session = await axios.get('/session');
                        const userId = session.data.userId;
                        console.log(input.value);
                        const response = await axios.put('/cart', {
                            product_id: item.product_id,
                            user_id: userId,
                            colour: item.colour,
                            product_size_id: item.product_size_id,
                            quantity: input.value
                        });

                        console.log(response.data);
                    } catch (error) {
                        console.error(error);
                    }
                    var newAmount = parseInt(product.price) * parseInt(input.value);

                    const cellNew = document.getElementById(`prod-${product.product_id}-${item.colour}-${item.product_size_id}`);
                    cellNew.textContent = `₹ ${newAmount}`
                    amount = amount + (parseInt(product.price));


                    // var span2 = document.querySelector('#deliveryCharges');
                    // if (amount < 2000 && deliveryCharge!==120) {
                    //     deliveryCharge = 120;

                    //     amount += deliveryCharge;

                    // }else if(deliveryCharge===120) {
                    //     deliveryCharge=0
                    //     amount-=deliveryCharge
                    // }else{
                    //     deliveryCharge=0
                    // }
                    // span2.innerHTML = `₹ ${deliveryCharge}`

                    var span = document.querySelector('#totalAmount');
                    span.innerHTML = `₹ ${amount}`

                });

                // async function updateCartItem() {
                //     try {
                //         const session = await axios.get('/session');
                //         const userId = session.data.userId;
                //         console.log(input.value);
                //         const response = await axios.put('/cart', {
                //             product_id: item.product_id,
                //             user_id: userId,
                //             colour: item.colour,
                //             product_size_id: item.product_size_id,
                //             quantity: input.value
                //         });

                //         console.log(response.data);
                //     } catch (error) {
                //         console.error(error);
                //     }
                // }

                // Add the plus and minus buttons to the cell
                numWrap.appendChild(minusButton);
                numWrap.appendChild(input);
                numWrap.appendChild(plusButton);
                cell4.appendChild(numWrap);

                var cell5 = document.createElement('td');
                cell5.classList.add('column-5');
                cell5.textContent = `₹ ${product.price * item.quantity}`;
                cell5.setAttribute('id', `prod-${product.product_id}-${item.colour}-${item.product_size_id}`);

                var cell6 = document.createElement('td');
                cell6.classList.add('column-6');

                var anchor = document.createElement('a');
                anchor.onclick = async function() {
                    try {
                        const deleteResponse = await axios.delete(`http://localhost:5000/cart/${item.cart_item_id}`);
                        console.log(deleteResponse);
                        location.reload()
                    } catch (error) {
                        console.log(error);
                    }
                };

                var img = document.createElement('img');
                img.src = "./delete.png";
                img.style.width = "30px";

                anchor.appendChild(img);
                cell6.appendChild(anchor);
                // Add the table cells to the new row
                newRow.appendChild(cell1);
                newRow.appendChild(cell2);
                newRow.appendChild(cell3);
                newRow.appendChild(cell4);
                newRow.appendChild(cell5);
                newRow.appendChild(cell6);

                // Add the new row to the table body
                tableBody.appendChild(newRow);
                amount = amount + (parseInt(product.price) * parseInt(item.quantity));
                // console.log(totalAmount);
                var span = document.querySelector('#totalAmount');
                span.innerHTML = `₹ ${amount}`


            }

        } catch {
            console.log("Some exception occured")
        }
    }

    getCartItems()


    async function applyCoupon() {
        amountbeforecoupon = amount;

        const couponCodeInput = document.querySelector('#couponCode');

        const couponCode = couponCodeInput.value.toUpperCase();

        try {
            const responseCoupons = await axios.get(`http://localhost:5000/api/v1/coupons`);
            const coupons = responseCoupons.data
                // Check if the coupon exists
            const coupon = coupons.find(coupon => coupon.code === couponCode);
            if (coupon) {
                // If the coupon exists, apply the discount to the total amount
                const totalAmount = 100; // Replace this with your actual total amount
                const addCouponButton = document.querySelector('#addCouponButton');
                addCouponButton.onclick = null;
                var originalAmount = amount;
                amount = amount - (amount * coupon.discount / 100);
                // var deliveryCharge = 0;
                // if (amount < 2000) {
                //     deliveryCharge = 120;
                //     amount += deliveryCharge;
                // }
                // var discount = originalAmount - amount;
                var span = document.querySelector('#totalAmount');
                // var span2 = document.querySelector('#discountAmount');
                // var span3 = document.querySelector('#deliveryCharges');
                // var span4 = document.querySelector('#cartSubtotal');
                // Get all the divs with class "btn-num-product-down"
                const divs = document.querySelectorAll('.btn-num-product-up');

                // Loop through all the divs and remove the click event listener
                divs.forEach(div => {
                    div.style.pointerEvents = 'none';

                });

                // Get all the divs with class "btn-num-product-down"
                const divs2 = document.querySelectorAll('.btn-num-product-down');

                // Loop through all the divs and remove the click event listener
                divs2.forEach(div => {
                    div.style.pointerEvents = 'none';

                });

                span.innerHTML = `₹ ${amount}`
                    // span4.innerHTML = `₹ ${originalAmount}`
                    // span2.innerHTML = `₹ ${discount}`
                    // span3.innerHTML = `₹ ${deliveryCharge}`
                console.log(`Total amount: ${originalAmount}, Discounted amount: ${amount}`);
            } else {
                // If the coupon does not exist, display an error message to the user using SweetAlert
                swal('Error', 'The coupon you entered does not exist', 'error').then(() => {
                    location.reload()
                });
            }
        } catch (error) {
            console.log(error);
            // Handle error
        }


    }



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
        axios.get('/logoutUser')
            .then(response => {

                // handle successful logout
                console.log(response.data);
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }


    // button.addEventListener('click', () => {
    //     const phone = '916353166673';
    //     const message = '*Check out this cool image!*\nhttps://example.com/images/myimage.jpg';
    //     const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    //     window.open(url, '_blank');
    // });

    function payment() {
        const paymentForm = document.getElementById('paymentForm');
        const errorMessage = document.getElementById('errorMessage');

        // paymentForm.addEventListener('submit', (event) => {
        const paymentMethod = document.getElementById('poption').value;
        if (paymentMethod === '') {
            errorMessage.style.display = 'block';
        } else if (paymentMethod === 'Cash on Delivery') {

        } else if (paymentMethod === 'Online') {
            checkoutOnline()
        } else if (paymentMethod === 'whatsapp') {
            checkoutWhatsapp()
        }
        // });

    }


    function checkoutOnline() {

        console.log("checkout function reached");
        // add checkout
        const form = document.getElementById('checkoutForm');
        console.log(form); // check the value of form


        const formData = new FormData(form);

        const name = formData.get('name');
        const address = formData.get('address');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const landmark = formData.get('landmark');
        const state = formData.get('state');
        const district = formData.get('district');
        // const total = parseInt(document.getElementById('totalAmount').innerHTML)
        var totalAmountStr = document.getElementById("totalAmount").innerHTML;

        // Convert the string to an integer
        var total = amount * 100;

        // const price = formData.get('price');
        // const category_id = formData.get('category_id');
        // const image_url = "/abc.jpg"
        const data = {
            name,
            address,
            phone,
            email,
            landmark,
            state,
            district,
            total

            // ,
            // price,
            // category_id,
            // image_url
        };
        console.log(data);
        // const button = document.getElementById('my-button');
        // button.addEventListener('click', () => {
        // const phone = '916353166673';
        // const imageName = 'images_Screenshot_20230207_025440.png';

        // const message = `*${imageDescription}*\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email}\nLandmark: ${landmark}\nState: ${state}\nDistrict: ${district}\nTotal: ${total}\n`;
        // const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
        // window.open(url, '_blank');
        // });
        axios.post('http://localhost:5000/checkout', data)
            .then(response => {
                console.log("Response with orderId");
                console.log(response);
                const orderIdFromCheckoutRoutes = response.data

                // const orderItems = response.data;
                console.log("Order items got");
                var settings = {
                    "url": "/create/orderId",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "amount": total
                    }),
                };

                //creates new orderId everytime
                $.ajax(settings).done(function(response) {

                    orderId = response.orderId;
                    console.log(orderId);
                    // $("button").show();

                    var options = {
                        key: "rzp_test_7engLIZnkLSmS3", // Enter the Key ID generated from the Dashboard
                        amount: total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        currency: "INR",
                        name: "Acme Corp",
                        description: "Test Transaction",
                        image: "https://example.com/your_logo",
                        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                        handler: function(response) {
                            // alert(response.razorpay_payment_id);
                            // alert(response.razorpay_order_id);
                            // alert(response.razorpay_signature);
                            const razorpay_payment_id = response.razorpay_payment_id;
                            const razorpay_order_id = response.razorpay_order_id;
                            const razorpay_signature = response.razorpay_signature;
                            const verifySettings = {
                                url: "/api/payment/verify",
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                data: {
                                    response,
                                },
                            };

                            axios(verifySettings)
                                .then((response) => {
                                    console.log(response.data);

                                    // You can perform further actions based on the response from the server
                                    if (response.data.signatureIsValid === "true") {
                                        console.log("Payment verification successful");
                                        console.log(razorpay_order_id);
                                        console.log(razorpay_payment_id);
                                        console.log(razorpay_signature);
                                        axios.post('/update/order', {
                                                orderId: orderIdFromCheckoutRoutes,
                                                razorpay_order_id: razorpay_order_id,

                                                razorpay_payment_id: razorpay_payment_id,
                                                razorpay_signature: razorpay_signature // or 'false' depending on your case
                                            })
                                            .then((response) => {
                                                console.log(response);

                                                axios.delete('/userCart')
                                                    .then((response) => {
                                                        console.log(response);
                                                        swal("Order", "is placed successfully !", "success").then(() => {
                                                            location.reload()
                                                        });
                                                        // Reload the page or perform other actions as needed
                                                    })
                                                    .catch((error) => {
                                                        console.error(error);
                                                    });

                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });

                                    } else {
                                        console.log("Payment verification failed");
                                        swal("Payment", "is not completed successfully !", "error").then(() => {
                                            location.reload()
                                        });
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        },
                        prefill: {
                            name: "Gaurav Kumar",
                            email: "gaurav.kumar@example.com",
                            contact: "9000090000",
                        },
                        notes: {
                            address: "Razorpay Corporate Office",

                        },
                        theme: {
                            color: "#E32321",
                        },
                    };
                    var rzp1 = new Razorpay(options);
                    rzp1.on("payment.failed", function(response) {
                        swal("Payment", "is not completed successfully !", "error").then(() => {
                            location.href = "http://localhost:5000/userHome";
                        });
                        // alert(response.error.code);
                        // alert(response.error.description);
                        // alert(response.error.source);
                        // alert(response.error.step);
                        // alert(response.error.reason);
                        // alert(response.error.metadata.order_id);
                        // alert(response.error.metadata.payment_id);
                    });
                    // document.getElementById("rzp-button1").onclick = function(e) {
                    rzp1.open();
                    // e.preventDefault();
                    // };
                });




                console.log(response.data);
                // location.reload()
            })
            .catch(error => {
                console.error(error);
            });



    }



    function checkoutWhatsapp() {

        console.log("checkout function reached");
        // add checkout
        const form = document.getElementById('checkoutForm');
        console.log(form); // check the value of form


        const formData = new FormData(form);

        const name = formData.get('name');
        const address = formData.get('address');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const landmark = formData.get('landmark');
        const state = formData.get('state');
        const district = formData.get('district');
        const total = amount

        // const price = formData.get('price');
        // const category_id = formData.get('category_id');
        // const image_url = "/abc.jpg"
        const data = {
            name,
            address,
            phone,
            email,
            landmark,
            state,
            district,
            total

            // ,
            // price,
            // category_id,
            // image_url
        };
        console.log(data);
        // const button = document.getElementById('my-button');
        // button.addEventListener('click', () => {
        // const phone = '916353166673';
        // const imageName = 'images_Screenshot_20230207_025440.png';

        // const message = `*${imageDescription}*\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email}\nLandmark: ${landmark}\nState: ${state}\nDistrict: ${district}\nTotal: ${total}\n`;
        // const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
        // window.open(url, '_blank');
        // });
        axios.post('http://localhost:5000/checkout', data)
            .then(response => {
                console.log("Response with orderId");
                console.log(response);
                const orderId = response.data
                axios.get(`http://localhost:5000/order-items/${orderId}`)
                    .then(async response => {
                        const orderItems = response.data;
                        var full_message = ``;
                        // Loop through each item and create a message for each one
                        for (let i = 0; i < orderItems.length; i++) {

                            const item = orderItems[i];
                            const responseProduct = await axios.get(`http://localhost:5000/api/v1/products/${item.product_id}`);
                            console.log(responseProduct);
                            const product = responseProduct.data[0];
                            console.log("Product fromm cart");
                            console.log(product);
                            const message = `Order Item: ${product.name}%0AProduct ID: ${item.product_id}%0AQuantity: ${item.quantity}%0AProduct Size ID: ${item.product_size_id}%0AColour: ${item.colour}%0A`;
                            full_message += `${message}\n`
                                // Use the message to send a WhatsApp message

                        }
                        const phone = '916353166673';

                        const url = `https://web.whatsapp.com/send?phone=${phone}&text=${full_message}`;
                        window.open(url, '_blank');
                        axios.delete('/userCart')
                            .then((response) => {
                                console.log(response);
                                swal("Order", "is placed successfully !", "success").then(() => {
                                    location.reload()
                                });
                                // Reload the page or perform other actions as needed
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    })
                    .catch(error => {
                        console.error(error);
                    });


                console.log(response.data);
                // location.reload()
            })
            .catch(error => {
                console.error(error);
            });



    }


    function deliveryCharges() {
        var span = document.querySelector('#totalAmount');
        // span.innerHTML = `₹ ${amount}`

        var span2 = document.querySelector('#deliveryCharges');
        if (amount < 2000) {
            deliveryCharge = 120;
            span2.innerHTML = `₹ ${deliveryCharge}`

            amount += deliveryCharge;
            span.innerHTML = `₹ ${amount}`

        }
        span2.innerHTML = `₹ ${deliveryCharge}`

        const couponBtn = document.getElementById("addCouponButton")
        couponBtn.style.pointerEvents = 'none'
        const divs = document.querySelectorAll('.btn-num-product-up');

        // Loop through all the divs and remove the click event listener
        divs.forEach(div => {
            div.style.pointerEvents = 'none';

        });

        // Get all the divs with class "btn-num-product-down"
        const divs2 = document.querySelectorAll('.btn-num-product-down');

        // Loop through all the divs and remove the click event listener
        divs2.forEach(div => {
            div.style.pointerEvents = 'none';

        });

        document.getElementById('paymentButton').disabled = false;


    }