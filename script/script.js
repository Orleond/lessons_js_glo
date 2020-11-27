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

let income = 'Инвестиции',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6;



let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

const getExpensesMonth = function() {

    let sum = 0,
        test;
    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов');

        do {
            test = prompt('Во сколько это обойдется?');
        } while (!isNumber(test));
        sum += +test;

    }

    return sum * 1;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

const getAccumulatedMonth = function(mon, gem) {
    return mon - gem;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

const getTargetMonth = function(mis, acc) {
    return Math.ceil(mis / acc);
};
let targetMonth = getTargetMonth(mission, accumulatedMonth);
console.log('Возможные расходы за месяц: ' + addExpenses.toLowerCase().split(','));

if (targetMonth > 0) {
    console.log('Цель будет выполнена за ' + targetMonth + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

let budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Бюджет на день: ' + budgetDay);

let getStatusIncome = function() {
    if (budgetDay >= 40) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay < 40 && budgetDay >= 20) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay < 20 && budgetDay >= 0) {
        return ('У вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
};

console.log(getStatusIncome());