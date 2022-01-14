
const operators = ["+","-","*","÷","/"];
const operands = ["1","2","3","4","5","6","7","8","9","0","."];

const isOperator = a => {
    return operators.includes(a);  
}
const isOperand = a => {
    return operands.includes(a);  
}

const containsOperator = () => {
    for (let i=0; i < display.textContent.length; i++){
        if(isOperator(display.textContent.charAt(i))){
            return true;
        }
    }
};

const getOperatorLocation = () => {
    for (let i=0; i < display.textContent.length; i++){
        if(isOperator(display.textContent.charAt(i))){
            return i;
        }
    }
};

const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");

let operator = "";
let firstOperand = "";
let secondOperand = "";
let result = "";

window.addEventListener('keydown', function(e){
    console.log(e.key);
    const button = document.querySelector(`button[id='${e.key}']`);
    button.click();
});

buttons.forEach(button => button.addEventListener("click", (e) => {
    //if it's a decimal, check that there isn't already a decimal, break if there is
    switch (button.className){
        case "button operand decimal":
            //if there's an operator in the display, check whether there's a period after the operator or not
            if(containsOperator(display.textContent)){
                let afterOperator = display.textContent.slice(getOperatorLocation()+1)
                if (afterOperator.includes(".")){
                    break;
                }
                else {
                    if (display.textContent == result && result != ""){
                        clearScreen();
                    }
                    display.textContent += button.textContent;
                    
                    break;
                }
            }

            //get the text after the operator
            if (display.textContent.includes(".")){
                break;
            }  
            else {
                if (display.textContent == result && result != ""){
                    clearScreen();
                }
                display.textContent += button.textContent;
                
                break;
            }
        
        case "button operand":
            //if the result is displayed on the screen, clear it
            if (display.textContent == result && result != ""){
                clearScreen();
            }
            display.textContent += button.textContent;
            
            break;
            
        case "button operator":
            

            //if the display is empty, don't do anything
            //check whether the display already contains an operator
            let operatorCheck = false;
            for (let i = 0; i < display.textContent.length; i++){
                if (isOperator(display.textContent[i])){
                    operator = display.textContent[i];
                    operatorCheck = true;
                }
            }
            //if the display does not already contain an operator, add it to the end of display and set the operator value to the button content
            if (!operatorCheck){
                operator = button.textContent;
                //if the final value on display is already an operator, replace it
                if (isOperator(display.textContent[display.textContent.length-1])){
                    display.textContent = display.textContent.slice(0,display.textContent.length-1) + operator;
                }
                //else put it on the end
                else {
                    display.textContent += operator;
                }
            }
            //if it already contains an operator, call the operate function against the stuff already there and add the result to the display with the new operator at the end
            else{
                let newOperator = button.textContent;
                //if the final character already an operator, call operate against the firstOperand twice 
                if (isOperator(display.textContent[display.textContent.length-1])){
                    firstOperand = display.textContent.slice(0, display.textContent.indexOf(operator));
                    result = operate(operator,firstOperand,firstOperand);
                    display.textContent = result + newOperator;
                }
                //if the final character is not an operator, call the operator against the function and display the result with the new operator
                else {
                    //find everything before the operator for firstOperand
                    firstOperand = display.textContent.slice(0, display.textContent.indexOf(operator));
                    //find everything after the operator for secondOperand
                    secondOperand = display.textContent.slice(display.textContent.indexOf(operator)+1);
                    result = operate(operator, firstOperand, secondOperand);
                    display.textContent = result + newOperator;
                }
            }
            
            break;
        case "button equals":
            //if the final value on display is an operator, call the operate function against the first values (e.g. 1+ = will calculate 1+1)
            if (isOperator(display.textContent[display.textContent.length-1])){
                operator = display.textContent[display.textContent.length-1];
                firstOperand = display.textContent.slice(0, display.textContent.indexOf(operator));
                result = operate(operator,firstOperand,firstOperand);
                display.textContent = result;
            }
            else {
                //operator should be what's on the screen
                let operatorCheck = false;
                for (let i = 0; i < display.textContent.length; i++){
                    if (isOperator(display.textContent[i])){
                        operator = display.textContent[i];
                        operatorCheck = true;
                    }
                }
                if (operatorCheck === true){
                    //find everything before the operator for firstOperand
                    firstOperand = display.textContent.slice(0, display.textContent.indexOf(operator));
                    //find everything after the operator for secondOperand
                    secondOperand = display.textContent.slice(display.textContent.indexOf(operator)+1);
                    result = operate(operator, firstOperand, secondOperand);
                    display.textContent = result;
                }
                else {break;}
            }
            break;
        case "button clear":
            clearScreen();
            break; 
        case "button backspace":
            display.textContent = display.textContent.slice(0,display.textContent.length-1);
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
    let result;
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    switch (operator){
        case "+":
            result = firstOperand + secondOperand;
            break;
        case "-":
            result = firstOperand - secondOperand;
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
                    result = firstOperand / secondOperand;
                }
            break; 
    }
    return Number((result).toFixed(10))
}