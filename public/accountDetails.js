// Get the category data from the server using Axios
axios.get(`http://localhost:5000/getUserById`)
    .then(response => {
        // Pre-fill the input fields with the category data
        const user = response.data;
        console.log(user);
        document.getElementById('inputUsername').value = user.name;
        document.getElementById('inputAddress1').value = user.address1;
        document.getElementById('inputAddress2').value = user.address2;
        document.getElementById('inputEmailAddress').value = user.email;
        document.getElementById('inputPhone').value = user.number;
        document.getElementById('inputState').value = user.state;
        document.getElementById('inputDistrict').value = user.district;
        document.getElementById('inputPincode').value = user.pincode;
    })
    .catch(error => {
        console.error(error);
    });



const form = document.getElementById('userUpdateForm');
// const inputUsername = document.getElementById('inputUsername');
const inputAddress1 = document.getElementById('inputAddress1');
const inputAddress2 = document.getElementById('inputAddress2');
// const inputEmailAddress = document.getElementById('inputEmailAddress');
const inputPhone = document.getElementById('inputPhone');
const inputState = document.getElementById('inputState');
const inputDistrict = document.getElementById('inputDistrict');
const inputPincode = document.getElementById('inputPincode');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(form);
    // const inputUsernameForm = document.getElementById('inputUsername').value;
    const inputAddress1Form = document.getElementById('inputAddress1').value;
    const inputAddress2Form = document.getElementById('inputAddress2').value;
    // const inputEmailAddressForm = document.getElementById('inputEmailAddress').value;
    const inputPhoneForm = document.getElementById('inputPhone').value;
    const inputStateForm = document.getElementById('inputState').value;
    const inputDistrictForm = document.getElementById('inputDistrict').value;
    const inputPincodeForm = document.getElementById('inputPincode').value;

    // Send the PUT request using Axios
    axios.put(`http://localhost:5000/updateUser`, {
            inputAddress1Form,
            inputAddress2Form,
            inputPhoneForm,
            inputStateForm,
            inputDistrictForm,
            inputPincodeForm

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