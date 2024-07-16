let previousOperand = '';
let firstOperand = '';
let currentOperation = null;
let previousOperation = null;
let secondOperand = '';
let resetScreen = false;
let equation = '';
let result = 0;
let calculated = false;
let carry = 0;

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function add(a, b) {
    return a + b; 
}

function subtract(a, b) {
    console.log(a-b);
    return a - b; 
}

function multiply(a, b) {
    return a * b; 
}

function divide(a, b) {
    return a / b; 
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    console.log(operator);
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            console.log(`a, ${a}, b, ${b}`);
            console.log(`a-b, ${a-b}`);
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            return divide(a, b);
        default:
            return null; 
    }
}

const displayValue = document.querySelector('#display');

const clearButton = document.querySelector('#AC');
clearButton.addEventListener('click', () => {
    displayValue.textContent = '0';
    clearButton.value = 'AC';
    firstOperand = '';
    currentOperation = null;
    previousOperand = '';
    previousOperation = null;
    secondOperand = '';
    equation = '';
    carry = 0;
    result = 0;
    resetScreen = false;
    calculated = false; 
})

const signButton = document.querySelector("#sign");
signButton.addEventListener('click', () => {
    displayValue.textContent = -1 * Number(displayValue.textContent);
    resetScreen = false;
})

const percentageButton = document.querySelector('#percentage');
percentageButton.addEventListener('click', () => {
    displayValue.textContent = Number(displayValue.textContent) / 100;
    resetScreen = true;
})

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
    if (displayValue.textContent.includes('.')) return;
    displayValue.textContent += '.';
    resetScreen = false;
})
/*
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener('click', () => {
    displayValue.textContent = evaluate();
    resetScreen = true;
});*/


const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (displayValue.textContent === '0' || resetScreen) displayValue.textContent = '';
        displayValue.textContent += button.value;
        equation += button.value;
        clearButton.value = 'C';
        resetScreen = false;
        calculated = false;
        // Code to retrieve previous operation
        previousOperation = currentOperation;
    });
});

const functionButtons = document.querySelectorAll('.function');
functionButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (equation.length === 0) return; // check display
        else {
            currentOperation = button.value;
            //make sure the last selected operation is selected
            let lastChar = equation.charAt(equation.length - 1);
            if (lastChar === currentOperation) return;
            if ((lastChar === '+' && currentOperation === '-') || (lastChar === '-' && currentOperation === '+') || 
                (lastChar === '×' && currentOperation === '÷') || (lastChar === '÷' && currentOperation === '×')) return;
            if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
                equation = equation.slice(0, -1);
            }
            equation += currentOperation;

            //for when an operator is pressed for the very first time
            let arr = equation.split(currentOperation);
            if (arr.length === 2 && !isNaN(arr[0]) && currentOperation === '=') {
                displayValue.textContent = arr[0];
                clearButton.value = 'C';
                firstOperand = '';
                currentOperation = null;
                previousOperand = '';
                previousOperation = null;
                secondOperand = '';
                equation = displayValue.textContent;
                result = arr[0];
                resetScreen = true;
                return;
            }
            if (arr.length === 2 && !isNaN(arr[0]) && previousOperand === '') {
                previousOperand = displayValue.textContent;
                previousOperation = currentOperation;
                resetScreen = true;
                console.log(`previousOperand ${previousOperand}`);
                console.log(`equation ${equation}`);
                console.log(`previousOperation ${previousOperation}`);
                return;
            }
            console.log(`AFTERpreviousOperand ${previousOperand}`);
            console.log(`AFTERequation ${equation}`);
            console.log(`AFTERpreviousOperation ${previousOperation}`);

            //calculating first operation and BODMAS rules
            if ((currentOperation === '+' || currentOperation === '-') && (previousOperation === '+' || previousOperation === '-')) {
                currentOperation = previousOperation;
                if (!calculated) {
                    firstOperand = previousOperand;
                    previousOperand = evaluate(); //display value captured, earlier expression evaluated, could be anything
                    displayValue.textContent = previousOperand;
                    //carry = previousOperand;
                    calculated = true;
                } else {
                    firstOperand = carry;
                    previousOperand = evaluate(); //display value captured HAVE TO CHECK THIS
                    displayValue.textContent = previousOperand;
                    //carry = previousOperand;
                    calculated = true;
                }
                currentOperation = equation.charAt(equation.length - 1);
                //equation = previousOperand.concat(currentOperation);
                console.log(`equation, ${equation}`);

            } else if ((currentOperation === '×' || currentOperation === '÷') && (previousOperation === '+' || previousOperation === '-')) {
                console.log(`previousOperation,${previousOperation}`);
                console.log(`currentOperation,${currentOperation}`);
                currentOperation = previousOperation;
                if (!calculated) { // Display hasn't changed
                    carry = Number(previousOperand);
                    console.log(`carry, ${carry}`);
                    previousOperand = displayValue.textContent;
                    previousOperand = previousOperation === '+' ? previousOperand : -1 * Number(previousOperand);
                    calculated = true;
                } else { // Display has changed
                    carry = previousOperation === '+' ? carry - secondOperand: carry + secondOperand;
                    displayValue.textContent = secondOperand;
                    previousOperand = secondOperand;
                    previousOperand = previousOperation === '+' ? previousOperand : -1 * Number(previousOperand);
                    calculated = true;
                }
                currentOperation = equation.charAt(equation.length - 1);
                console.log(`equation, ${equation}`);
                console.log(`carry, ${carry}, previousOperand, ${previousOperand}`);

            } else if ((currentOperation === '+' || currentOperation === '-') && (previousOperation === '×' || previousOperation === '÷')) {
                currentOperation = previousOperation;
                if (!calculated) {
                    firstOperand = previousOperand;
                    console.log(`''''${carry}`);
                    previousOperand = carry + evaluate();
                    displayValue.textContent = previousOperand;
                    carry = 0;
                    calculated = true;
                } else {
                    firstOperand = previousOperand;
                    previousOperand = carry + evaluate();
                    displayValue.textContent = previousOperand;
                    carry = 0;
                    calculated = true;
                }
                currentOperation = equation.charAt(equation.length - 1);
                console.log(`equation, ${equation}`);

            } else if ((currentOperation === '×' || currentOperation === '÷') && (previousOperation === '×' || previousOperation === '÷')) {
                console.log(`previousOperation,${previousOperation}`);
                console.log(`currentOperation,${currentOperation}`);
                currentOperation = previousOperation;
                if (!calculated) {
                    firstOperand = previousOperand;
                    previousOperand = evaluate(); // display value captured, earlier expression evaluated only if it is product or division
                    displayValue.textContent = previousOperand;
                    calculated = true;
                } else {
                    let temp = previousOperation === '×' ? firstOperand * secondOperand : firstOperand / secondOperand;
                    carry = previousOperand - temp;
                    previousOperand -= carry;
                    displayValue.textContent = previousOperand;
                    calculated = true;
                }
                currentOperation = equation.charAt(equation.length - 1);
                console.log(`equation, ${equation}`);

            } else {
                    currentOperation = previousOperation;
                    console.log(`currentOperation ${currentOperation}`);
                    firstOperand = previousOperand;
                    console.log(`firstOperand ${firstOperand}`);
                    displayValue.textContent = carry + evaluate();
                    //console.log(displayValue.textContent);
                    previousOperand = '';
                    previousOperation = null;
                    firstOperand = '';
                    secondOperand = '';
                    currentOperation = null;
                    equation = '';
                    result = 0;
                    calculated = false;
                    carry = 0;
                }
                resetScreen = true;
            }          
        }
)})


function evaluate() {
    secondOperand = displayValue.textContent;
    if (secondOperand === '0' && currentOperation === '÷') {
        displayValue.textContent = 'Error';
        firstOperand = '';
        currentOperation = null;
        previousOperand = '';
        previousOperation = null;
        secondOperand = '';
        equation = '';
        result = 0;
        return 'Error';
    } else {
        result = operate(currentOperation, firstOperand, secondOperand);
        console.log(`result, ${result}`);
        resetScreen = true;
        return result;
    }
}