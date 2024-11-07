import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let loader = document.getElementById('loader');

window.appendToDisplay = (value) => {
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    try {
        loader.style.display = 'block';
        const expression = display.value;
        const [operand1, operator, operand2] = expression.match(/(-?\d+\.?\d*)([\+\-\*\/])(-?\d+\.?\d*)/).slice(1);
        
        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(operand1), parseFloat(operand2));
                break;
            case '-':
                result = await backend.subtract(parseFloat(operand1), parseFloat(operand2));
                break;
            case '*':
                result = await backend.multiply(parseFloat(operand1), parseFloat(operand2));
                break;
            case '/':
                result = await backend.divide(parseFloat(operand1), parseFloat(operand2));
                break;
        }
        
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    } finally {
        loader.style.display = 'none';
    }
};
