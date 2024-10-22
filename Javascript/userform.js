document.getElementById("userForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get form values
    const formData = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("lastname").value,
        password: document.getElementById("password").value,
        emailId: document.getElementById("email").value,
        role: document.getElementById("role").value,
        phoneNumber: document.getElementById("number").value,
        managerUserName: "" // Not used
    };

    try {
        const response = await fetch('https://flinders-cims-api-dev.azurewebsites.net/cims/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const contentType = response.headers.get("content-type");

        if (response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                alert('User created successfully!');
                console.log(result);
            } else {
                const textResponse = await response.text();
                alert('User created, but response is not JSON: ' + textResponse);
                console.log(textResponse);
            }

            // Redirect to user list after successful submission
            window.location.href = "userlist.html";
        } else {
            alert('Failed to create user.');
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    }
});

