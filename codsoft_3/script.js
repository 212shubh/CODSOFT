const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const numberButtons = document.querySelectorAll(".btn:not(.operator)");
const operatorButtons = document.querySelectorAll(".btn.operator");
const equalsButton = document.getElementById("equals");

let currentInput = "";
let firstOperand = "";
let operator = "";
let isCalculated = false;

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function handleNumberClick(number) {
  if (isCalculated) {
    currentInput = number;
    isCalculated = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function handleOperatorClick(newOperator) {
  if (operator !== "") {
    calculate();
  }
  firstOperand = currentInput;
  operator = newOperator;
  currentInput = "";
}

function calculate() {
  const secondOperand = currentInput;
  if (operator && firstOperand !== "") {
    switch (operator) {
      case "+":
        currentInput = (parseFloat(firstOperand) + parseFloat(secondOperand)).toString();
        break;
      case "-":
        currentInput = (parseFloat(firstOperand) - parseFloat(secondOperand)).toString();
        break;
      case "*":
        currentInput = (parseFloat(firstOperand) * parseFloat(secondOperand)).toString();
        break;
      case "/":
        if (parseFloat(secondOperand) === 0) {
          currentInput = "Error";
        } else {
          currentInput = (parseFloat(firstOperand) / parseFloat(secondOperand)).toString();
        }
        break;
    }
  }
  operator = "";
  firstOperand = "";
  isCalculated = true;
  updateDisplay();
}

function clear() {
  currentInput = "";
  operator = "";
  firstOperand = "";
  isCalculated = false;
  updateDisplay();
}

clearButton.addEventListener("click", clear);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    handleNumberClick(button.textContent);
  });
});

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    handleOperatorClick(button.textContent);
  });
});

equalsButton.addEventListener("click", () => {
  calculate();
});

updateDisplay();
