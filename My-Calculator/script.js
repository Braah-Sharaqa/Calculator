class Calculator {
  constructor(enteredData, newEnteredData) {
    this.enteredData = enteredData;
    this.newEnteredData = newEnteredData;
    this.clear();
  }
  clear() {
    this.firstOperand = "";
    this.secondOperand = "";
    this.operation = undefined;
  }
  appendNumber(number) {
    if (number === "." && this.firstOperand.includes(".")) return;
    this.firstOperand = this.firstOperand.toString() + number.toString();
  }
  operationselector(operation) {
    if (this.firstOperand === "") return;
    if (this.secondOperand !== "") {
      this.execute();
    }
    this.operation = operation;
    this.secondOperand = this.firstOperand;
    this.firstOperand = "";
  }
  execute() {
    let result;
    const second = parseFloat(this.secondOperand);
    const first = parseFloat(this.firstOperand);
    if (isNaN(second) || isNaN(first)) return;
    switch (this.operation) {
      case "+":
        result = second + first;
        break;
      case "-":
        result = second - first;
        break;
      case "x":
        result = second * first;
        break;
      case "÷":
        result = second / first;
        break;
      default:
        return;
    }
    this.firstOperand = result;
    this.operation = undefined;
    this.secondOperand = "";
  }

  display() {
    this.newEnteredData.innerText = this.firstOperand;
    this.enteredData.innerText = this.secondOperand;
    if (this.operation != null) {
      this.enteredData.innerText = `${this.secondOperand} ${this.operation}`;
    } else {
      this.enteredData.innerText = "";
    }
  }
}

const enteredData = document.querySelector("#entered-data"); //data-previous-operand
const newEnteredData = document.querySelector("#newentered-data");
const numberButtons = document.querySelectorAll("#operand");
const operationButtons = document.querySelectorAll("#operation");
const equalsButton = document.querySelector("#sympol-equal");
const allClearButton = document.querySelector("#all-clear");
const calculator = new Calculator(enteredData, newEnteredData);

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.display();
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.display();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.operationselector(button.innerText);
    calculator.display();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.execute();
  calculator.display();
});
