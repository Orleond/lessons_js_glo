'use strict';

const rusString = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ,.!?-_"\' ',
    numbers = '0123456789';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnIncAdd = document.getElementsByTagName('button')[0],
    btnExpAdd = document.getElementsByTagName('button')[1],
    checkbox = document.querySelector('#deposit-check'),
    addIncItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.querySelector('.result-budget_day input'),
    expensesMonthValue = document.querySelector('.result-expenses_month input'),
    addIncomeValue = document.querySelector('.result-additional_income input'),
    addExpValue = document.querySelector('.result-additional_expenses input'),
    incomePeriodValue = document.querySelector('.result-income_period input'),
    targetMonthValue = document.querySelector('.result-target_month input'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.result-budget_month input'),
    incomeItems = document.querySelectorAll('.income-items');


// Проверка на число
function checkNum(item) {
    let a = 0;
    for (let i = 0; i < item.length; i++) {
        for (let n = 0; n < numbers.length; n++) {
            if (item[i] === numbers[n]) {
                a++;
            }
        }
    }
    if (a !== item.length) {
        return false;
    } else {
        return true;
    }
}

// Проверка на строку
function checkString(item) {
    let a = 0;
    for (let i = 0; i < item.length; i++) {
        for (let n = 0; n < rusString.length; n++) {
            if (item[i] === rusString[n]) {
                a++;
            }
        }
    }
    if (a !== item.length) {
        return false;
    } else {
        return true;
    }
}

const AppData = function() {

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];

};

AppData.prototype.check = function() {
    if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function() {
    if (!checkNum(salaryAmount.value)) {
        alert('Неверно введен месячный доход!');
        return;
    } else {
        this.budget = +salaryAmount.value;
    }
    if (salaryAmount.value === '') {
        start.setAttribute('disabled', 'true');
        return;
    }
    let allInput = document.querySelectorAll('.data input[type=text]');
    allInput.forEach(function(item) {
        item.setAttribute('disabled', 'true');
    });
    btnExpAdd.setAttribute('disabled', 'true');
    btnIncAdd.setAttribute('disabled', 'true');
    start.style.display = 'none';
    cancel.style.display = 'block';



    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome();
    this.showResult();
};

// Заполнение инпутов справа
AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function() {
        incomePeriodValue.value = _this.calcPeriod();
    });
};

// Добавление блоков с обязательными расходами
AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    let expensesTitle = expensesItems[expensesItems.length - 1].querySelector('.expenses-title').value = '',
        expensionAmount = expensesItems[expensesItems.length - 1].querySelector('.expenses-amount').value = '';

    if (expensesItems.length === 3) {
        btnExpAdd.style.display = 'none';
    }
};

// Обязательный расход
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (!checkString(itemExpenses)) {
            alert('Неверный ввод наименования обязательного расхода!');
            return;
        }
        if (!checkNum(cashExpenses)) {
            alert('Неверно введена сумма обязательного расхода!');
            return;
        }
        if (checkString(itemExpenses) && checkNum(cashExpenses)) {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

// Добавление блоков с дополнительными доходами
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
    incomeItems = document.querySelectorAll('.income-items');
    let incomeTitle = incomeItems[incomeItems.length - 1].querySelector('.income-title').value = '',
        incomeAmount = incomeItems[incomeItems.length - 1].querySelector('.income-amount').value = '';

    if (incomeItems.length === 3) {
        btnIncAdd.style.display = 'none';
    }
};

// Дополнительный доход
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (!checkString(itemIncome)) {
            alert('Неверный ввод наименования дополнительного дохода!');
            return;
        }
        if (!checkNum(cashIncome)) {
            alert('Неверно введена сумма дополнительного дохода!');
            return;
        }

        if (checkString(itemIncome) && checkNum(cashIncome)) {
            _this.income[itemIncome] = cashIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

// Перечисление возможных расходов
AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = addExpItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

// Заполнение полей с возможным доходом
AppData.prototype.getAddIncome = function() {
    const _this = this;
    addIncItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (!checkString(itemValue)) {
            alert('Неверный ввод наименования возможного дохода!');
            return;
        } else {
            _this.addIncome.push(itemValue);
        }
    });
};

// Расходы за месяц
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

// Дневной бюджет и доход за месяц
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

// Желаемая сумма накопления (цель)
AppData.prototype.getTargetMonth = function() {
    if (!checkNum(targetAmount.value)) {
        alert('Неверно введена сумма желаемого накопления!');
        return;
    } else {
        return targetAmount.value / this.budgetMonth;
    }
};

// Уровень дохода
AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 50) {
        return ('Высокий уровень дохода');
    } else if (this.budgetDay >= 30 && this.budgetDay < 50) {
        return ('Средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 30) {
        return ('Низкий уровень дохода');
    } else {
        return ('Что-то пошло не так');
    }
};

// Информация о депозите
AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?', '12');
        } while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
        do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 2000);
        } while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' ||
            this.moneyDeposit === ' ' || this.moneyDeposit === null);
    }
};

// Накопление за период
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function() {
    let inputTextData = document.querySelectorAll('.data input[type=text'),
        resultInputAll = document.querySelectorAll('.result input[type=text');

    inputTextData.forEach(function(elem) {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach(function(elem) {
        elem.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        btnIncAdd.style.display = 'block';
    }
    for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        btnExpAdd.style.display = 'block';
    }

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];

    cancel.style.display = 'none';
    start.style.display = 'block';
    btnExpAdd.removeAttribute('disabled');
    btnIncAdd.removeAttribute('disabled');
    checkbox.checked = false;
};





AppData.prototype.eventListeners = function() {
    const _this = this;
    start.addEventListener('click', _this.start.bind(_this));
    btnExpAdd.addEventListener('click', _this.addExpensesBlock);
    btnIncAdd.addEventListener('click', _this.addIncomeBlock);
    salaryAmount.addEventListener('keyup', _this.check);
    cancel.addEventListener('click', _this.reset.bind(_this));

    periodSelect.addEventListener('input', function() {
        periodAmount.innerHTML = periodSelect.value;
    });

    let addExp = [];
    for (let i = 0; i < _this.addExpenses.length; i++) {
        let element = _this.addExpenses[i].trim();
        element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
        addExp.push(element);
    }


};


const appData = new AppData();
appData.eventListeners();