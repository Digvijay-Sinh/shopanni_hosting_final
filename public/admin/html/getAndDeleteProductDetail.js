async function addRow(product) {
    var table = document.getElementById("productsDetailTable"); // Get the table element
    var tbody = document.getElementById("productsDetailTableBody"); // Get the table body element
    var row = tbody.insertRow(); // Insert a new row at the end of the table

    // Add cells to the row
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    var cell6 = row.insertCell();
    var cell7 = row.insertCell();

    const response = await axios.get(`http://localhost:5000/api/v1/products/${product.product_id}`);
    const productFromProductTable = response.data[0];
    // Set the cell values
    cell1.innerHTML = tbody.rows.length; // Set the "#" column value to the new row index
    cell2.innerHTML = product.product_id;
    cell3.innerHTML = productFromProductTable.name;
    cell4.innerHTML = product.product_size;
    cell5.innerHTML = product.product_color;
    var div = document.createElement("div");
    div.classList.add("input-group");

    // create minus button element
    var minusBtn = document.createElement("button");
    minusBtn.classList.add("minus-btn");
    minusBtn.textContent = "-";


    // create input field element
    var inputField = document.createElement("input");
    inputField.classList.add("input-field");
    inputField.type = "number";
    inputField.value = product.variant_quantity;

    minusBtn.addEventListener('click', async function() {
        var input = this.parentNode.querySelector('.input-field');
        var currentValue = parseInt(input.value);
        if (currentValue > 0) {
            input.value = currentValue - 1;
            try {
                console.log(input.value);
                const response = await axios.put('/productDetails', {
                    product_id: product.product_id,
                    product_color: product.product_color,
                    product_size: product.product_size,
                    variant_quantity: input.value
                });

                console.log(response.data);
            } catch (error) {
                console.error(error);
            }

        }


    });

    // create plus button element
    var plusBtn = document.createElement("button");
    plusBtn.classList.add("plus-btn");
    plusBtn.textContent = "+";

    plusBtn.addEventListener('click', async function() {
        var input = this.parentNode.querySelector('.input-field');
        input.value = parseInt(input.value) + 1;
        try {
            // const session = await axios.get('/session');
            // const userId = session.data.userId;
            console.log(input.value);
            const response = await axios.put('/productDetails', {
                product_id: product.product_id,
                product_color: product.product_color,
                product_size: product.product_size,
                variant_quantity: input.value
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }




    });
    // add elements to div
    div.appendChild(minusBtn);
    div.appendChild(inputField);
    div.appendChild(plusBtn);

    // add div to document body
    cell6.appendChild(div);
    // cell6.innerHTML = product.variant_quantity;
    cell7.innerHTML = `<div class="dropdown">
    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
<i class="bx bx-dots-vertical-rounded"></i>
</button>
    <div class="dropdown-menu">
        <a class="dropdown-item updateProduct" data-id=${product.product_id} href="http://localhost:5000/edit_product/${product.product_id}"><i class="bx bx-edit-alt me-1"></i> Edit</a
>
                            <a
                            data-id=${product.product_id}
                            
                            onClick="handleClick(${product.product_id})"
                                   class="dropdown-item deleteProduct"
                                   href="javascript:void(0);"
                                   >Delete</a
                                 >
</div>
</div>`; // Add the action buttons


}






axios.get('http://localhost:5000/product_details')
    .then(response => {
        const data = response.data;
        data.forEach(item => {
            addRow(item)
        });
    })
    .catch(error => console.log(error));






function handleClick(product_id) {
    const productId = product_id;
    console.log(productId);
    // // Remove the row from the table
    try {
        const deleteResponse = axios.delete(`http://localhost:5000/api/v1/products/${productId}`)
        console.log(deleteResponse);
        location.reload()

        console.log(productId);

    } catch (error) {
        console.log(error);
    }

}

function logout() {
    axios.get('http://localhost:5000/logout')
        .then(response => {

            // handle successful logout
            console.log(response.data);
        })
        .catch(error => {
            // handle error
            console.log(error);
        });
}