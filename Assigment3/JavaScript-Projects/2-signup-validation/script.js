const form = document.getElementById("signup-form");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirm: document.getElementById("confirm-password")
};

const errors = {
  name: document.getElementById("name-error"),
  email: document.getElementById("email-error"),
  password: document.getElementById("password-error"),
  confirm: document.getElementById("confirm-error")
};

function showError(field, message) {
  errors[field].textContent = message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  Object.values(errors).forEach((element) => element.textContent = "");
  document.getElementById("success").textContent = "";

  let valid = true;
  const name = fields.name.value.trim();
  const email = fields.email.value.trim();
  const password = fields.password.value;
  const confirm = fields.confirm.value;

  if (name.length < 2) {
    showError("name", "Please enter a name with at least 2 characters.");
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("email", "Please enter a valid email address.");
    valid = false;
  }

  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    showError("password", "Password must be 8+ characters and include a letter and a number.");
    valid = false;
  }

  if (confirm !== password || confirm === "") {
    showError("confirm", "Passwords do not match.");
    valid = false;
  }

  if (valid) {
    document.getElementById("success").textContent =
      "Form validated successfully! This demo does not create or store an account.";
    form.reset();
  }
});
