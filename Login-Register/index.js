const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.addEventListener("click", () => {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
});

registerTab.addEventListener("click", () => {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
});

// Optional: Auto-focus on the first input field of the active form
document.addEventListener("DOMContentLoaded", () => {
    if (loginForm.classList.contains("active")) {
        loginForm.querySelector("input").focus();
    } else if (registerForm.classList.contains("active")) {
        registerForm.querySelector("input").focus();
    }
});
// Optional: Handle form submission (you can customize this part)
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Handle login logic here
    alert("Login form submitted!");
});
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Handle registration logic here
    alert("Registration form submitted!");
});