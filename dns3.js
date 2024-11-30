document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = window.location.origin.includes("localhost")
      ? "http://localhost:5000"
      : "https://api.yourdomain.com"; // Replace yourdomain.com or use relative URLs if your API is on the same domain


    const signUpForm = document.querySelector(".sign-up-form");
    const signInForm = document.querySelector(".sign-in-form");
    const container = document.querySelector(".container"); // Get the container element
    const sign_up_btn = document.querySelector("#sign-up-btn"); // Sign-up button
    const sign_in_btn = document.querySelector("#sign-in-btn"); // Sign-in button


    // Toggle sign-up/sign-in form
    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });



    signUpForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        const username = signUpForm.username.value;
        const email = signUpForm.email.value;
        const password = signUpForm.password.value;

        try {
            const response = await fetch(`${BASE_URL}/api/users/register`, { // Removed trailing slash
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {

                const data = await response.json(); // Parse JSON response
                // Store JWT in local storage or session storage. Use localStorage for persistent login between sessions.
                if (data.access_token) {  // Check if access token exists
                    localStorage.setItem('access_token', data.access_token);
                    alert("Sign-up successful! You are now logged in.");
                    window.location.href = "/dashboard"; // Redirect after successful sign-up


                }


            } else {
                const errorData = await response.json(); // Get error data from response
                const errorMessage = errorData.message || "Sign-up failed. Please check your information and try again."; // Extract error message or provide a default
                alert(errorMessage); // Display error to the user


            }
        } catch (error) {
            console.error("Sign-up error:", error); // More descriptive error message
            alert("Sign-up failed. Network error or server issue.");
        }
    });

    signInForm.addEventListener("submit", async (e) => {
        e.preventDefault();


        const username = signInForm.username.value;
        const password = signInForm.password.value;

        try {
            const response = await fetch(`${BASE_URL}/api/users/login`, { // Removed trailing slash

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json(); // Parse JSON response
                 // Store JWT in local storage
                if (data.access_token) { // Check if access token exists
                    localStorage.setItem('access_token', data.access_token);
                    alert("Login successful!");
                    window.location.href = "/dashboard"; // Redirect after successful login

                }




            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || "Login failed. Please check your credentials.";
                alert(errorMessage); // Show more user-friendly errors


            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Network error or server issue.");

        }
    });
});
