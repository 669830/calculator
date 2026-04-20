let currentValue = '0';
let previousValue = null;
let operator = null;
let newEntry = false;

function opSymbol(op) {
    return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || op;
}

function getDisplayText() {
    if (operator !== null) {
        const second = newEntry ? '' : ' ' + currentValue;
        return previousValue + ' ' + opSymbol(operator) + second;
    }
    return currentValue;
}

function updateDisplay() {
    document.getElementById('display').textContent = getDisplayText();
}

function inputDigit(digit) {
    if (currentValue === '0' || newEntry) {
        currentValue = digit;
        newEntry = false;
    } else {
        currentValue = currentValue + digit;
    }
    updateDisplay();
}

function inputDecimal() {
    if (newEntry) {
        currentValue = '0.';
        newEntry = false;
        updateDisplay();
        return;
    }
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
}

function inputPercent() {
    currentValue = (parseFloat(currentValue) / 100).toString();
    updateDisplay();
}

function deleteLast() {
    if (newEntry) return;
    if (currentValue.length <= 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
        currentValue = '0';
    } else {
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
}

function clearAll() {
    currentValue = '0';
    previousValue = null;
    operator = null;
    newEntry = false;
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null && !newEntry) {
        calculate();
    }
    previousValue = currentValue;
    operator = op;
    newEntry = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || previousValue === null) return;
    const a = parseFloat(previousValue);
    const b = parseFloat(currentValue);
    let result = 0;

    if (operator === '+') result = a + b;
    if (operator === '-') result = a - b;
    if (operator === '*') result = a * b;
    if (operator === '/') result = a / b;

    currentValue = parseFloat(result.toFixed(10)).toString();
    operator = null;
    previousValue = null;
    newEntry = true;

    updateDisplay();
}
