const clock = document.getElementById("clock");
const dateDisplay = document.getElementById("date");

function updateClock() {
  const now = new Date();

  clock.textContent = now.toLocaleTimeString();
  dateDisplay.textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

updateClock();
setInterval(updateClock, 1000);
