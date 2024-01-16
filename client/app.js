
const socket = new WebSocket("ws://localhost:3000");
// Connection opened
socket.addEventListener("open", (event) => {
    // socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
    alert("Please reload the page for latest update")
    console.log("Message from server ", event.data);
});

const loadData = () => {
    const dataEndPoint= "http://localhost:3000/api/users"
    axios.get(dataEndPoint)
        .then(response => {          
            var table = document.getElementById("user-body");
            // clear the table before loading data
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }
            const data = response.data 
            data.forEach(user => {
                var newRow = table.insertRow(table.rows.length);
                var nameCell = newRow.insertCell(0);
                var emailCell = newRow.insertCell(1);
                var ageCell = newRow.insertCell(2);
                nameCell.innerHTML = user.name;
                emailCell.innerHTML = user.email;
                ageCell.innerHTML = user.age;               
            });
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const register = (e) => {
    e.preventDefault();
    const registerEndpoint="http://localhost:3000/api/register"
    const name = document.getElementById("name").value 
    const email = document.getElementById("email").value 
    const age = document.getElementById("age").value  
    console.log("go")
    axios.post(registerEndpoint,{name,email,age}).then(response => {
        if (response.data.user) {
            socket.send( "registered");
            loadData()
        }
        else {
            alert("Error register user")
       }

    }).catch(error => {
    alert (error)
})
}


loadData()