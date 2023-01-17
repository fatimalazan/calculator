let currentValue = '';
let prevValue = '';
let action = undefined;

const btn = document.querySelectorAll('.btn');
const operators = document.querySelectorAll('.btn-operator');
const plusminus = document.getElementById('plusminus');
const equals = document.getElementById('equalsBtn');
const clear = document.getElementById('reset');
const del = document.getElementById('delete');
const previous = document.getElementById('history');
const current = document.getElementById('display-input');

btn.forEach((button) => {
  button.addEventListener('click', (e) => {
    handleButton(e, 'textContext');
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    handleOperator(e, 'textContext');
  });
});

equals.addEventListener('click', () => {
  handleEqual();
});

del.addEventListener('click', (e) => {
  if (current.textContent.length) {
    deleteOne();
    currentValue = parseFloat(current.textContent);
  }
});

clear.addEventListener('click', () => {
  clearDisplay();
});

plusminus.addEventListener('click', (e) => {
  if (!isNaN(parseFloat(current.textContent))) {
    current.textContent = -current.textContent;
    currentValue = parseFloat(current.textContent);
  }
});

//keyboard support
const handleKeyboardInput = (e) => {
  if ((e.key >= 0 && e.key <= 9) || e.key == '.') {
    handleButton(e);
  }

  if (e.key == '=' || e.key == 'Enter') {
    handleEqual();
  }

  if (e.key == 'Backspace') deleteOne();

  if (e.key == 'Escape') clearDisplay();

  if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
    handleOperator(e);
  }
};

window.addEventListener('keydown', handleKeyboardInput);

const operation = (number, action, number2) => {
  switch (action) {
    case '+':
      return number + number2;
    case '−':
      return number - number2;
    case '×':
      return number * number2;
    case '÷':
      if (number2 == 0) return (current.textContent = "Can't divide by 0!");
      else return number / number2;
    default:
      return '';
  }
};

const handleButton = (e, propertyName) => {
  let property;
  if (propertyName == 'textContext') {
    property = e.target.textContent;
  } else {
    property = e.key;
  }
  if (current.textContent.includes('C')) clearDisplay();
  if (property == '.' && current.textContent.includes('.')) return;
  if (property == '.' && current.textContent == '') current.textContent = '0';
  if (property == '.' && current.textContent == '-') current.textContent = '-0';
  if (property == '0' && current.textContent.charAt(0) == '0' && current.textContent.charAt(1) != '.') return;
  if (current.textContent == '0' && property != '.') current.textContent = property;
  else current.textContent += property;

  currentValue = parseFloat(current.textContent);
};

const handleOperator = (e, propertyName) => {
  let property;
  if (propertyName == 'textContext') {
    property = e.target.textContent;
  } else {
    property = e.key;
  }

  if (current.textContent.includes('C')) clearDisplay();

  if (current.textContent == '' && previous.textContent != '') {
    previous.textContent = `${previous.textContent.slice(0, -1)} ${property}`;
    action = property;
  }

  if (isNaN(parseFloat(current.textContent))) return;

  if (previous.textContent == '') {
    prevValue = parseFloat(current.textContent);
    action = property;
    previous.textContent = `${prevValue} ${property}`;
  } else {
    if (!isNaN(parseFloat(previous.textContent.slice(0, -1)))) {
      prevValue = parseFloat(previous.textContent.slice(0, -1));
      previous.textContent = `${operation(prevValue, action, currentValue)} ${property}`;
      action = e.target.textContent;
    } else clearDisplay();
  }

  current.textContent = '';
};

const handleEqual = () => {
  if (!isNaN(parseFloat(current.textContent)) && !isNaN(parseFloat(previous.textContent.slice(0, -1)))) {
    prevValue = parseFloat(previous.textContent.slice(0, -1));
    currentValue = parseFloat(current.textContent);
    previous.textContent = '';
    current.textContent = `${operation(prevValue, action, currentValue)}`;
  }
};

const clearDisplay = () => {
  current.textContent = '';
  previous.textContent = '';
  currentValue = '';
  prevValue = '';
  action = undefined;
};

const deleteOne = () => {
  current.textContent = current.textContent.slice(0, -1);
};
