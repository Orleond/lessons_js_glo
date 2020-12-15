'use strict';

const rusString = `абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ,.!?-_"\' `,
    numbers = `0123456789`,
    start = document.getElementById(`start`),
    cancel = document.getElementById(`cancel`),
    checkbox = document.querySelector(`#deposit-check`),
    addIncItem = document.querySelectorAll(`.additional_income-item`),
    budgetDayValue = document.querySelector(`.result-budget_day input`),
    expensesMonthValue = document.querySelector(`.result-expenses_month input`),
    addIncomeValue = document.querySelector(`.result-additional_income input`),
    addExpValue = document.querySelector(`.result-additional_expenses input`),
    incomePeriodValue = document.querySelector(`.result-income_period input`),
    targetMonthValue = document.querySelector(`.result-target_month input`),
    salaryAmount = document.querySelector(`.salary-amount`),
    addExpItem = document.querySelector(`.additional_expenses-item`),
    targetAmount = document.querySelector(`.target-amount`),
    periodSelect = document.querySelector(`.period-select`),
    periodAmount = document.querySelector(`.period-amount`),
    budgetMonthValue = document.querySelector(`.result-budget_month input`);
let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll(`.expenses-items`),
    btnIncAdd = document.getElementsByTagName(`button`)[0],
    btnExpAdd = document.getElementsByTagName(`button`)[1];


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

class AppData {
    constructor() {
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
    }

    check() {
        if (salaryAmount.value !== ``) {
            start.removeAttribute(`disabled`);
        }
    }

    start() {
        if (!checkNum(salaryAmount.value)) {
            alert(`Неверно введен месячный доход!`);
            return;
        } else {
            this.budget = +salaryAmount.value;
        }
        if (salaryAmount.value === ``) {
            start.setAttribute(`disabled`, `true`);
            return;
        }
        const allInput = document.querySelectorAll(`.data input[type=text]`);
        allInput.forEach((item) => {
            item.setAttribute(`disabled`, `true`);
        });
        btnExpAdd.setAttribute(`disabled`, `true`);
        btnIncAdd.setAttribute(`disabled`, `true`);
        start.style.display = `none`;
        cancel.style.display = `block`;



        this.getExpInc();
        // this.getExpInс();
        this.getExpensesMonth();
        this.getAddExpEnc();
        this.getBudget();
        this.getInfoDeposit();
        this.getStatusIncome();
        this.showResult();
    }

    // Заполнение инпутов справа
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpValue.value = this.addExpenses.join(`, `);
        addIncomeValue.value = this.addIncome.join(`, `);
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener(`input`, () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    }

    // Дополнительный доход, обязательный расход
    getExpInc() {
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll(`.expenses-items`);

        const count = (item) => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (!checkString(itemTitle)) {
                alert('Неверный ввод наименования!');
                return;
            }
            if (!checkNum(itemAmount)) {
                alert('Неверный ввод суммы!');
                return;
            }

            if (checkString(itemTitle) && checkNum(itemAmount)) {
                this[startStr][itemTitle] = itemAmount;
            }
        };
        expensesItems.forEach(count);
        incomeItems.forEach(count);
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    // // Добавление блоков с обязательными расходами
    addExpIncBlock(item) {
        let btn = item.path[0].parentNode.className,
            it = `${btn}Items`;
        let items = document.querySelectorAll(`.${btn}-items`);
        let a = item.path[0];
        const cloneItem = items[0].cloneNode(true);
        items[0].parentNode.insertBefore(cloneItem, a);
        items = document.querySelectorAll(`.${btn}-items`);
        let title = items[items.length - 1].querySelector(`.${btn}-title`).value = ``,
            amount = items[items.length - 1].querySelector(`.${btn}-amount`).value = ``;

        if (items.length === 3) {
            a.style.display = `none`;
        }
    }

    // Заполнение полей с возможным доходом и возможными расходами
    getAddExpEnc() {

            const count = (item) => {
                let a;
                if (item.className) {
                    item = item.value;
                    a = 'addIncome';
                } else {
                    a = 'addExpenses';
                }
                item = item.trim();
                if (!checkString(item)) {
                    alert(`Неверный ввод наименования возможного дохода!`);
                    return;
                } else {
                    this[a].push(item);
                }
                console.log(a);
            };

            const addExpenses = addExpItem.value.split(`,`);
            addExpenses.forEach(count);
            addIncItem.forEach(count);
        }
        // Расходы за месяц
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    // Дневной бюджет и доход за месяц
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    // Желаемая сумма накопления (цель)
    getTargetMonth() {
        if (!checkNum(targetAmount.value)) {
            alert(`Неверно введена сумма желаемого накопления!`);
            return;
        } else {
            return targetAmount.value / this.budgetMonth;
        }
    }

    // Уровень дохода
    getStatusIncome() {
        if (this.budgetDay >= 50) {
            return (`Высокий уровень дохода`);
        } else if (this.budgetDay >= 30 && this.budgetDay < 50) {
            return (`Средний уровень дохода`);
        } else if (this.budgetDay >= 0 && this.budgetDay < 30) {
            return (`Низкий уровень дохода`);
        } else {
            return (`Что-то пошло не так`);
        }
    }

    // Информация о депозите
    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt(`Какой годовой процент?`, `12`);
            } while (isNaN(this.percentDeposit) || this.percentDeposit === `` || this.percentDeposit === null);
            do {
                this.moneyDeposit = prompt(`Какая сумма заложена?`, 2000);
            } while (isNaN(this.moneyDeposit) || this.moneyDeposit === `` ||
                this.moneyDeposit === ` ` || this.moneyDeposit === null);
        }
    }

    // Накопление за период
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    reset() {
        const inputTextData = document.querySelectorAll(`.data input[type=text`),
            resultInputAll = document.querySelectorAll(`.result input[type=text`);

        inputTextData.forEach(function(elem) {
            elem.value = ``;
            elem.removeAttribute(`disabled`);
            periodSelect.value = `0`;
            periodAmount.innerHTML = periodSelect.value;
        });
        resultInputAll.forEach(function(elem) {
            elem.value = ``;
        });

        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            btnIncAdd.style.display = `block`;
        }
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            btnExpAdd.style.display = `block`;
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

        cancel.style.display = `none`;
        start.style.display = `block`;
        btnExpAdd.removeAttribute(`disabled`);
        btnIncAdd.removeAttribute(`disabled`);
        checkbox.checked = false;
    }

    eventListeners() {
        const _this = this;
        start.addEventListener(`click`, _this.start.bind(_this));
        btnExpAdd.addEventListener(`click`, this.addExpIncBlock);
        btnIncAdd.addEventListener(`click`, this.addExpIncBlock);
        salaryAmount.addEventListener(`keyup`, _this.check);
        cancel.addEventListener(`click`, _this.reset.bind(_this));

        periodSelect.addEventListener(`input`, () => {
            periodAmount.innerHTML = periodSelect.value;
        });

        const addExp = [];
        for (let i = 0; i < _this.addExpenses.length; i++) {
            let element = _this.addExpenses[i].trim();
            element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
            addExp.push(element);
        }


    }
}

const appData = new AppData();
appData.eventListeners();