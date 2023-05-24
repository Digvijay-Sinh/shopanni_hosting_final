axios.get('http://localhost:5000/totalSales')
    .then(function(response) {
        const sum = response.data;
        console.log(sum);
        const sumResultElement = document.getElementById('sales');
        sumResultElement.innerHTML = sum;
    })
    .catch(function(error) {
        console.error(error);
    });

function addRow(order) {
    var table = document.getElementById("ordersTable"); // Get the table element
    var tbody = document.getElementById("ordersTableBody"); // Get the table body element
    var row = tbody.insertRow(); // Insert a new row at the end of the table


    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    var cell6 = row.insertCell();
    var cell7 = row.insertCell();
    var cell8 = row.insertCell();
    var cell9 = row.insertCell();
    var cell10 = row.insertCell();
    var cell11 = row.insertCell();
    var cell12 = row.insertCell();
    var cell13 = row.insertCell();
    var cell14 = row.insertCell();
    var cell15 = row.insertCell();
    var cell16 = row.insertCell();
    var cell17 = row.insertCell();
    var cell18 = row.insertCell();

    // Set the cell values
    cell1.innerHTML = tbody.rows.length; // Set the "#" column value to the new row index
    cell2.innerHTML = order.orders_id;
    cell3.innerHTML = order.user_id;
    cell4.innerHTML = order.name;
    cell5.innerHTML = order.address;
    cell6.innerHTML = order.district;
    cell7.innerHTML = order.state;
    cell8.innerHTML = order.phone;
    cell9.innerHTML = order.email;
    cell10.innerHTML = order.total;
    const dateObj1 = new Date(order.created_at);

    // Convert to local timezone and format as string in 'yyyy-mm-dd hh:mm:ss' format
    const localDatetimeStr1 = dateObj1.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '');
    // cell7.innerHTML = localDatetimeStr;
    const dateObj2 = new Date(order.updated_at);

    // Convert to local timezone and format as string in 'yyyy-mm-dd hh:mm:ss' format
    const localDatetimeStr2 = dateObj2.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '');

    cell11.innerHTML = localDatetimeStr1;
    cell12.innerHTML = localDatetimeStr2;
    cell13.innerHTML = order.landmark;
    cell14.innerHTML = order.razorpay_payment_id;
    cell15.innerHTML = order.razorpay_order_id;
    cell16.innerHTML = order.razorpay_signature;
    // Create a select element
    var select = document.createElement("select");
    select.setAttribute('id', `mySelect-${order.orders_id}`);
    // Create the two options and add them to the select element
    var option1 = document.createElement("option");
    option1.value = "Paid";
    option1.text = "Paid";
    select.add(option1);

    var option2 = document.createElement("option");
    option2.value = "Pending";
    option2.text = "Pending";
    select.add(option2);

    // Set the initial value of the select element to the order status
    select.value = order.status;


    select.onchange = select.onchange = function() {
        const order_id = order.orders_id; // Get the order_id from the dataset
        var select = document.getElementById(`mySelect-${order.orders_id}`);
        var selectedValue = select.options[select.selectedIndex].value;
        console.log(selectedValue);

        updateOrderStatus(selectedValue, order_id); // Call the updateOrderStatus function with the order_id and cell parameters
    };; // Add the onchange event listener




    // Add the select element to the cell
    cell17.appendChild(select); // Add cells to the row
    // var cell1 = row.insertCell();
    // var cell2 = row.insertCell();
    // var cell3 = row.insertCell();
    // var cell4 = row.insertCell();
    // var cell5 = row.insertCell();
    // var cell6 = row.insertCell();
    // var cell7 = row.insertCell();
    // var cell8 = row.insertCell();

    // // Set the cell values
    // cell1.innerHTML = tbody.rows.length; // Set the "#" column value to the new row index
    // cell2.innerHTML = order.order_id;
    // cell3.innerHTML = order.user_id;
    // cell4.innerHTML = order.product_id;
    // console.log(order.product_id);
    // cell5.innerHTML = order.total_amount;
    // cell6.innerHTML = order.payment_status;
    // console.log(order.expiration_date);
    // const dateObj = new Date(order.date_ordered);

    // // Convert to local timezone and format as string in 'yyyy-mm-dd hh:mm:ss' format
    // const localDatetimeStr = dateObj.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '');
    // cell7.innerHTML = localDatetimeStr;

    cell18.innerHTML = `<div class="dropdown">
    <button
      type="button"
      class="btn p-0 dropdown-toggle hide-arrow"
      data-bs-toggle="dropdown"
    >
      <i class="bx bx-dots-vertical-rounded"></i>
    </button>

    <div class="dropdown-menu">
      <a class="dropdown-item" href="viewSingleOrders.html?id=${order.orders_id}"
        ><i class="bx bx-edit-alt me-1"></i> Edit</a
      >
      <a class="dropdown-item" onClick="handleClick(${order.orders_id})"
 href="javascript:void(0);"
        ><i class="bx bx-trash me-1"></i> Delete</a
      >
    </div>
  </div>`

}


var totalOrders = 0
var pendingOrders = 0
var paidOrders = 0



axios.get('http://localhost:5000/api/v1/orders')
    .then(response => {
        const data = response.data;
        console.log(data);
        data.forEach(item => {
            if (item.status === "Pending") {
                pendingOrders++
            } else if (item.status === "Paid") {
                paidOrders++
            }
            totalOrders++
            addRow(item)
        });
        document.getElementById("totalOrders").innerHTML = totalOrders
        document.getElementById("paidOrders").innerHTML = paidOrders
        document.getElementById("pendingOrders").innerHTML = pendingOrders
        console.log(totalOrders);
        console.log(pendingOrders);
        console.log(paidOrders);
    })
    .catch(error => console.log(error));



function updateOrderStatus(paymentStatus, orderId) {
    axios.put('/order/updateStatus/' + orderId, { status: paymentStatus })
        .then(response => {
            console.log(response.data);

            // You can update the UI accordingly here
        })
        .catch(error => {
            console.log(error);
        });
}




async function handleClick(order_id) {
    const orderId = order_id;
    console.log(orderId);
    // // Remove the row from the table
    try {
        const deleteResponse = await axios.delete(`http://localhost:5000/api/v1/orders/${orderId}`)
        console.log(deleteResponse);
        location.reload()

        console.log(orderId);

    } catch (error) {
        console.log(error);
    }

}

function logout() {
    axios.post('/logout')
        .then(response => {
            // handle successful logout
            console.log(response.data);
        })
        .catch(error => {
            // handle error
            console.log(error);
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