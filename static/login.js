document.querySelector('#loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    var formData = new FormData(this); // Create FormData object from form
    fetch('/login', { // URL for the login route
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showMessage(data.message);
        if (data.reload) {
            window.location.reload(); // Reload the page if specified in the response
        }
    })
    .catch(error => console.error('Error:', error));
});
