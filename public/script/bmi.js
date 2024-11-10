function calculateBMI() {
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const resultDiv = document.getElementById('result');

  if (weight && height) {
      const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
      let category;

      if (bmi < 18.5) {
          category = 'Underweight';
      } else if (bmi >= 18.5 && bmi < 25) {
          category = 'Normal weight';
      } else if (bmi >= 25 && bmi < 30) {
          category = 'Overweight';
      } else {
          category = 'Obese';
      }

      resultDiv.innerHTML = `Your BMI is ${bmi}. Category: ${category}`;
  } else {
      resultDiv.innerHTML = 'Please enter both weight and height.';
  }
}