document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;

    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, mobile })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Registration successful, OTP sent to email and mobile.');
    } else {
        alert('Error registering user: ' + data.message);
    }
});
