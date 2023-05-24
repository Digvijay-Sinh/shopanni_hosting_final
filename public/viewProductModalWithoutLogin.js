const singleProduct = document.getElementById("singleProduct");

function viewProduct(product_id) {
    axios.get(`http://localhost:5000/api/v1/products/${product_id}`)
        .then(response => {
            const product = response.data[0];
            console.log(product.product_id);
            axios.get(`http://localhost:5000/images/${product_id}`)
                .then(response => {
                    const imageData = response.data;

                    const imageName = imageData.image_url1;
                    console.log(imageName);

                    const div = document.createElement('div');

                    div.innerHTML = `
                    <div class="row">
            <div class="col-md-6 col-lg-7 p-b-30">
              <div class="p-l-25 p-r-30 p-lr-0-lg">
                <div class="wrap-slick3 flex-sb flex-w">
                  <div class="wrap-slick3-dots"></div>
                  <div class="wrap-slick3-arrows flex-sb-m flex-w"></div>

                  <div class="slick3 gallery-lb">
                    <div
                      class="item-slick3"
                      data-thumb="images/product-detail-01.jpg"
                    >
                      <div class="wrap-pic-w pos-relative">
                        <img
                          src="images/product-detail-01.jpg"
                          alt="IMG-PRODUCT"
                        />

                        <a
                          class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                          href="images/product-detail-01.jpg"
                        >
                          <i class="fa fa-expand"></i>
                        </a>
                      </div>
                    </div>

                    <div
                      class="item-slick3"
                      data-thumb="images/product-detail-02.jpg"
                    >
                      <div class="wrap-pic-w pos-relative">
                        <img
                          src="images/product-detail-02.jpg"
                          alt="IMG-PRODUCT"
                        />

                        <a
                          class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                          href="images/product-detail-02.jpg"
                        >
                          <i class="fa fa-expand"></i>
                        </a>
                      </div>
                    </div>

                    <div
                      class="item-slick3"
                      data-thumb="images/product-detail-03.jpg"
                    >
                      <div class="wrap-pic-w pos-relative">
                        <img
                          src="images/product-detail-03.jpg"
                          alt="IMG-PRODUCT"
                        />

                        <a
                          class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                          href="images/product-detail-03.jpg"
                        >
                          <i class="fa fa-expand"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-5 p-b-30">
              <div class="p-r-50 p-t-5 p-lr-0-lg">
                <h4 class="mtext-105 cl2 js-name-detail p-b-14">
                  Lightweight Jacket
                </h4>

                <span class="mtext-106 cl2"> $58.79 </span>

                <p class="stext-102 cl3 p-t-23">
                  Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus
                  ligula. Mauris consequat ornare feugiat.
                </p>

                <!--  -->
                <div class="p-t-33">
                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-203 flex-c-m respon6">Size</div>

                    <div class="size-204 respon6-next">
                      <div class="rs1-select2 bor8 bg0">
                        <select class="js-select2" name="time">
                          <option>Choose an option</option>
                          <option>Size S</option>
                          <option>Size M</option>
                          <option>Size L</option>
                          <option>Size XL</option>
                        </select>
                        <div class="dropDownSelect2"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-203 flex-c-m respon6">Color</div>

                    <div class="size-204 respon6-next">
                      <div class="rs1-select2 bor8 bg0">
                        <select class="js-select2" name="time">
                       
                          <option>Choose an option</option>
                          <option>Red</option>
                          <option>Blue</option>
                          <option>White</option>
                          <option>Grey</option>
                        </select>
                        <div class="dropDownSelect2"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-204 flex-w flex-m respon6-next">
                      <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                        <div
                          class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                        >
                          <i class="fs-16 zmdi zmdi-minus"></i>
                        </div>

                        <input
                          class="mtext-104 cl3 txt-center num-product"
                          type="number"
                          name="num-product"
                          value="1"
                        />

                        <div
                          class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                        >
                          <i class="fs-16 zmdi zmdi-plus"></i>
                        </div>
                      </div>

                      <button
                        onclick="loginPage()"
                        class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                      >
                        <a href="http://localhost:5000/loginUser">Add to cart</a>
                      </button>
                    </div>
                  </div>
                </div>

                <!--  -->
                <div class="flex-w flex-m p-l-100 p-t-40 respon7">
                  <div class="flex-m bor9 p-r-10 m-r-11">
                    <a
                      href="#"
                      class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                      data-tooltip="Add to Wishlist"
                    >
                      <i class="zmdi zmdi-favorite"></i>
                    </a>
                  </div>

                  <a
                    href="#"
                    class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Facebook"
                  >
                    <i class="fa fa-facebook"></i>
                  </a>

                  <a
                    href="#"
                    class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Twitter"
                  >
                    <i class="fa fa-twitter"></i>
                  </a>

                  <a
                    href="#"
                    class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Google Plus"
                  >
                    <i class="fa fa-google-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

                    `
                    singleProduct.appendChild(div);


                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

function loginPage() {
    window.location.href = "http://localhost:5000/loginUser"
}

// Assuming the options are fetched from an Axios GET request and stored in an array called "options"
axios.get(`http://localhost:5000/size`)
    .then(function(response) {
        var options = response.data;

        // Get the select element
        var selectElement = document.querySelector('#size-dropdown');

        // Loop through the options and generate the HTML code for each option dynamically
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var optionElement = document.createElement('option');
            console.log(option.name);
            optionElement.value = option.name;
            optionElement.text = option.name;
            console.log(optionElement.value)
            optionElement.style.padding = '5px 0';
            optionElement.style.borderBottom = '1px solid #ccc';
            optionElement.style.background = '#f5f5f5';

            // Add the option to the select element
            selectElement.appendChild(optionElement);
        }


    })
    .catch(function(error) {
        console.error(error);
    });
axios.get(`http://localhost:5000/colors`)
    .then(function(response) {
        var options = response.data;

        // Get the select element
        var selectElement = document.querySelector('#colour-dropdown');

        // Loop through the options and generate the HTML code for each option dynamically
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var optionElement = document.createElement('option');
            console.log(option.name);

            optionElement.value = option.name;
            console.log(optionElement.value)
            optionElement.text = option.name;
            optionElement.style.padding = '5px 0';
            optionElement.style.borderBottom = '1px solid #ccc';
            optionElement.style.background = '#f5f5f5';


            // Add the option to the select element
            selectElement.appendChild(optionElement);



        }
    })
    .catch(function(error) {
        console.error(error);
    });

document.addEventListener('DOMContentLoaded', () => {
    console.log("Dom content loaded");

    const sizeDropdown = document.getElementById('size-dropdown');
    const colorDropdown = document.getElementById('colour-dropdown');

    var styleElement = document.createElement('style');
    styleElement.innerHTML = '#colour-dropdown option::selection { background-color: #f5f5f5; color: inherit; }';
    document.head.appendChild(styleElement);

    sizeDropdown.addEventListener('change', async() => {
        const size = sizeDropdown.value;
        const color = colorDropdown.value;
        console.log("size changed");
        if (size && color) {
            try {
                const response = await axios.get('/get-variant-quantity', { params: { size, color, productId } });
                const variantQuantity = parseInt(response.data);
                document.getElementById("quantity").innerHTML = "Quantity:" + variantQuantity;
                console.log(variantQuantity);
            } catch (err) {
                console.error(err);
                // Handle error
            }
        }
    });
    colorDropdown.addEventListener('change', async() => {
        const size = sizeDropdown.value;
        const color = colorDropdown.value;
        console.log("colour changed");

        if (size && color) {
            try {
                const response = await axios.get('/get-variant-quantity', { params: { size, color, productId } });
                const variantQuantity = parseInt(response.data);
                console.log(variantQuantity);
                document.getElementById("quantity").innerHTML = "Quantity:" + variantQuantity;

                // Do something with the variantQuantity, e.g. update the UI
            } catch (err) {
                console.error(err);
                // Handle error
            }
        }
    });

    // Assuming the options are fetched from an Axios GET request and stored in an array called "options"
})