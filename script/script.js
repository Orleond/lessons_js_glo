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
        for (let i = 0; i < 2; i++) {
            let answer, answer2;
            do {
                answer = prompt('Введите обязательную статью расходов');
                answer2 = prompt('Во сколько это обойдется?');
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

console.log('Бюджет на день: ' + appData.budgetDay);
console.log(appData.getStatusIncome());