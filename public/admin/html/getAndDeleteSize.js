function addRow(size) {
    var table = document.getElementById("sizeTable"); // Get the table element
    var tbody = document.getElementById("sizeTableBody"); // Get the table body element
    var row = tbody.insertRow(); // Insert a new row at the end of the table

    // Add cells to the row
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    // var cell4 = row.insertCell();
    // var cell5 = row.insertCell();
    // var cell6 = row.insertCell();
    // var cell7 = row.insertCell();

    // Set the cell values
    cell1.innerHTML = tbody.rows.length; // Set the "#" column value to the new row index
    // cell2.innerHTML = color.color_id;
    cell2.innerHTML = size.name;
    // cell3.innerHTML = color.description;
    // cell5.innerHTML = color.price;
    // cell6.innerHTML = color.color_id;
    //     cell4.innerHTML = `<div class="dropdown">
    //     <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
    // <i class="bx bx-dots-vertical-rounded"></i>
    // </button>
    //     <div class="dropdown-menu">
    //         <a class="updatecolor" class="dropdown-item" data-id=${color.color_id} href="viewSinglecolor.html?id=${color.color_id}"><i class="bx bx-edit-alt me-1"></i> Edit</a
    // >
    //                             <a
    //                             data-id=${color.color_id}
    //                             class="deletecolor"
    // onClick="handleClick(${color.color_id})"
    //                                    class="dropdown-item"
    //                                    href="javascript:void(0);"
    //                                    >Delete</a
    //                                  >
    // </div>
    // </div>`; // Add the action buttons
    cell3.innerHTML = `<div class="dropdown">
    <button
      type="button"
      class="btn p-0 dropdown-toggle hide-arrow"
      data-bs-toggle="dropdown"
    >
      <i class="bx bx-dots-vertical-rounded"></i>
    </button>

    <div class="dropdown-menu">
    
      <a class="dropdown-item" onClick="handleClick(${size.size_id})"
 href="javascript:void(0);"
        ><i class="bx bx-trash me-1"></i> Delete</a
      >
    </div>
  </div>`

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


axios.get('http://localhost:5000/size')
    .then(response => {
        const data = response.data;
        data.forEach(item => {
            addRow(item)
        });
    })
    .catch(error => console.log(error));






function handleClick(size_id) {
    const colorId = size_id;
    console.log(colorId);
    // // Remove the row from the table
    try {
        console.log("delete axios reached");
        const deleteResponse = axios.delete(`http://localhost:5000/size/${colorId}`)
        console.log(deleteResponse);
        location.reload()

        console.log(colorId);

    } catch (error) {
        console.log(error);
    }

}