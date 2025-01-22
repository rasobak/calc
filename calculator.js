const elScreenHistory = document.querySelector("#history");
const elScreenMain = document.querySelector("#current");

let mainScreen = "";
let historyScreen = "";

let operator = undefined;
let isFirstValue = true;
let firstValue = "";
let secondValue = "";

let shouldClearScreen = false;

const operators = {
  add: {
    sign: "+",
    func: (a, b) => a + b,
  },
  sub: {
    sign: "-",
    func: (a, b) => a - b,
  },
  multiply: {
    sign: "x",
    func: (a, b) => a * b,
  },
  divide: {
    sign: "/",
    func: (a, b) => a / b,
  },
};

function updateScreen() {
  elScreenMain.innerText = mainScreen;
  elScreenHistory.innerText = historyScreen;
}

//
// NUMBERS
//
const numbers = document.querySelectorAll(".btn-num");
numbers.forEach((num) => num.addEventListener("click", assignNumber));

//
// ADD BUTTON
//

document
  .querySelector("#add")
  .addEventListener("click", () => assignOperator("add"));

//
// SUB BUTTON
//

document
  .querySelector("#substract")
  .addEventListener("click", () => assignOperator("sub"));

//
// MULTIPLY BUTTON
//

document
  .querySelector("#multiply")
  .addEventListener("click", () => assignOperator("multiply"));

//
// DIVIDE BUTTON
//

document
  .querySelector("#divide")
  .addEventListener("click", () => assignOperator("divide"));

//
// EQUAL BUTTON
//
document.querySelector("#equal").addEventListener("click", () => {
  if (!operator) return;
  if (shouldClearScreen) return restart();

  historyScreen = mainScreen + "=";

  mainScreen = operator.func(
    Number.parseFloat(firstValue),
    Number.parseFloat(secondValue)
  );

  shouldClearScreen = true;

  updateScreen();
});

//
// CANCEL BUTTON
//

document.querySelector("#cancel").addEventListener("click", restart);

function restart() {
  // Reset variables
  mainScreen = "";
  historyScreen = "";
  operator = undefined;
  isFirstValue = true;
  firstValue = "";
  secondValue = "";
  shouldClearScreen = false;

  // Reset DOM
  updateScreen();
}

//
// Utils Functions
//

function assignNumber(evt) {
  if (shouldClearScreen) return restart();

  let character = evt.target.innerText;

  if (isFirstValue) {
    firstValue = firstValue + character;
  } else {
    secondValue = secondValue + character;
  }

  mainScreen += character;
  updateScreen();
}

function assignOperator(op) {
  if (shouldClearScreen) return restart();
  if (operator || !firstValue) return;

  operator = operators[op];
  mainScreen += operator.sign;

  isFirstValue = false;
  shouldAddPoint = false;

  updateScreen();
}
