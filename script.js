document.addEventListener('DOMContentLoaded', () => { // Чекає на завантаження HTML-документа
  const calculator = { // Об'єкт, який зберігає стан калькулятора
    displayValue: '0', // Початкове значення дисплея калькулятора
    firstOperand: null, // Зберігає перший операнд для обчислень
    waitingForSecondOperand: false, // Вказує, чи очікується введення другого операнду
    operator: null, // Зберігає оператор, який використовується в обчисленнях
  };

  function updateDisplay() { // Оновлює значення дисплея калькулятора
    const display = document.querySelector('.calculator-screen'); // Знаходить елемент дисплея
    display.value = calculator.displayValue; // Встановлює значення дисплея калькулятора
  }

  function inputDigit(digit) { // Обробляє введення цифри
    // digit: символ цифри, який користувач ввів (рядок)
    const { displayValue, waitingForSecondOperand } = calculator; // Отримує поточні значення дисплея та прапора очікування другого операнду

    if (waitingForSecondOperand === true) { // Якщо очікується введення другого операнду
      calculator.displayValue = digit; // Встановлює значення дисплея як введену цифру
      calculator.waitingForSecondOperand = false; // Скидає прапор очікування другого операнду
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit; // Додає введену цифру до поточного значення дисплея
    }

    console.log(calculator); // Виводить поточний стан калькулятора у консоль
  }

  function inputDecimal(dot) { // Обробляє введення десяткової крапки
    // dot: символ десяткової крапки (рядок)
    if (calculator.waitingForSecondOperand === true) return; // Якщо очікується введення другого операнду, не додає крапку

    if (!calculator.displayValue.includes(dot)) { // Якщо у дисплеї ще немає крапки
      calculator.displayValue += dot; // Додає крапку до значення дисплея
    }
  }

  function handleOperator(nextOperator) { // Обробляє введення оператора
    // nextOperator: символ оператора, який користувач ввів (рядок)
    const { firstOperand, displayValue, operator } = calculator; // Отримує поточні значення першого операнду, дисплея та оператора
    const inputValue = parseFloat(displayValue); // Перетворює значення дисплея у число

    if (operator && calculator.waitingForSecondOperand) { // Якщо вже є оператор і очікується другий операнд
      calculator.operator = nextOperator; // Оновлює оператор
      return; // Виходить з функції
    }

    if (firstOperand == null) { // Якщо перший операнд відсутній
      calculator.firstOperand = inputValue; // Встановлює перший операнд як поточне значення дисплея
    } else if (operator) { // Якщо є оператор
      const currentValue = firstOperand || 0; // Встановлює поточне значення як перший операнд або 0
      const result = performCalculation[operator](currentValue, inputValue); // Виконує обчислення з використанням оператора

      calculator.displayValue = String(result); // Встановлює результат обчислень як значення дисплея
      calculator.firstOperand = result; // Встановлює результат як перший операнд
    }

    calculator.waitingForSecondOperand = true; // Встановлює прапор очікування другого операнду
    calculator.operator = nextOperator; // Оновлює оператор

    console.log(calculator); // Виводить поточний стан калькулятора у консоль
  }

  const performCalculation = { // Об'єкт із методами для виконання обчислень
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand, // Метод для ділення
    // firstOperand: перший операнд (число)
    // secondOperand: другий операнд (число)

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand, // Метод для множення
    // firstOperand: перший операнд (число)
    // secondOperand: другий операнд (число)

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand, // Метод для додавання
    // firstOperand: перший операнд (число)
    // secondOperand: другий операнд (число)

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand, // Метод для віднімання
    // firstOperand: перший операнд (число)
    // secondOperand: другий операнд (число)

    '=': (firstOperand, secondOperand) => secondOperand // Повертає другий операнд як результат
    // firstOperand: перший операнд (число)
    // secondOperand: другий операнд (число)
  };

  function resetCalculator() { // Скидає стан калькулятора до початкового
    calculator.displayValue = '0'; // Скидає значення дисплея
    calculator.firstOperand = null; // Очищає перший операнд
    calculator.waitingForSecondOperand = false; // Скидає прапор очікування другого операнду
    calculator.operator = null; // Очищає оператор
    console.log(calculator); // Виводить поточний стан калькулятора у консоль
  }

  const keys = document.querySelector('.calculator-keys'); // Знаходить елемент із клавішами  отримувати перший елемент, який відповідає заданому селектору. 
  keys.addEventListener('click', (event) => { // Додає обробник подій для кліків по клавішам
    // event: об'єкт події, що містить інформацію про подію
    const { target } = event; // Отримує елемент, на який натиснули
    const { value } = target; // Отримує значення натиснутої клавіші

    if (!target.matches('button')) { // Якщо натиснутий елемент не є кнопкою
      return; // Виходить з функції
    }

    switch (value) { // Обробляє різні значення натиснутих клавіш
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value); // Обробляє оператори
        break;
      case '.':
        inputDecimal(value); // Обробляє введення десяткової крапки
        break;
      case 'all-clear':
        resetCalculator(); // Скидає калькулятор
        break;
      default:
        if (Number.isInteger(parseFloat(value))) { // Якщо натиснута клавіша є числом
          inputDigit(value); // Обробляє введення цифри
        }
    }

    updateDisplay(); // Оновлює дисплей після кожної операції
  });

  updateDisplay(); // Оновлює дисплей при завантаженні сторінки
});
