'use strict';

let money = +prompt('Ваш месячный доход?'),
    income = 'Инвестиции',
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

let expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?');

const getExpensesMonth = function(am1, am2) {
    return am1 + am2;
};

console.log('Расходы за месяц: ' + getExpensesMonth(amount1, amount2));

const getAccumulatedMonth = function(mon, am1, am2, gsm) {
    return mon - gsm(am1, am2);
}

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2, getExpensesMonth);

const getTargetMonth = function(mis, acc) {
    return Math.ceil(mis / acc);
};

console.log('Возможные расходы за месяц: ' + addExpenses.toLowerCase().split(', '));
console.log('Цель будет выполнена за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');

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