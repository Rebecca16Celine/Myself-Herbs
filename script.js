// For Sign-Up Page
document.getElementById('signupForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        full_name: fullName,
        email: email,
        password: password
    };

    fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('responseMessage').textContent = result.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// For Log-In Page
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        email: email,
        password: password
    };

    fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('responseMessage').textContent = result.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});