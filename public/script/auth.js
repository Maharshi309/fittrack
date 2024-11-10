document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Basic validation
            if (email && password) {
                console.log('Login attempt:', { email, password });
                // Here you would typically send this data to your server
                alert('Login successful! (This is a demo)');
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Basic validation
            if (name && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }
                console.log('Signup attempt:', { name, email, password });
                // Here you would typically send this data to your server
                alert('Signup successful! (This is a demo)');
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});

// In your signup.js or auth.js
async function signUp() {
    const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }),
    });
    const data = await response.json();
    console.log(data);
}
