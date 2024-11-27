const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = window.location.origin.includes("localhost")
    ? "http://localhost:5000"
    : "https://api.yourdomain.com";

  const signUpForm = document.querySelector(".sign-up-form");
  const signInForm = document.querySelector(".sign-in-form");

  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = signUpForm.querySelector('input[placeholder="Username"]').value;
    const email = signUpForm.querySelector('input[placeholder="Email"]').value;
    const password = signUpForm.querySelector('input[placeholder="Password"]').value;

    try {
      const response = await fetch(`${BASE_URL}/api/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("Sign-up successful!");
      } else {
        alert("Sign-up failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Sign-up failed. Network error.");
    }
  });

  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = signInForm.querySelector('input[placeholder="Username"]').value;
    const password = signInForm.querySelector('input[placeholder="Password"]').value;

    try {
      const response = await fetch(`${BASE_URL}/api/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Login successful!");
      } else {
        alert("Login failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Network error.");
    }
  });
});