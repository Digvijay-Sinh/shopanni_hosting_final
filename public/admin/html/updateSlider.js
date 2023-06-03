// const urlParams = new URLSearchParams(window.location.search);
// console.log(window.location.search);
// const productId = urlParams.get('id');

// Get the product data from the server using Axios
axios.get(`http://localhost:5000/slider`)
    .then(async response => {
        // Pre-fill the input fields with the product data
        const sliders = response.data;
        console.log(sliders);
        document.getElementById('slider1text1').value = sliders[0].text1;
        document.getElementById('slider1text2').value = sliders[0].text2;
        document.getElementById('slider2text1').value = sliders[1].text1;
        document.getElementById('slider2text2').value = sliders[1].text2;
        document.getElementById('slider3text1').value = sliders[2].text1;
        document.getElementById('slider3text2').value = sliders[2].text2;



    })
    .catch(error => {
        console.error(error);
    });



const form = document.getElementById('updateSliderForm1');
const slider1text1 = document.getElementById('slider1text1');
const slider1text2 = document.getElementById('slider1text2');
const form2 = document.getElementById('updateSliderForm2');
const slider2text1 = document.getElementById('slider2text1');
const slider2text2 = document.getElementById('slider2text2');
const form3 = document.getElementById('updateSliderForm3');
const slider3text1 = document.getElementById('slider3text1');
const slider3text2 = document.getElementById('slider3text2');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("clicked");
    // Get the form data
    const formData = new FormData(form);
    const slider1text1 = formData.get('slider1text1');
    const slider1text2 = formData.get('slider1text2');

    // Send the PUT request using Axios
    axios.put(`http://localhost:5000/updateSlider/1`, {
            slider1text1,
            slider1text2,
        })
        .then((response) => {
            alert("Slider updated successfully")
            console.log(response.data);
        })
        .catch((error) => {
            alert("Errror updating slider")

            console.log(error);
        });
});

form2.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("form 2");
    // Get the form data
    const formData = new FormData(form2);
    const slider1text1 = formData.get('slider2text1');
    const slider1text2 = formData.get('slider2text2');

    // Send the PUT request using Axios
    axios.put(`http://localhost:5000/updateSlider/2`, {
            slider1text1,
            slider1text2,
        })
        .then((response) => {
            alert("Slider updated successfully")
            console.log(response.data);
        })
        .catch((error) => {
            alert("Errror updating slider")

            console.log(error);
        });
});

form3.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("clicked");
    // Get the form data
    const formData = new FormData(form3);
    const slider1text1 = formData.get('slider3text1');
    const slider1text2 = formData.get('slider3text2');
    // Send the PUT request using Axios
    axios.put(`http://localhost:5000/updateSlider/3`, {
            slider1text1,
            slider1text2,
        })
        .then((response) => {
            alert("Slider updated successfully")
            console.log(response.data);
        })
        .catch((error) => {
            alert("Errror updating slider")

            console.log(error);
        });
});

const addImagesButton = document.getElementById('addImages');

// Add an onclick event listener
addImagesButton.addEventListener('click', function() {
    // Call the addImage function when the button is clicked
    addImage(1)
});
const addImagesButton2 = document.getElementById('addImages2');

// Add an onclick event listener
addImagesButton2.addEventListener('click', function() {
    // Call the addImage function when the button is clicked
    addImage(2)
});
const addImagesButton3 = document.getElementById('addImages3');

// Add an onclick event listener
addImagesButton3.addEventListener('click', function() {
    // Call the addImage function when the button is clicked
    addImage(3)
});

function addImage(id) {
    // event.preventDefault();
    const form = document.getElementById('addImageForm');
    const formData = new FormData();

    const files = document.querySelector(`[name="image${id}"]`).files;
    // console.log(files);

    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
        // console.log(i);
        formData.append(`images`, files[i]);
        // console.log(files[i]);
    }
    formData.append('id', id);

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
    axios.post('http://localhost:5000/uploadSliderImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response.data);
        alert("Images uploaded successfully")

    }).catch(error => {
        alert("Images not uploaded successfully")

        console.error(error);
    });
}

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


// async function addVariant() {
//     var container = document.getElementById("addVariantContainer");
//     const response = await axios.get('http://localhost:5000/colors');
//     const colors = response.data; // Create the form element
//     const responseSize = await axios.get('http://localhost:5000/size');
//     const sizes = responseSize.data; // Create the form element
//     var form = document.createElement("form");
//     form.style.border = "1px solid grey";
//     form.style.padding = "20px";
//     // Create the first dropdown for size
//     var sizeDropdown = document.createElement("select");
//     sizeDropdown.name = "size";
//     sizeDropdown.className = "form-select";
//     var sizeLabel = document.createElement("label");
//     sizeLabel.innerHTML = "Select Size ";
//     sizeLabel.className = "form-label";
//     form.appendChild(sizeLabel);

//     var sizeOption1 = document.createElement("option");
//     sizeOption1.value = "";
//     sizeOption1.innerHTML = "Select Size";
//     sizeDropdown.appendChild(sizeOption1);

//     for (let i = 0; i < sizes.length; i++) {
//         const size = sizes[i];
//         var sizeOption2 = document.createElement("option");
//         sizeOption2.value = size.name;
//         sizeOption2.innerHTML = size.name;
//         sizeDropdown.appendChild(sizeOption2);
//     }

//     form.appendChild(sizeDropdown);

//     // Create the second dropdown for color
//     var colorDropdown = document.createElement("select");
//     colorDropdown.name = "color";
//     colorDropdown.className = "form-select";
//     var colorLabel = document.createElement("label");
//     colorLabel.innerHTML = "Select Color ";
//     colorLabel.className = "form-label";
//     var colorOption1 = document.createElement("option");
//     colorOption1.value = "";

//     colorOption1.innerHTML = "Select Color";
//     colorDropdown.appendChild(colorOption1);

//     for (let i = 0; i < colors.length; i++) {
//         const color = colors[i];
//         var colorOption5 = document.createElement("option");
//         colorOption5.value = color.name;
//         colorOption5.innerHTML = color.name;
//         colorDropdown.appendChild(colorOption5);
//     }

//     form.appendChild(colorLabel);
//     form.appendChild(colorDropdown);

//     // Create the input element for quantity
//     var quantityInput = document.createElement("input");
//     quantityInput.type = "number";
//     quantityInput.name = "quantity";
//     quantityInput.className = "form-control";
//     quantityInput.placeholder = "Quantity";
//     form.appendChild(quantityInput);

//     // Create the button to submit the form
//     var addButton = document.createElement("button");
//     addButton.type = "submit";
//     addButton.innerHTML = "Add variant";
//     addButton.className = "addVariantButton btn btn-outline-primary";
//     addButton.onclick = function(event) {
//         event.preventDefault();

//         // Get the form data
//         var formData = {
//             product_id: productId,
//             size: sizeDropdown.value,
//             color: colorDropdown.value,
//             quantity: quantityInput.value
//         };

//         // Send the form data using Axios
//         axios.post('/add-variant', formData)
//             .then(function(response) {
//                 console.log('Variant added successfully');
//                 alert("Variant added successfully")

//                 // Reload the page or update the UI to show the new variant
//             })
//             .catch(function(error) {
//                 console.error('Error adding variant:', error);
//                 // Show an error message to the user
//             });

//     };
//     form.appendChild(addButton);

//     container.appendChild(form);
// }