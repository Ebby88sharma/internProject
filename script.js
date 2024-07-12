document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const otherHobbyCheckbox = document.getElementById("otherHobby");
  const otherHobbyText = document.getElementById("otherHobbyText");
  const countrySelect = document.getElementById("country");
  const stateGroup = document.getElementById("stateGroup");
  const genderRadios = document.querySelectorAll('input[name="gender"]');

  otherHobbyCheckbox.addEventListener("change", function () {
    if (this.checked) {
      otherHobbyText.style.display = "block";
    } else {
      otherHobbyText.style.display = "none";
    }
  });

  countrySelect.addEventListener("change", function () {
    if (this.value === "USA") {
      stateGroup.style.display = "block";
    } else {
      stateGroup.style.display = "none";
    }
  });

  genderRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "male") {
        form.style.backgroundColor = "lightblue";
      } else if (this.value === "female") {
        form.style.backgroundColor = "lightpink";
      } else if (this.value === "other") {
        form.style.backgroundColor = "lightgreen";
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = validateForm();
    if (isValid) {
      document.getElementById("successMessage").textContent =
        "Form submitted successfully!";
      form.reset();
      otherHobbyText.style.display = "none";
      stateGroup.style.display = "none";
      form.style.backgroundColor = "";
    }
  });

  function validateForm() {
    let isValid = true;

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const dob = document.getElementById("dob").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const country = document.getElementById("country").value;

    // Clear previous errors
    document
      .querySelectorAll(".error")
      .forEach((error) => (error.textContent = ""));

    // Name validation
    if (name.length < 3) {
      document.getElementById("nameError").textContent =
        "Name must be at least 3 characters long.";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (password.length < 8) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 8 characters long.";
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match.";
      isValid = false;
    }

    // Date of Birth validation
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      document.getElementById("dobError").textContent =
        "You must be at least 18 years old.";
      isValid = false;
    }

    // Gender validation
    if (!gender) {
      document.getElementById("genderError").textContent =
        "Please select your gender.";
      isValid = false;
    }

    // Country validation
    if (country === "") {
      document.getElementById("countryError").textContent =
        "Please select your country.";
      isValid = false;
    }

    return isValid;
  }
});
