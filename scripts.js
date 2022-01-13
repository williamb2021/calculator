
const operators = ["+","-","*","÷"];
const operands = ["1","2","3","4","5","6","7","8","9","0","."];

const isOperator = a => {
    return operators.includes(a);  
}
const isOperand = a => {
    return operands.includes(a);  
}

const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");

let operator = "";
let firstOperand = "";
let secondOperand = "";
let result = "";
buttons.forEach(button => button.addEventListener("click", (e) => {
    switch (button.className){
        case "button operand":
            //if the result is displayed on the screen, clear it
            if (display.textContent == result && result != ""){
                clearScreen();
            }
            display.textContent += button.textContent;
            
            break;
            
        case "button operator":
            //set the operator to the button that was called
            operator = button.textContent;
            //check whether the display already contains an operator
            let operatorCheck = false;
            for (let i = 0; i < display.textContent.length; i++){
                if (isOperator(display.textContent[i])){
                    operatorCheck = true;
                }
            }
            //if the display does not already contain an operator, add it to the end of display
            if (!operatorCheck){
                
                //if the final value on display is an operator, replace it
                if (isOperator(display.textContent[display.textContent.length-1])){
                    display.textContent = display.textContent.slice(0,display.textContent.length-1) + operator;
                }
                //else put it on the end
                else {
                    display.textContent += operator;
                }
            }
            //if it already contains an operator, call the operate function, add the result to the display with the new operator at the end
            else{
                if (isOperator(display.textContent[display.textContent.length-1])){
                    firstOperand = display.textContent.slice(0, display.textContent.indexOf(operator));
                    result = operate(operator,firstOperand,firstOperand);
                    display.textContent = result;
                }
                else {
                    //find everything before the operator for firstOperand
                    firstOperand = display.textContent.slice(0, display.textContent.indexOf(operator));
                    //find everything after the operator for secondOperand
                    secondOperand = display.textContent.slice(display.textContent.indexOf(operator)+1);
                    result = operate(operator, firstOperand, secondOperand);
                    display.textContent = result + operator;
                }
            }
            
            break;
        case "button equals":
            //if the final value on display is an operator, call the operate function against the first values (e.g. 1+ = will calculate 1+1)
            if (isOperator(display.textContent[display.textContent.length-1])){
                firstOperand = display.textContent.slice(0, display.textContent.indexOf(operator));
                result = operate(operator,firstOperand,firstOperand);
                display.textContent = result;
            }
            else {
                //find everything before the operator for firstOperand
                firstOperand = display.textContent.slice(0, display.textContent.indexOf(operator));
                //find everything after the operator for secondOperand
                secondOperand = display.textContent.slice(display.textContent.indexOf(operator)+1);
                result = operate(operator, firstOperand, secondOperand);
                display.textContent = result;
            }
            break;
        case "button clear":
            clearScreen();
            break;  
    }

}));



//todo: clear screen should also wipe all variables
const clearScreen = () => {
    display.textContent = "";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    result = "";
};



const operate = (operator, firstOperand, secondOperand) => {
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    switch (operator){
        case "+":
            return firstOperand + secondOperand;
            break;
        case "-":
            return firstOperand - secondOperand;
            break;
        case "*":
            return firstOperand * secondOperand;
            break;
        case "÷":
            if (secondOperand === 0){
                return "CRASH AHHH!"
            }
            else 
                {
                    return firstOperand / secondOperand;
                }
            break; 
    }
}