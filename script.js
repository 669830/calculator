let currentValue = 0;

function inputDigit(digit){
    if(currentValue === '0'){
        currentValue = digit;
    } else {
        currentValue = currentValue + digit;
    }

    document.getElementById('display').textContent = currentValue;
}