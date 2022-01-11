const operate = (operator, a, b) => {
    switch (operator){
        case 'add':
            return a+b;
            break;
        case 'subtract':
            return a-b;
            break;
        case 'multiply':
            return a*b;
            break;
        case 'divide':
            return a/b;
            break;
        
    }
}

const inputButtons = document.querySelectorAll(".input");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");

inputButtons.forEach(inputButton => inputButton.addEventListener("click", (e) => {
    display.textContent += inputButton.textContent
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", (e) => {
    let operator = operatorButton.textContent;
    clearScreen();
}));

//todo: clear screen should also wipe all variables
const clearScreen = () => display.textContent = "";

clearButton.addEventListener("click", () => clearScreen());

//need to store values in a/b to call operate, then store result and use it as the next "a?"
//clicking the operator multiple times should trigger the calculation (without hitting =)
