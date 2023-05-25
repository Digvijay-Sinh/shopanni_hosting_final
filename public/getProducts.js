function logout() {
    axios.get('/logoutUser')
        .then(response => {
            location.href = "http://localhost:5000/loginUser"
                // handle successful logout
            console.log(response.data);
        })
        .catch(error => {
            // handle error
            console.log(error);
        });
}


// Assuming the categories are fetched from an Axios GET request and stored in an array called "categories"
axios.get(`http://localhost:5000/api/v1/categories`)
    .then(function(response) {
        var categories = response.data;

        // Get the div element with id "categoryContainer"
        var categoryContainer = document.getElementById('categoryContainer');
        categoryContainer.innerHTML = ""
            // Loop through the categories and generate the HTML code for each category dynamically
        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];
            var html = '<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">';
            html += '<div class="block1 wrap-pic-w">';
            // html += '<img src="' + category.image + '" alt="' + category.name + '" />';
            html += '<a href="' + category.url + '" class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">';
            html += '<div class="block1-txt-child1 flex-col-l">';
            html += '<span class="block1-name ltext-102 trans-04 p-b-8">' + category.name + '</span>';
            html += '<span class="block1-info stext-102 trans-04">' + category.description + '</span>';
            html += '</div>';
            html += '<div class="block1-txt-child2 p-b-4 trans-05">';
            html += '<div class="block1-link stext-101 cl0 trans-09">Shop Now</div>';
            html += '</div>';
            html += '</a>';
            html += '</div>';
            html += '</div>';

            // Add the HTML code for the category to the categoryContainer
            categoryContainer.innerHTML += html;

            setTimeout(() => {
                const productGrid = document.getElementById('categoryContainer');
                const productGridHeight = productGrid.scrollHeight;
                productGrid.style.height = productGridHeight + "px";
            }, 700);
        }
    })
    .catch(function(error) {
        console.error(error);
    });



// // // function setContainerHeight() {
// // //     var container = document.getElementById("productContainer");
// // //     container.style.height = "auto";
// // //     // container.style.height = container.scrollHeight + "px";
// // // }

// // window.addEventListener('load', function() {

// //     axios.get('http://localhost:5000/api/v1/products')
// //         .then(response => {
// //             const data = response.data;
// //             const productContainer = document.getElementById("productContainer");


// //             data.forEach(item => {
// //                 const newProductItem = document.
// //                 createElement("div");
// //                 newProductItem.className = 'col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women';

// //                 console.log(item);
// // axios.get(`http://localhost:5000/images/${item.product_id}`)
// //     .then(response => {
// //         const imageData = response.data;

// //         const imageName = imageData.image_url1; // store the name from the response data
// //                         console.log(imageData);
// //                         newProductItem.innerHTML = `
// // 					<!-- Block2 -->
// // 					<div class="block2">
// // 						<div class="block2-pic hov-img0">
// // 							<img src="images/${imageName}" alt="IMG-PRODUCT">

// // 							<a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
// // 								Quick View
// // 							</a>
// // 						</div>

// // 						<div class="block2-txt flex-w flex-t p-t-14">
// // 							<div class="block2-txt-child1 flex-col-l ">
// // 								<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
// // 									${item.name}
// // 								</a>

// // 								<span class="stext-105 cl3">
// // 									${item.price}
// // 								</span>
// // 							</div>

// // 							<div class="block2-txt-child2 flex-r p-t-3">
// // 								<a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
// // 									<img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
// // 									<img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
// // 								</a>
// // 							</div>
// // 						</div>
// // 					</div>
// // 				`
// //                         console.log("product adding reached");
// //                         productContainer.appendChild(newProductItem);
// //                         // setContainerHeight();
// //                     })
// //                     .catch(error => console.log(error));

// //             });
// //             var link = document.createElement("link");
// //             link.rel = "stylesheet";
// //             link.type = "text/css";
// //             link.href = "vendor/bootstrap/css/bootstrap.min.css";
// //             document.getElementsByTagName("head")[0].appendChild(link);

// // })
// // .catch(error => console.log(error));
// // });

// // // window.addEventListener("resize", setContainerHeight);



axios.get('http://localhost:5000/api/v1/products')
    .then(async response => {

            // Make an Axios GET request to fetch the updated cart total
            axios.get(`/cart/total`)
                .then(response => {
                    const cartTotal = response.data.cartTotal.toFixed(2);

                    // Update the HTML content of the cart total element with the new amount
                    const cartTotalAmountEl = document.getElementById('cart-total-amount');
                    cartTotalAmountEl.textContent = `₹ ${cartTotal}`;

                    console.log(`Updated cart total for user to $${cartTotal}`);
                })
                .catch(error => {
                    console.log(error);
                });
            const data = response.data;
            // Get the input elements
            const responseWishlist = await axios.get('/wishlist');
            const wishlistItems = responseWishlist.data;

            data.forEach(item => {
                        const productGrid = document.getElementById('productContainer');

                        const productInWishlist = wishlistItems.some(product => product.product_id == item.product_id);

                        console.log("default sorting");
                        const newProductItem = document.createElement('div');
                        newProductItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'p-b-35', 'isotope-item', 'women');

                        axios.get(`http://localhost:5000/images/${item.product_id}`)
                            .then(response => {
                                    const imageData = response.data;

                                    const imageName = imageData.image_url1;
                                    console.log(imageName);

                                    newProductItem.innerHTML = `
                        <div class="block2">
                            <div class="block2-pic hov-img0">
                                <img height="334.34px" src="images/${imageName}" alt="IMG-PRODUCT">
    
                                <a href="http://localhost:5000/productView/${item.product_id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
                                    Quick View
                                </a>
                            </div>
    
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l ">
                                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                        ${item.name}
                                    </a>
    
                                    <span class="stext-105 cl3">
                                       ₹${item.price}
                                    </span>
                                </div>
    
                                <div id="wishlist-${item.product_id}" onclick="wishlist(${item.product_id})" class="block2-txt-child2 flex-r p-t-3">
                                    <a  class="btn-addwish-b2 dis-block pos-relative ">
                                        ${productInWishlist? `
                                        <img id="prod-filled-${item.product_id}" src="images/icons/icon-heart-02.png" alt="ICON">

                                        ` :`
                                        <img id="prod-empty-${item.product_id}" src="images/icons/icon-heart-01.png" alt="ICON">

                                        `}
                                    </a>
                                </div>
                            </div>
                        </div>
                    `
                    console.log("product adding reached");
                    productGrid.appendChild(newProductItem);
                    setTimeout(() => {
                        const productGrid = document.getElementById('productContainer');
                        const productGridHeight = productGrid.scrollHeight;
                        productGrid.style.height = productGridHeight + "px";
                    }, 700);

                })
                .catch(error => console.log(error));

        });
    })
    .catch(error => console.log(error));


    // Make an Axios request to fetch the categories
axios.get(`http://localhost:5000/api/v1/categories`)
.then(function(response) {
    var categories = response.data;
    const categoriesFilter = document.getElementById("categoriesFilter");


    console.log("Fetched categories");
    // Create a button for each category
    categories.forEach(category => {
        const button = document.createElement("button");
        button.classList.add("stext-106", "cl6", "hov1", "bor3", "trans-04", "m-r-32", "m-tb-5");
        button.setAttribute("data-filter", "category.category_id");
        button.innerText = category.name;
        button.addEventListener("click",async () => {
            const responseWishlist = await axios.get('/wishlist');
            const wishlistItems = responseWishlist.data;
            console.log("Clicked with category name:" + category.name);
            axios.get('http://localhost:5000/api/v1/products')
    .then(async response => {

            // Make an Axios GET request to fetch the updated cart total
            axios.get(`/cart/total`)
                .then(response => {
                    const cartTotal = response.data.cartTotal.toFixed(2);

                    // Update the HTML content of the cart total element with the new amount
                    const cartTotalAmountEl = document.getElementById('cart-total-amount');
                    cartTotalAmountEl.textContent = `₹ ${cartTotal}`;

                    console.log(`Updated cart total for user to $${cartTotal}`);
                })
                .catch(error => {
                    console.log(error);
                });
            const data = response.data;
            // Get the input elements
            let filteredProducts = data.filter(product => product.category_id === category.category_id);
            const productGrid = document.getElementById('productContainer');
            productGrid.innerHTML = ""
            const responseWishlist = await axios.get('/wishlist');
            const wishlistItems = responseWishlist.data;

            filteredProducts.forEach(item => {
                        const productGrid = document.getElementById('productContainer');

                        const productInWishlist = wishlistItems.some(product => product.product_id == item.product_id);

                        console.log("default sorting");
                        const newProductItem = document.createElement('div');
                        newProductItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'p-b-35', 'isotope-item', 'women');

                        axios.get(`http://localhost:5000/images/${item.product_id}`)
                            .then(response => {
                                    const imageData = response.data;

                                    const imageName = imageData.image_url1;
                                    console.log(imageName);

                                    newProductItem.innerHTML = `
                        <div class="block2">
                            <div class="block2-pic hov-img0">
                                <img height="334.34px" src="images/${imageName}" alt="IMG-PRODUCT">
    
                                <a href="http://localhost:5000/productView/${item.product_id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
                                    Quick View
                                </a>
                            </div>
    
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l ">
                                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                        ${item.name}
                                    </a>
    
                                    <span class="stext-105 cl3">
                                       ₹${item.price}
                                    </span>
                                </div>
    
                                <div id="wishlist-${item.product_id}" onclick="wishlist(${item.product_id})" class="block2-txt-child2 flex-r p-t-3">
                                    <a  class="btn-addwish-b2 dis-block pos-relative ">
                                        ${productInWishlist? `
                                        <img id="prod-filled-${item.product_id}" src="images/icons/icon-heart-02.png" alt="ICON">

                                        ` :`
                                        <img id="prod-empty-${item.product_id}" src="images/icons/icon-heart-01.png" alt="ICON">

                                        `}
                                    </a>
                                </div>
                            </div>
                        </div>
                    `
                    console.log("product adding reached");
                    productGrid.appendChild(newProductItem);
                    setTimeout(() => {
                        const productGrid = document.getElementById('productContainer');
                        const productGridHeight = productGrid.scrollHeight;
                        productGrid.style.height = productGridHeight + "px";
                    }, 700);

                })
                .catch(error => console.log(error));

        });
    })
    .catch(error => console.log(error));
        });

        categoriesFilter.appendChild(button);
    });
})
.catch(error => {
    console.error("Error fetching categories:", error);
});



async function wishlist(productId) {
    const response = await axios.get('/wishlist');
    const wishlistItems = response.data;
    console.log(wishlistItems);
    const responseProduct = await axios.get(
        `http://localhost:5000/api/v1/products/${productId}`
    );
    const product = responseProduct.data[0];

    // check if product is in wishlist
    const productInWishlist = wishlistItems.some(item => item.product_id == productId);
    console.log(productInWishlist);
    if (productInWishlist) {
        axios.delete('/wishlist', {
            data: {
              product_id: productId
            }
          })
            .then(response => {
              console.log(response.data);
              swal(product.name, "is removed from wishlist !", "success").then(() => {
                document.getElementById(`wishlist-${productId}`).innerHTML=`
                <a  class="btn-addwish-b2 dis-block pos-relative ">
             
                <img id="prod-empty-${productId}" src="images/icons/icon-heart-01.png" alt="ICON">

                
            </a>
                `

                // Select the element with ID "wishListTotal"
const wishListTotalElement = document.querySelector("#wishListTotal");

// Get the current value of the "data-notify" attribute and convert it to a number
let currentNotifyValue = parseInt(wishListTotalElement.getAttribute("data-notify"));

// Increment the value by 1
currentNotifyValue -= 1;

// Set the new value of the "data-notify" attribute
wishListTotalElement.setAttribute("data-notify", currentNotifyValue);

                // location.replace(`http://localhost:5000/userHome`)
              });
            })
            .catch(error => {
              console.log(error);
            });

        
          
        

    } else {
        console.log("productid from wishlist" + productId);
        console.log("wishlist function reached");
        const responseProduct = await axios.get(
            `http://localhost:5000/api/v1/products/${productId}`
        );
        const product = responseProduct.data[0];



        axios
            .post("/wishlist", {
                product_id: productId,
            })
            .then(() => {
                swal(product.name, "is added to wishlist !", "success").then(() => {
                    document.getElementById(`wishlist-${productId}`).innerHTML=`
                    <a  class="btn-addwish-b2 dis-block pos-relative ">
                 
                    <img id="prod-filled-${productId}" src="images/icons/icon-heart-02.png" alt="ICON">
    
                    
                </a>
                    `

// Select the element with ID "wishListTotal"
// Select the element with ID "wishListTotal"
const wishListTotalElement = document.querySelector("#wishListTotal");

// Get the current value of the "data-notify" attribute and convert it to a number
let currentNotifyValue = parseInt(wishListTotalElement.getAttribute("data-notify"));

// Increment the value by 1
currentNotifyValue += 1;

// Set the new value of the "data-notify" attribute
wishListTotalElement.setAttribute("data-notify", currentNotifyValue);

                    // location.replace(`http://localhost:5000/userHome`)

                  });

            })
            .catch((err) => {
                console.log(err);
                swal("Error", "Could not add item to wishist", "error");
            });

    }





}

function applyFilter() {
    console.log("Filtering");

    axios.get('http://localhost:5000/api/v1/products')
    .then(async response => {

            // Make an Axios GET request to fetch the updated cart total
            axios.get(`/cart/total`)
                .then(response => {
                    const cartTotal = response.data.cartTotal.toFixed(2);

                    // Update the HTML content of the cart total element with the new amount
                    const cartTotalAmountEl = document.getElementById('cart-total-amount');
                    cartTotalAmountEl.textContent = `₹ ${cartTotal}`;

                    console.log(`Updated cart total for user to $${cartTotal}`);
                })
                .catch(error => {
                    console.log(error);
                });
            const data = response.data;

            const minPrice = document.getElementById('minPrice').value || 0;
            const maxPrice = document.getElementById('maxPrice').value || 100000;
            const sortOption = document.querySelector('input[name="sortby"]:checked').value;
            
            // const sortOption = document.querySelector('.filter-col1 .filter-link-active').textContent;

            // Filter the products
            let filteredProducts = data.filter(product => product.price >= minPrice && product.price <= maxPrice);

            // Sort the products
            if (sortOption === 'newness') {
                filteredProducts = filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            } else if (sortOption === 'pricelowtohigh') {
                filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortOption === 'pricehightolow') {
                filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
            }
            // Get the input elements
            const responseWishlist = await axios.get('/wishlist');
            const wishlistItems = responseWishlist.data;
            const productGrid = document.getElementById('productContainer');
            productGrid.innerHTML=""
            filteredProducts.forEach(item => {
                        const productGrid = document.getElementById('productContainer');

                        const productInWishlist = wishlistItems.some(product => product.product_id == item.product_id);

                        console.log("default sorting");
                        const newProductItem = document.createElement('div');
                        newProductItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'p-b-35', 'isotope-item', 'women');

                        axios.get(`http://localhost:5000/images/${item.product_id}`)
                            .then(response => {
                                    const imageData = response.data;

                                    const imageName = imageData.image_url1;
                                    console.log(imageName);

                                    newProductItem.innerHTML = `
                        <div class="block2">
                            <div class="block2-pic hov-img0">
                                <img height="334.34px" src="images/${imageName}" alt="IMG-PRODUCT">
    
                                <a href="http://localhost:5000/productView/${item.product_id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
                                    Quick View
                                </a>
                            </div>
    
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l ">
                                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                        ${item.name}
                                    </a>
    
                                    <span class="stext-105 cl3">
                                       ₹${item.price}
                                    </span>
                                </div>
    
                                <div id="wishlist-${item.product_id}" onclick="wishlist(${item.product_id})" class="block2-txt-child2 flex-r p-t-3">
                                    <a  class="btn-addwish-b2 dis-block pos-relative ">
                                        ${productInWishlist? `
                                        <img id="prod-filled-${item.product_id}" src="images/icons/icon-heart-02.png" alt="ICON">

                                        ` :`
                                        <img id="prod-empty-${item.product_id}" src="images/icons/icon-heart-01.png" alt="ICON">

                                        `}
                                    </a>
                                </div>
                            </div>
                        </div>
                    `
                    console.log("product adding reached");
                    productGrid.appendChild(newProductItem);
                    setTimeout(() => {
                        const productGrid = document.getElementById('productContainer');
                        const productGridHeight = productGrid.scrollHeight;
                        productGrid.style.height = productGridHeight + "px";
                    }, 700);

                })
                .catch(error => console.log(error));

        });
    })
    .catch(error => console.log(error));

    // axios.get('http://localhost:5000/api/v1/products')
    //     .then(response => {
    //         const data = response.data;


    //         const minPrice = document.getElementById('minPrice').value || 0;
    //         const maxPrice = document.getElementById('maxPrice').value || 100000;
    //         const sortOption = document.querySelector('.filter-col1 .filter-link-active').textContent;

    //         // Filter the products
    //         let filteredProducts = data.filter(product => product.price >= minPrice && product.price <= maxPrice);

    //         // Sort the products
    //         if (sortOption === 'Newness') {
    //             filteredProducts = filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    //         } else if (sortOption === 'Price: Low to High') {
    //             filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    //         } else if (sortOption === 'Price: High to Low') {
    //             filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    //         }








    //         // data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // sort by created_at datetime in descending order
    //         // const minPriceInput = document.getElementById("minPrice");
    //         // const maxPriceInput = document.getElementById("maxPrice");

    //         // Get the values or set defaults
    //         // const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : 0;
    //         // const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : 100000;
    //         // for (let i = 0; i < data.length; i++) {
    //         //     if (data[i].price < minPrice || data[i].price > maxPrice) {
    //         //         data.splice(i, 1);
    //         //         i--; // adjust index to account for removed element
    //         //     }
    //         // }
    //         const productGrid = document.getElementById('productContainer');
    //         productGrid.innerHTML = ""
    //         filteredProducts.forEach(item => {
    //             const productGrid = document.getElementById('productContainer');



    //             const newProductItem = document.createElement('div');
    //             newProductItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'p-b-35', 'isotope-item', 'women');

    //             axios.get(`http://localhost:5000/images/${item.product_id}`)
    //                 .then(response => {
    //                     const imageData = response.data;

    //                     const imageName = imageData.image_url1;
    //                     console.log(imageName);

    //                     newProductItem.innerHTML = `
	// 			<div class="block2">
	// 				<div class="block2-pic hov-img0">
	// 					<img src="images/${imageName}" alt="IMG-PRODUCT">

	// 					<a href="http://localhost:5000/productView/${item.product_id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
	// 						Quick View
	// 					</a>
	// 				</div>

	// 				<div class="block2-txt flex-w flex-t p-t-14">
	// 					<div class="block2-txt-child1 flex-col-l ">
	// 						<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
	// 							${item.name}
	// 						</a>

	// 						<span class="stext-105 cl3">
	// 						   ₹${item.price}
	// 						</span>
	// 					</div>

	// 					<div class="block2-txt-child2 flex-r p-t-3">
	// 						<a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
	// 							<img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
	// 							<img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
	// 						</a>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		`
    //                     console.log("product adding reached");
    //                     productGrid.appendChild(newProductItem);
    //                     setTimeout(() => {
    //                         const productGrid = document.getElementById('productContainer');
    //                         const productGridHeight = productGrid.scrollHeight;
    //                         productGrid.style.height = productGridHeight + "px";
    //                     }, 700);

    //                 })
    //                 .catch(error => console.log(error));

    //         });
    //     })
    //     .catch(error => console.log(error));
}

// function priceLowToHigh() {
//     console.log("high to low sorting");

//     axios.get('http://localhost:5000/api/v1/products')
//         .then(response => {
//             const data = response.data;
//             data.sort((a, b) => a.price - b.price); // sort by created_at datetime in descending order
//             const productGrid = document.getElementById('productContainer');
//             productGrid.innerHTML = ""
//             data.forEach(item => {
//                 const productGrid = document.getElementById('productContainer');



//                 const newProductItem = document.createElement('div');
//                 newProductItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'p-b-35', 'isotope-item', 'women');

//                 axios.get(`http://localhost:5000/images/${item.product_id}`)
//                     .then(response => {
//                         const imageData = response.data;

//                         const imageName = imageData.image_url1;
//                         console.log(imageName);

//                         newProductItem.innerHTML = `
// 				<div class="block2">
// 					<div class="block2-pic hov-img0">
// 						<img src="images/${imageName}" alt="IMG-PRODUCT">

// 						<a href="http://localhost:5000/productView/${item.product_id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
// 							Quick View
// 						</a>
// 					</div>

// 					<div class="block2-txt flex-w flex-t p-t-14">
// 						<div class="block2-txt-child1 flex-col-l ">
// 							<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
// 								${item.name}
// 							</a>

// 							<span class="stext-105 cl3">
// 							   ₹${item.price}
// 							</span>
// 						</div>

// 						<div class="block2-txt-child2 flex-r p-t-3">
// 							<a class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
// 								<img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
// 								<img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
// 							</a>
// 						</div>
// 					</div>
// 				</div>
// 			`
//                         console.log("product adding reached");
//                         productGrid.appendChild(newProductItem);
//                         setTimeout(() => {
//                             const productGrid = document.getElementById('productContainer');
//                             const productGridHeight = productGrid.scrollHeight;
//                             productGrid.style.height = productGridHeight + "px";
//                         }, 700);

//                     })
//                     .catch(error => console.log(error));

//             });
//         })
//         .catch(error => console.log(error));
// }

// function priceHighToLow() {
//     console.log("low to high sorting");

//     axios.get('http://localhost:5000/api/v1/products')
//         .then(response => {
//             const data = response.data;
//             data.sort((a, b) => b.price - a.price); // sort by created_at datetime in descending order

//             const productGrid = document.getElementById('productContainer');
//             productGrid.innerHTML = ""
//             data.forEach(item => {
//                 const productGrid = document.getElementById('productContainer');



//                 const newProductItem = document.createElement('div');
//                 newProductItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'p-b-35', 'isotope-item', 'women');

//                 axios.get(`http://localhost:5000/images/${item.product_id}`)
//                     .then(response => {
//                         const imageData = response.data;

//                         const imageName = imageData.image_url1;
//                         console.log(imageName);

//                         newProductItem.innerHTML = `
// 				<div class="block2">
// 					<div class="block2-pic hov-img0">
// 						<img src="images/${imageName}" alt="IMG-PRODUCT">

// 						<a href="http://localhost:5000/productView/${item.product_id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
// 							Quick View
// 						</a>
// 					</div>

// 					<div class="block2-txt flex-w flex-t p-t-14">
// 						<div class="block2-txt-child1 flex-col-l ">
// 							<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
// 								${item.name}
// 							</a>

// 							<span class="stext-105 cl3">
// 							   ₹${item.price}
// 							</span>
// 						</div>

// 						<div class="block2-txt-child2 flex-r p-t-3">
// 							<a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
// 								<img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
// 								<img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
// 							</a>
// 						</div>
// 					</div>
// 				</div>
// 			`
//                         console.log("product adding reached");
//                         productGrid.appendChild(newProductItem);
//                         setTimeout(() => {
//                             const productGrid = document.getElementById('productContainer');
//                             const productGridHeight = productGrid.scrollHeight;
//                             productGrid.style.height = productGridHeight + "px";
//                         }, 700);

//                     })
//                     .catch(error => console.log(error));

//             });
//         })
//         .catch(error => console.log(error));
// }

// function newness() {
//     console.log("newness sorting");

//     axios.get('http://localhost:5000/api/v1/products')
//         .then(response => {
//             const data = response.data;
//             data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // sort by created_at datetime in descending order

//             const productGrid = document.getElementById('productContainer');
//             productGrid.innerHTML = ""
//             data.forEach(item => {
//                 const productGrid = document.getElementById('productContainer');



//                 const newProductItem = document.createElement('div');
//                 newProductItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'p-b-35', 'isotope-item', 'women');

//                 axios.get(`http://localhost:5000/images/${item.product_id}`)
//                     .then(response => {
//                         const imageData = response.data;

//                         const imageName = imageData.image_url1;
//                         console.log(imageName);

//                         newProductItem.innerHTML = `
// 				<div class="block2">
// 					<div class="block2-pic hov-img0">
// 						<img src="images/${imageName}" alt="IMG-PRODUCT">

// 						<a href="http://localhost:5000/productView/${item.product_id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
// 							Quick View
// 						</a>
// 					</div>

// 					<div class="block2-txt flex-w flex-t p-t-14">
// 						<div class="block2-txt-child1 flex-col-l ">
// 							<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
// 								${item.name}
// 							</a>

// 							<span class="stext-105 cl3">
// 							   ₹${item.price}
// 							</span>
// 						</div>

// 						<div class="block2-txt-child2 flex-r p-t-3">
// 							<a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
// 								<img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
// 								<img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
// 							</a>
// 						</div>
// 					</div>
// 				</div>
// 			`
//                         console.log("product adding reached");
//                         productGrid.appendChild(newProductItem);
//                         setTimeout(() => {
//                             const productGrid = document.getElementById('productContainer');
//                             const productGridHeight = productGrid.scrollHeight;
//                             productGrid.style.height = productGridHeight + "px";
//                         }, 700);

//                     })
//                     .catch(error => console.log(error));

//             });
//         })
//         .catch(error => console.log(error));
// }


function searchProducts() {
    console.log("search reached");
    const searchInput = document.getElementById("searchInput").value.toLowerCase();





    axios.get('http://localhost:5000/api/v1/products')
        .then(response => {
            const data = response.data;
            // Get the input elements
            const filteredData = [];
            for (let i = 0; i < data.length; i++) {
                const itemName = data[i].name.toLowerCase();
                if (itemName.includes(searchInput)) {
                    filteredData.push(data[i]);
                }
            }
            const productGrid = document.getElementById('productContainer');
            productGrid.innerHTML = ""
            filteredData.forEach(item => {
                const productGrid = document.getElementById('productContainer');


                console.log("default sorting");
                const newProductItem = document.createElement('div');
                newProductItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'p-b-35', 'isotope-item', 'women');

                axios.get(`http://localhost:5000/images/${item.product_id}`)
                    .then(response => {
                        const imageData = response.data;

                        const imageName = imageData.image_url1;
                        console.log(imageName);

                        newProductItem.innerHTML = `
                    <div class="block2">
                        <div class="block2-pic hov-img0">
                            <img src="images/${imageName}" alt="IMG-PRODUCT">

                            <a href="http://localhost:5000/productView/${item.product_id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
                                Quick View
                            </a>
                        </div>

                        <div class="block2-txt flex-w flex-t p-t-14">
                            <div class="block2-txt-child1 flex-col-l ">
                                <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                    ${item.name}
                                </a>

                                <span class="stext-105 cl3">
                                   ₹${item.price}
                                </span>
                            </div>

                            <div onclick="wishlist(${item.product_id})" class="block2-txt-child2 flex-r p-t-3">
                                <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                    <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                                    <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                                </a>
                            </div>
                        </div>
                    </div>
                `
                        console.log("product adding reached");
                        productGrid.appendChild(newProductItem);
                        setTimeout(() => {
                            const productGrid = document.getElementById('productContainer');
                            const productGridHeight = productGrid.scrollHeight;
                            productGrid.style.height = productGridHeight + "px";
                        }, 700);

                    })
                    .catch(error => console.log(error));

            });
        })
        .catch(error => console.log(error));

}


function handleKeyPress(event) {
    if (event.keyCode === 13) {
        searchProducts();
    }
}