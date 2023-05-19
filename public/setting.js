const form = document.getElementById("updatePassword");

// When the form is submitted, make a POST request to the server
form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    // Get the form data
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate the form data
    if (newPassword !== confirmPassword) {
        alert("New password and confirm password must match");
        return;
    }

    // Make the POST request with Axios
    axios.put("/updatePassword", {
            currentPassword,
            newPassword
        })
        .then((response) => {
            // Handle the response from the server
            if (response.data === "NotAuthorised") {
                alert("Password Incorrect")
            } else {
                console.log(response.data);
                alert("Password updated successfully");
            }

        })
        .catch((error) => {
            // Handle any errors that occur during the request
            console.error(error);
            alert("Error updating password");
        });
});