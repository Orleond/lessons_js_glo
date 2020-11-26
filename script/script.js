'use strict';

let money = prompt('Ваш месячный доход?');
let income = 'Инвестиции';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 6;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');
let budgetMonth = money - amount1 - amount2;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет выполнена за ' + Math.ceil(mission / budgetMonth) + ' месяцев');

let budgetDay = Math.floor(budgetMonth / 30);

console.log('Бюджет на день: ' + budgetDay);

if (budgetDay >= 40) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay < 40 && budgetDay >= 20) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 20 && budgetDay >= 0) {
    console.log('У вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что-то пошло не так');
}