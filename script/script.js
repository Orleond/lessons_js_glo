'use strict';

let money;
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

money *= 1;

start();


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 2000,
    period: 6,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        let sum = 0,
            test, expenses = [];
        for (let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов');
            do {
                test = prompt('Во сколько это обойдется?');
            } while (!isNumber(test));
            sum += +test;

        }

        return sum * 1;
    },
    getAccumulatedMonth: function(mon, gem) {
        return mon - gem;
    },
    getTargetMonth: function(mis, acc) {
        return Math.ceil(mis / acc);
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
    }
};

let expensesAmount = appData.getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

let accumulatedMonth = appData.getAccumulatedMonth(appData.budget, expensesAmount);
let targetMonth = appData.getTargetMonth(appData.mission, accumulatedMonth);

if (targetMonth > 0) {
    console.log('Цель будет выполнена за ' + targetMonth + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

appData.budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Бюджет на день: ' + appData.budgetDay);



console.log(appData.getStatusIncome());