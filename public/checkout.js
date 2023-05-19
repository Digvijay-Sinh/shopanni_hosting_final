// function checkoutOnline() {

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
//     // const total = parseInt(document.getElementById('totalAmount').innerHTML)
//     var totalAmountStr = document.getElementById("totalAmount").innerHTML;

//     // Convert the string to an integer
//     var total = 1280;

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
//         total

//         // ,
//         // price,
//         // category_id,
//         // image_url
//     };
//     console.log(data);
//     // const button = document.getElementById('my-button');
//     // button.addEventListener('click', () => {
//     // const phone = '916353166673';
//     // const imageName = 'images_Screenshot_20230207_025440.png';

//     // const message = `*${imageDescription}*\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email}\nLandmark: ${landmark}\nState: ${state}\nDistrict: ${district}\nTotal: ${total}\n`;
//     // const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
//     // window.open(url, '_blank');
//     // });
//     axios.post('http://localhost:5000/checkout', data)
//         .then(response => {
//             console.log("Response with orderId");
//             console.log(response);
//             const orderIdFromCheckoutRoutes = response.data

//             // const orderItems = response.data;
//             console.log("Order items got");
//             var settings = {
//                 "url": "/create/orderId",
//                 "method": "POST",
//                 "timeout": 0,
//                 "headers": {
//                     "Content-Type": "application/json"
//                 },
//                 "data": JSON.stringify({
//                     "amount": total * 100
//                 }),
//             };

//             //creates new orderId everytime
//             $.ajax(settings).done(function(response) {

//                 orderId = response.orderId;
//                 console.log(orderId);
//                 $("button").show();

//                 var options = {
//                     key: "rzp_test_7engLIZnkLSmS3", // Enter the Key ID generated from the Dashboard
//                     amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//                     currency: "INR",
//                     name: "Acme Corp",
//                     description: "Test Transaction",
//                     image: "https://example.com/your_logo",
//                     order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//                     handler: function(response) {
//                         // alert(response.razorpay_payment_id);
//                         // alert(response.razorpay_order_id);
//                         // alert(response.razorpay_signature);
//                         const razorpay_payment_id = response.razorpay_payment_id;
//                         const razorpay_order_id = response.razorpay_order_id;
//                         const razorpay_signature = response.razorpay_signature;
//                         const verifySettings = {
//                             url: "/api/payment/verify",
//                             method: "POST",
//                             headers: {
//                                 "Content-Type": "application/json",
//                             },
//                             data: {
//                                 response,
//                             },
//                         };

//                         axios(verifySettings)
//                             .then((response) => {
//                                 console.log(response.data);

//                                 // You can perform further actions based on the response from the server
//                                 if (response.data.signatureIsValid === "true") {
//                                     console.log("Payment verification successful");
//                                     console.log(razorpay_order_id);
//                                     console.log(razorpay_payment_id);
//                                     console.log(razorpay_signature);
//                                     axios.post('/update/order', {
//                                             orderId: orderIdFromCheckoutRoutes,
//                                             razorpay_order_id: razorpay_order_id,

//                                             razorpay_payment_id: razorpay_payment_id,
//                                             razorpay_signature: razorpay_signature // or 'false' depending on your case
//                                         })
//                                         .then((response) => {
//                                             console.log(response);

//                                             axios.delete('/userCart')
//                                                 .then((response) => {
//                                                     console.log(response);
//                                                     swal("Order", "is placed successfully !", "success").then(() => {
//                                                         location.reload()
//                                                     });
//                                                     // Reload the page or perform other actions as needed
//                                                 })
//                                                 .catch((error) => {
//                                                     console.error(error);
//                                                 });

//                                         })
//                                         .catch((error) => {
//                                             console.log(error);
//                                         });

//                                 } else {
//                                     console.log("Payment verification failed");
//                                     swal("Payment", "is not completed successfully !", "error").then(() => {
//                                         location.reload()
//                                     });
//                                 }
//                             })
//                             .catch((error) => {
//                                 console.error(error);
//                             });
//                     },
//                     prefill: {
//                         name: "Gaurav Kumar",
//                         email: "gaurav.kumar@example.com",
//                         contact: "9000090000",
//                     },
//                     notes: {
//                         address: "Razorpay Corporate Office",

//                     },
//                     theme: {
//                         color: "#E32321",
//                     },
//                 };
//                 var rzp1 = new Razorpay(options);
//                 rzp1.on("payment.failed", function(response) {
//                     swal("Payment", "is not completed successfully !", "error").then(() => {
//                         location.href = "http://localhost:5000/userHome";
//                     });
//                     // alert(response.error.code);
//                     // alert(response.error.description);
//                     // alert(response.error.source);
//                     // alert(response.error.step);
//                     // alert(response.error.reason);
//                     // alert(response.error.metadata.order_id);
//                     // alert(response.error.metadata.payment_id);
//                 });
//                 // document.getElementById("rzp-button1").onclick = function(e) {
//                 rzp1.open();
//                 // e.preventDefault();
//                 // };
//             });




//             console.log(response.data);
//             // location.reload()
//         })
//         .catch(error => {
//             console.error(error);
//         });



// }


// function checkoutWhatsapp() {

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
//     const total = 234

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
//         total

//         // ,
//         // price,
//         // category_id,
//         // image_url
//     };
//     console.log(data);
//     // const button = document.getElementById('my-button');
//     // button.addEventListener('click', () => {
//     // const phone = '916353166673';
//     // const imageName = 'images_Screenshot_20230207_025440.png';

//     // const message = `*${imageDescription}*\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email}\nLandmark: ${landmark}\nState: ${state}\nDistrict: ${district}\nTotal: ${total}\n`;
//     // const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
//     // window.open(url, '_blank');
//     // });
//     axios.post('http://localhost:5000/checkout', data)
//         .then(response => {
//             console.log("Response with orderId");
//             console.log(response);
//             const orderId = response.data
//             axios.get(`http://localhost:5000/order-items/${orderId}`)
//                 .then(async response => {
//                     const orderItems = response.data;
//                     var full_message = ``;
//                     // Loop through each item and create a message for each one
//                     for (let i = 0; i < orderItems.length; i++) {

//                         const item = orderItems[i];
//                         const responseProduct = await axios.get(`http://localhost:5000/api/v1/products/${item.product_id}`);
//                         const product = responseProduct.data[0];
//                         console.log("Product fromm cart");
//                         console.log(product);
//                         const message = `Order Item ${product.name}:\nProduct ID: ${item.product_id}\nQuantity: ${item.quantity}\nProduct Size ID: ${item.product_size_id}\nColour: ${item.colour}`;
//                         full_message += `${message}\n`
//                             // Use the message to send a WhatsApp message

//                     }
//                     const phone = '916353166673';

//                     const url = `https://web.whatsapp.com/send?phone=${phone}&text=${full_message}`;
//                     window.open(url, '_blank');
//                 })
//                 .catch(error => {
//                     console.error(error);
//                 });


//             console.log(response.data);
//             // location.reload()
//         })
//         .catch(error => {
//             console.error(error);
//         });



// }


// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('checkoutForm');
//     const button = document.getElementById('checkoutButton');

//     button.addEventListener('click', function(event) {
//         event.preventDefault(); // Prevents the default form submission behavior
//         console.log("checkout function reached");

//         const formData = new FormData();

//         formData.append('name', form.querySelector('input[name="name"]').value);
//         formData.append('address', form.querySelector('input[name="address"]').value);
//         formData.append('phone', form.querySelector('input[name="phone"]').value);
//         formData.append('email', form.querySelector('input[name="email"]').value);
//         formData.append('landmark', form.querySelector('input[name="landmark"]').value);
//         formData.append('state', form.querySelector('input[name="state"]').value);
//         formData.append('district', form.querySelector('input[name="district"]').value);



//         axios.post('http://localhost:5000/checkout', formData)
//             .then(response => {
//                 console.log(response.data);
//                 // location.reload()
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     });
// });