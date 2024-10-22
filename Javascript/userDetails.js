// Extract the user ID from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// Function to fetch user details and populate the UI
async function fetchUserDetails() {
    try {
        const response = await fetch(`https://flinders-cims-api-dev.azurewebsites.net/cims/user/get/${userId}`);
        if (response.ok) {
            const userData = await response.json();
            // Populate the user details in the HTML
            document.getElementById('username').innerText = userData.username;
            document.getElementById('userid').innerText = userData.userId;
            document.getElementById('firstname').innerText = userData.firstName;
            document.getElementById('lastname').innerText = userData.lastName;
            document.getElementById('phonenumber').innerText = userData.phoneNumber;
            document.getElementById('emailid').innerText = userData.emailId;
        } else {
            console.error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

// Function to delete the user
async function deleteUser() {
    try {
        const response = await fetch(`https://flinders-cims-api-dev.azurewebsites.net/cims/user/delete/${userId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('User deleted successfully!');
            // Redirect to another page after deletion
            window.location.href = 'userList.html'; // Example redirection
        } else {
            alert('Failed to delete the user.');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Add event listener to the delete button
document.getElementById('deleteButton').addEventListener('click', deleteUser);

// Fetch user details when the page loads
fetchUserDetails();
