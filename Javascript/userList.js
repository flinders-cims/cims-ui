document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch user data from the API
    function fetchUsers() {
        fetch('https://flinders-cims-api-dev.azurewebsites.net/cims/users/all')
            .then(response => response.json())
            .then(data => {
                populateTable(data);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }

    // Function to populate the table with user data
    function populateTable(users) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = ''; // Clear any existing rows

        // Loop through users and create rows
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="userDetails.html?userId=${userId}" target="_self">${userId}</a></td>
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td>${user.firstName}</td>
                <td>${user.emailId}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Fetch users when the page loads
    fetchUsers();
});
