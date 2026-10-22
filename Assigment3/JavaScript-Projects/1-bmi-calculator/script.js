const form = document.getElementById("bmi-form");
const result = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const heightCm = Number(document.getElementById("height").value);
  const weightKg = Number(document.getElementById("weight").value);

  if (heightCm <= 0 || weightKg <= 0 || !Number.isFinite(heightCm) || !Number.isFinite(weightKg)) {
    result.textContent = "Please enter a valid positive height and weight.";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category;
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obesity range";
  }

  result.textContent = `Your BMI is ${bmi.toFixed(1)} — ${category}.`;
});
