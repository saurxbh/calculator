let previousOperand = '';
let firstOperand = '';
let currentOperation = null;
let previousOperation = null;
let secondOperand = '';
let resetScreen = false;
let equation = '';
let result = 0;

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
    result = 0;
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
                if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') equation = equation.slice(0, -1);
                equation += currentOperation;

                //for when an operator is pressed for the very first time
                let arr = equation.split(currentOperation);
                if (arr.length === 2 && !isNaN(arr[0]) && currentOperation === '=') {
                    displayValue.textContent = '0';
                    clearButton.value = 'AC';
                    firstOperand = '';
                    currentOperation = null;
                    previousOperand = '';
                    previousOperation = null;
                    secondOperand = '';
                    equation = '';
                    result = 0;
                }
                if (arr.length === 2 && !isNaN(arr[0])) {
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
                if (currentOperation === '+' || currentOperation === '-') { ////IF WORKING CORRECTLY
                    currentOperation = previousOperation;
                    firstOperand = previousOperand;
                    previousOperand = evaluate(); //store value, earlier + or - gets solved at this step
                    displayValue.textContent = previousOperand;

                    currentOperation = equation.charAt(equation.length - 1);
                    equation = String(previousOperand).concat(currentOperation);
                    previousOperation = currentOperation;
                } else if ((currentOperation === '×' || currentOperation === '÷') && (previousOperation === '×' || previousOperation === '÷')) {
                    currentOperation = previousOperation;
                    firstOperand = previousOperand;
                    previousOperand = evaluate()
                    displayValue.textContent = previousOperand;
                    currentOperation = equation.charAt(equation.length - 1);
                    equation = String(previousOperand).concat(currentOperation);
                    previousOperation = currentOperation;
                } else if ((currentOperation === '×' || currentOperation === '÷') && (previousOperation === '+' || previousOperation === '-')) {
                    let arr = equation.split(previousOperation);
                    previousOperand = arr[0];
                    firstOperand = arr[arr.length - 1].split(currentOperation)[0];
                    console.log(`${firstOperand}, ${currentOperation},`);
                    let temp = evaluate();
                    firstOperand = previousOperand;
                    console.log(`${firstOperand}, ${previousOperation}, ${temp}`);
                    previousOperand = operate(previousOperation, firstOperand, temp);
                    displayValue.textContent = previousOperand;
                    equation = String(previousOperand).concat(currentOperation);
                    previousOperation = currentOperation;
                } else {
                    currentOperation = previousOperation;
                    //console.log(`currentOperation ${currentOperation}`);
                    firstOperand = previousOperand;
                    //console.log(`firstOperand ${firstOperand}`);
                    displayValue.textContent = evaluate();
                    //console.log(displayValue.textContent);
                    previousOperand = '';
                    previousOperation = null;
                    firstOperand = '';
                    secondOperand = '';
                    currentOperation = '';
                    equation = '';
                    result = 0;
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