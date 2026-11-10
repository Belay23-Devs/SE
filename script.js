// ==========================================
// 1. SELECT HTML ELEMENTS
// ==========================================

const loginForm = document.getElementById("loginForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const rememberCheckbox = document.getElementById("remember");

const togglePassword = document.getElementById("togglePassword");

const forgotPassword = document.getElementById("forgotPassword");


// ==========================================
// 2. SHOW / HIDE PASSWORD
// ==========================================

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';

        togglePassword.setAttribute("aria-label", "Hide password");

    } else {

        passwordInput.type = "password";

        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';

        togglePassword.setAttribute("aria-label", "Show password");

    }

});


// ==========================================
// 3. EMAIL VALIDATION FUNCTION
// ==========================================

function validateEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// ==========================================
// 4. DISPLAY ERROR MESSAGES
// ==========================================

function showError(message) {

    alert(message);

}


// ==========================================
// 5. LOGIN FORM SUBMISSION
// ==========================================

loginForm.addEventListener("submit", function (event) {

    // Prevent the page from refreshing
    event.preventDefault();


    // Get input values
    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const password = passwordInput.value;


    // Check empty fields
    if (name === "") {

        showError("Please enter your full name!");

        nameInput.focus();

        return;

    }


    if (email === "") {

        showError("Please enter your email!");

        emailInput.focus();

        return;

    }


    if (password === "") {

        showError("Please enter your password!");

        passwordInput.focus();

        return;

    }


    // Validate email
    if (!validateEmail(email)) {

        showError("Please enter a valid email address!");

        emailInput.focus();

        return;

    }


    // Check password length
    if (password.length < 8) {

        showError("Password must contain at least 8 characters!");

        passwordInput.focus();

        return;

    }


    // Remember Me
    if (rememberCheckbox.checked) {

        localStorage.setItem("rememberedEmail", email);

    } else {

        localStorage.removeItem("rememberedEmail");

    }


    // Successful frontend validation
    alert("Welcome " + name + "! Your form is valid.");


    // Clear the form
    loginForm.reset();


    // Restore password visibility
    passwordInput.type = "password";

    togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';

});


// ==========================================
// 6. FORGOT PASSWORD
// ==========================================

forgotPassword.addEventListener("click", function (event) {

    event.preventDefault();

    const email = prompt("Enter your registered email address:");

    if (email === null) {

        return;

    }

    if (email.trim() === "") {

        showError("Email address cannot be empty!");

        return;

    }

    if (!validateEmail(email.trim())) {

        showError("Please enter a valid email address!");

        return;

    }

    alert("Your email is: " + email.trim() +
        "\nConnect a backend email service to send a password reset link.");

});


// ==========================================
// 7. REMEMBER PREVIOUS EMAIL
// ==========================================

window.addEventListener("DOMContentLoaded", function () {

    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {

        emailInput.value = savedEmail;

        rememberCheckbox.checked = true;

    }

});