'use strict';

let money,
    isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));
    },
    isString = function(n) {
        return (!isNumber(n.trim().charAt(0)) && n.trim().charAt(0) !== '');
    };

money *= 1;
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 2000,
    period: 6,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
            while (!isString(itemIncome)) {
                itemIncome = prompt('Введите корректно источник дополнительного заработка');
            }
            let cachIncome = prompt('Сколько в месяц зарабатываете на этом', 300);
            while (!isNumber(cachIncome)) {
                cachIncome = prompt('Введите корректно размер заработка');
            }
            appData.income[itemIncome] = cachIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        while (!isString(addExpenses)) {
            addExpenses = prompt('Введите корректно возможные расходы через запятую');
        }
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        for (let item in appData.addExpenses) {
            let a = appData.addExpenses[item].trim().charAt(0).toUpperCase();
            a += appData.addExpenses[item].trim().substr(1);
            appData.addExpenses[item] = a;
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let answer, answer2;
            do {
                answer = prompt('Введите обязательную статью расходов');
                while (!isString(answer)) {
                    answer = prompt('Введите корректно обязательную статью расходов');
                }
                answer2 = prompt('Во сколько это обойдется?');
                while (!isNumber(answer2)) {
                    answer2 = prompt('Введите корректно сумму обязательных расходов');
                }
            } while (!isNumber(answer2));
            appData.expenses[answer] = +answer2;
        }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        for (let item in appData.expenses) {
            appData.expensesMonth += appData.expenses[item];
        }
    },
    getBudget: function(mon, gem) {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(acc) {
        return Math.ceil(appData.mission / appData.getBudget());
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
    getInfoDeposit: function() {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', 10);
            while (!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt('Введите корректно годовой процент', 10);
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 500);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt('Введите корректно сумму депозита', 500);
            }
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();

console.log('Расходы за месяц: ' + appData.expensesMonth);
appData.getTargetMonth(appData.mission, appData.getBudget());

if (appData.targetMonth > 0) {
    console.log('Цель будет выполнена за ' + appData.getTargetMonth() + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя: ');
for (let item in appData) {
    console.log(appData[item]);
}

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

let printExpenses = '';
for (let item of appData.addExpenses) {
    printExpenses += item + ', ';
}
console.log(printExpenses.substr(0, printExpenses.length - 2));