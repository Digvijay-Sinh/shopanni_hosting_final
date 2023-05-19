// const urlParams = new URLSearchParams(window.location.search);
// console.log(window.location.search);
// const productId = urlParams.get('id');
console.log('Product ID:', productId);

// Get the product data from the server using Axios
axios.get(`http://localhost:5000/api/v1/products/${productId}`)
    .then(async response => {
        // Pre-fill the input fields with the product data
        const product = response.data[0];
        console.log(product);
        document.getElementById('productNameForm').value = product.name;
        document.getElementById('productDescriptionForm').value = product.description;

        document.getElementById('productPriceForm').value = product.price;
        axios.get('http://localhost:5000/api/v1/categories')
            .then(response => {
                const data = response.data;


                // Get the select element
                var categoryDropdown = document.getElementById('dropdownCategory');

                // Create an array of options to add

                // Loop through the categories array and add options to the select element
                data.forEach(function(category) {

                    var option = document.createElement('option');
                    option.value = category.category_id;
                    option.text = category.name;
                    categoryDropdown.add(option);
                });
                document.getElementById('dropdownCategory').value = product.category_id;

            })
            .catch(error => console.log(error));
        axios.get(`http://localhost:5000/product_details/${product.product_id}`)
            .then(response => {
                const data = response.data;



                data.forEach(async function(productDetailItem) {

                    var container = document.getElementById("addVariantContainer");
                    const response = await axios.get('http://localhost:5000/colors');
                    const colors = response.data; // Create the form element
                    const responseSize = await axios.get('http://localhost:5000/size');
                    const sizes = responseSize.data; // Create the form element
                    var form = document.createElement("form");
                    form.style.border = "1px solid grey";
                    form.style.padding = "20px";

                    // Create the first dropdown for size
                    var sizeDropdown = document.createElement("select");
                    sizeDropdown.name = "size";
                    sizeDropdown.className = "form-select";
                    var sizeLabel = document.createElement("label");
                    sizeLabel.innerHTML = "Select Size ";
                    sizeLabel.className = "form-label";
                    form.appendChild(sizeLabel);

                    var sizeOption1 = document.createElement("option");
                    sizeOption1.value = productDetailItem.product_size;
                    sizeOption1.innerHTML = productDetailItem.product_size;
                    sizeDropdown.appendChild(sizeOption1);

                    for (let i = 0; i < sizes.length; i++) {
                        const size = sizes[i];
                        var sizeOption2 = document.createElement("option");
                        sizeOption2.value = size.name;
                        sizeOption2.innerHTML = size.name;
                        sizeDropdown.appendChild(sizeOption2);
                    }


                    form.appendChild(sizeDropdown);

                    // Create the second dropdown for color
                    var colorDropdown = document.createElement("select");
                    colorDropdown.name = "color";
                    colorDropdown.className = "form-select";
                    var colorLabel = document.createElement("label");
                    colorLabel.innerHTML = "Select Color ";
                    colorLabel.className = "form-label";
                    var colorOption1 = document.createElement("option");
                    colorOption1.value = productDetailItem.product_color;

                    colorOption1.innerHTML = productDetailItem.product_color;
                    colorDropdown.appendChild(colorOption1);

                    for (let i = 0; i < colors.length; i++) {
                        const color = colors[i];
                        var colorOption5 = document.createElement("option");
                        colorOption5.value = color.name;
                        colorOption5.innerHTML = color.name;
                        colorDropdown.appendChild(colorOption5);
                    }

                    form.appendChild(colorLabel);
                    form.appendChild(colorDropdown);

                    var label = document.createElement("label");

                    // Set the "for" attribute to associate the label with an input element
                    label.setAttribute("for", "quantity");

                    // Set the text content of the label
                    label.textContent = "Quantity:";

                    // Add the label to the document
                    form.appendChild(label);
                    // Create the input element for quantity
                    var quantityInput = document.createElement("input");
                    quantityInput.type = "number";
                    quantityInput.name = "quantity";
                    quantityInput.className = "form-control";
                    quantityInput.placeholder = "Quantity";
                    form.appendChild(quantityInput);
                    quantityInput.value = productDetailItem.variant_quantity

                    // Create the button to submit the form
                    // var addButton = document.createElement("button");
                    // addButton.type = "submit";
                    // addButton.innerHTML = "Add variant";
                    // addButton.className = "addVariantButton btn btn-outline-primary";
                    // addButton.onclick = function(event) {
                    //     event.preventDefault();

                    //     // Get the form data
                    //     var formData = {
                    //         product_id: productId,
                    //         size: sizeDropdown.value,
                    //         color: colorDropdown.value,
                    //         quantity: quantityInput.value
                    //     };

                    //     // Send the form data using Axios
                    //     axios.post('/add-variant', formData)
                    //         .then(function(response) {
                    //             console.log('Variant added successfully');
                    //             // Reload the page or update the UI to show the new variant
                    //         })
                    //         .catch(function(error) {
                    //             console.error('Error adding variant:', error);
                    //             // Show an error message to the user
                    //         });

                    // };
                    // form.appendChild(addButton);

                    container.appendChild(form);

                });
                document.getElementById('dropdownCategory').value = product.category_id;

            })
            .catch(error => console.log(error));



    })
    .catch(error => {
        console.error(error);
    });



const form = document.getElementById('updateProductForm');
const productNameForm = document.getElementById('productNameForm');
const productDescriptionForm = document.getElementById('productDescriptionForm');
const dropdownCategory = document.getElementById('dropdownCategory');
const productPriceForm = document.getElementById('productPriceForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("clicked");
    // Get the form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const description = formData.get('description');
    const category_id = formData.get('category_id');
    const price = formData.get('price');

    // Send the PUT request using Axios
    axios.put(`http://localhost:5000/api/v1/products/${productId}`, {
            name,
            description,
            category_id,
            price,
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

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


async function addVariant() {
    var container = document.getElementById("addVariantContainer");
    const response = await axios.get('http://localhost:5000/colors');
    const colors = response.data; // Create the form element
    const responseSize = await axios.get('http://localhost:5000/size');
    const sizes = responseSize.data; // Create the form element
    var form = document.createElement("form");
    form.style.border = "1px solid grey";
    form.style.padding = "20px";
    // Create the first dropdown for size
    var sizeDropdown = document.createElement("select");
    sizeDropdown.name = "size";
    sizeDropdown.className = "form-select";
    var sizeLabel = document.createElement("label");
    sizeLabel.innerHTML = "Select Size ";
    sizeLabel.className = "form-label";
    form.appendChild(sizeLabel);

    var sizeOption1 = document.createElement("option");
    sizeOption1.value = "";
    sizeOption1.innerHTML = "Select Size";
    sizeDropdown.appendChild(sizeOption1);

    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];
        var sizeOption2 = document.createElement("option");
        sizeOption2.value = size.name;
        sizeOption2.innerHTML = size.name;
        sizeDropdown.appendChild(sizeOption2);
    }

    form.appendChild(sizeDropdown);

    // Create the second dropdown for color
    var colorDropdown = document.createElement("select");
    colorDropdown.name = "color";
    colorDropdown.className = "form-select";
    var colorLabel = document.createElement("label");
    colorLabel.innerHTML = "Select Color ";
    colorLabel.className = "form-label";
    var colorOption1 = document.createElement("option");
    colorOption1.value = "";

    colorOption1.innerHTML = "Select Color";
    colorDropdown.appendChild(colorOption1);

    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        var colorOption5 = document.createElement("option");
        colorOption5.value = color.name;
        colorOption5.innerHTML = color.name;
        colorDropdown.appendChild(colorOption5);
    }

    form.appendChild(colorLabel);
    form.appendChild(colorDropdown);

    // Create the input element for quantity
    var quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.name = "quantity";
    quantityInput.className = "form-control";
    quantityInput.placeholder = "Quantity";
    form.appendChild(quantityInput);

    // Create the button to submit the form
    var addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.innerHTML = "Add variant";
    addButton.className = "addVariantButton btn btn-outline-primary";
    addButton.onclick = function(event) {
        event.preventDefault();

        // Get the form data
        var formData = {
            product_id: productId,
            size: sizeDropdown.value,
            color: colorDropdown.value,
            quantity: quantityInput.value
        };

        // Send the form data using Axios
        axios.post('/add-variant', formData)
            .then(function(response) {
                console.log('Variant added successfully');
                alert("Variant added successfully")

                // Reload the page or update the UI to show the new variant
            })
            .catch(function(error) {
                console.error('Error adding variant:', error);
                // Show an error message to the user
            });

    };
    form.appendChild(addButton);

    container.appendChild(form);
}