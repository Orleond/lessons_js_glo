'use strict';

const rusString = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ,.!?-_"\' ',
    numbers = '0123456789';

let start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    expensesTitle = document.querySelectorAll('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('[type="range"]'),
    periodAmount = document.querySelector('.period-amount');

// let isNumber = function(n) {
//         return !isNaN(parseFloat(n)) && isFinite(n);
//     },

//     isString = function(n) {
//         return (!isNumber(n.trim().charAt(0)) && n.trim().charAt(0) !== '');
//     };



let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    // deposit: false,
    // percentDeposit: 0,
    // moneyDeposit: 0,
    start: function() {
        if (!appData.checkNum(salaryAmount.value)) {
            alert('Неверно введен месячный доход!');
        } else {
            appData.budget = +salaryAmount.value;
        }

        appData.getIncome();
        appData.getAddIncome();
        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getBudget();
        appData.showResult();
    },
    checkString: function(item) {
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
    },
    checkNum: function(item) {
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
    },
    addExpensesBlock: function() {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        let expensesTitle = expensesItems[expensesItems.length - 1].querySelector('.expenses-title').value = '',
            expensionAmount = expensesItems[expensesItems.length - 1].querySelector('.expenses-amount').value = '';
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        let incomeTitle = incomeItems[incomeItems.length - 1].querySelector('.income-title').value = '',
            incomeAmount = incomeItems[incomeItems.length - 1].querySelector('.income-amount').value = '';
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if (!appData.checkString(itemExpenses)) {
                alert('Неверный ввод наименования обязательного расхода!');
                return;
            }
            if (!appData.checkNum(cashExpenses)) {
                alert('Неверно введена сумма обязательного расхода!');
                return;
            }
            if (appData.checkString(itemExpenses) & appData.checkNum(cashExpenses)) {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if (!appData.checkString(itemIncome)) {
                alert('Неверный ввод наименования дополнительного дохода!');
                return;
            }
            if (!appData.checkNum(cashIncome)) {
                alert('Неверно введена сумма дополнительного дохода!');
                return;
            }
            if (appData.checkString(itemIncome) && appData.checkNum(cashIncome)) {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (!appData.checkString(itemValue)) {
                alert('Неверный ввод наименования возможного дохода!');
                return;
            } else {
                appData.addIncome.push(itemValue);
            }
        });
    },

    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();

        periodSelect.addEventListener('input', appData.showResult);
    },
    getExpensesMonth: function() {
        for (let item in appData.expenses) {
            appData.expensesMonth += appData.expenses[item] * 1;
        }
    },
    getBudget: function() {
        appData.budgetMonth = (appData.budget + appData.incomeMonth - appData.expensesMonth) * 1;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        if (!appData.checkNum(targetAmount.value)) {
            alert('Неверно введена сумма желаемого накопления!');
            return;
        } else {
            return Math.ceil(targetAmount.value / appData.budgetMonth);
        }
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 40) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay < 40 && appData.budgetDay >= 20) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay < 20 && appData.budgetDay >= 0) {
            return ('У вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    },
    // getInfoDeposit: function() {
    //     if (appData.deposit) {
    //         appData.percentDeposit = prompt('Какой годовой процент?', 10);
    //         while (!isNumber(appData.percentDeposit)) {
    //             appData.percentDeposit = prompt('Введите корректно годовой процент', 10);
    //         }
    //         appData.moneyDeposit = prompt('Какая сумма заложена?', 500);
    //         while (!isNumber(appData.moneyDeposit)) {
    //             appData.moneyDeposit = prompt('Введите корректно сумму депозита', 500);
    //         }
    //     }
    // },
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    }
};


start.disabled = true;
salaryAmount.addEventListener('input', function() {
    if (salaryAmount.value !== '') {
        start.disabled = false;
    } else {
        start.disabled = true;
    }
});
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
    periodAmount.innerHTML = periodSelect.value;
});


// if (appData.targetMonth > 0) {
//     console.log('Цель будет выполнена за ' + appData.getTargetMonth() + ' месяцев');
// } else {
//     console.log('Цель не будет достигнута');
// }


// console.log('Наша программа включает в себя: ');
// for (let item in appData) {
//     console.log(appData[item]);
// }


// let printExpenses = '';
// for (let item of appData.addExpenses) {
//     printExpenses += item + ', ';
// }