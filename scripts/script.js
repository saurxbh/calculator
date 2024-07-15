let firstOperand = '';
let operator = '';
let secondOperand = '';

function add(a, b) {
    return a + b; 
}

function subtract(a, b) {
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
    switch(operator) {
        case '+':
            return add(a, b);
        case '−':
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
    operator = '';
    secondOperand = '';
})

const signButton = document.querySelector("#sign");
signButton.addEventListener('click', () => {
    displayValue.textContent = -1 * Number(displayValue.textContent);
})

const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (displayValue.textContent === '0') displayValue.textContent = '';
        displayValue.textContent += button.value;
        clearButton.value = 'C';
    });
});

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
    if (displayValue.textContent.includes('.')) return;
    displayValue.textContent += '.';
})