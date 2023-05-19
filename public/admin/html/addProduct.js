const form = document.querySelector('#productForm');
// import { v4 as uuidv4 } from 'uuid';

// let myuuid = uuidv4();

const id = Date.now()

const addImagesButton = document.getElementById('addImages');

// Add an onclick event listener
addImagesButton.addEventListener('click', function() {
    console.log(id);
    // Call the addImage function when the button is clicked
    addImage()
});
// Get the select element
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

    })
    .catch(error => console.log(error));

function addImage() {
    // event.preventDefault();
    const form = document.getElementById('addImageForm');
    const formData = new FormData();

    const files = document.querySelector('[name="image"]').files;
    // console.log(files);

    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
        // console.log(i);
        formData.append(`images`, files[i]);
        // console.log(files[i]);
    }
    formData.append('productId', id);

    // for (let index = 0; index < files.length; index++) {
    //     const element = formData.get(`images[${index}]`);
    //     console.log(element);

    // }

    // const data = formData.get('images')
    // const pid = formData.get('productId')
    // console.log(pid);

    // console.log(formData.productId);
    // console.log(formData);
    // Send the FormData object to the server using Axios
    axios.post('http://localhost:5000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response.data);
        alert("Images uploaded successfully")

    }).catch(error => {
        console.error(error);
    });
}
// Get all the files from the file input field// Get all the files from the file input field

// console.out('Your UUID is: ' + myuuid);

form.addEventListener('submit', (event) => {

    event.preventDefault(); // prevent form from submitting
    console.log(id);
    const formData = new FormData(form);
    const product_id = id;
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const category_id = formData.get('category_id');
    const image_url = "";
    const data = {
        product_id,
        name,
        description,
        price,
        category_id,
        image_url
    };
    console.log(data);

    axios.post('http://localhost:5000/api/v1/products/', data)
        .then(response => {
            console.log(response.data);
            location.reload()
        })
        .catch(error => {
            console.error(error);
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
            product_id: id,
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


// function addVariant() {
//     const form=document.createElement('form')

//     const div1 = document.createElement('div');
//     div1.classList.add('mb-3');
//     div1.innerHTML = `
//     <label for="dropdownCategory" class="form-label">Select size</label>
//     <select name="size_id" class="form-select" id="dropdownCategory" aria-label="Default select example">
//       <option selected>Open this to select size</option>
//     </select>
//   `;
//     const div2 = document.createElement('div');
//     div2.classList.add('mb-3');
//     div2.innerHTML = `
//     <label for="dropdownCategory" class="form-label">Select colour</label>
//     <select name="colour" class="form-select" id="dropdownCategory" aria-label="Default select example">
//       <option selected>Open this to select colour</option>
//     </select>
//   `;
//   const button = document.createElement('button');
//   button.setAttribute('type', 'button');
//   button.setAttribute('class', 'btn btn-primary');
//   button.textContent = text;
//     form.appendChild(div1)
//     form.appendChild(div2)
//     document.getElementById('addVariantContainer').appendChild(div2)
// }
// function addVariant() {
//     // Create a new form element
//     console.log("add variant function reached ");
//     const container = document.getElementById("addVariantContainer");

//     // Create a new select element
//     const select = document.createElement("select");
//     select.name = "category_id";
//     select.classList.add("form-select");
//     select.id = "dropdownCategory";
//     select.setAttribute("aria-label", "Default select example");

//     // Create the default option
//     const defaultOption = document.createElement("option");
//     defaultOption.textContent = "Open this to select Category";
//     defaultOption.selected = true;

//     // Add the default option to the select element
//     select.appendChild(defaultOption);

//     // Create the other options and add them to the select element
//     const option1 = document.createElement("option");
//     option1.value = "1";
//     option1.textContent = "One";
//     select.appendChild(option1);

//     const option2 = document.createElement("option");
//     option2.value = "2";
//     option2.textContent = "Two";
//     select.appendChild(option2);

//     const option3 = document.createElement("option");
//     option3.value = "3";
//     option3.textContent = "Three";
//     select.appendChild(option3);

//     // Add the select element to the container
//     container.appendChild(select);
// }