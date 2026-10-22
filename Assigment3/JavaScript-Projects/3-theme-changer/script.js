const themeSelect = document.getElementById("theme");
const toggleButton = document.getElementById("toggle");
const body = document.body;

themeSelect.addEventListener("change", () => {
  body.dataset.theme = themeSelect.value;
});

toggleButton.addEventListener("click", () => {
  const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
  body.dataset.theme = nextTheme;
  themeSelect.value = nextTheme;
});
