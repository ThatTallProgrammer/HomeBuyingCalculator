const MONTHS_IN_YEAR = 12;

function updatePage() {
    if (allInputsHaveValues())
        updateCalculations();
}

function allInputsHaveValues() {
    inputs = $('#input-section input').toArray();
    totalInputs = inputs.length;

    return inputs.filter(input => {
        return isEmpty(input.value);
    }).length === totalInputs;
}

function isEmpty(string) {
    return !!string;
}

function formatUsd(number) {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(number);
}

function proportion(value)
{
    return value / 100;
}

function updateCalculations() {
    const monthlyIncome = parseFloat($('#monthly-income').val());
    const monthlyDebt = parseFloat($('#monthly-debt').val());
    const loanTerm = parseFloat($('#loan-period').val());
    const dtiRatio = proportion(
        parseFloat($('#dti-ratio').val())
    );
    const interestRate = proportion(
        parseFloat($('#interest-rate').val())
    );
    const propertyTaxRate = proportion(
        parseFloat($('#property-tax-rate').val())
    );

    const payment = calculatePayment(dtiRatio, monthlyIncome, monthlyDebt);
    const homePrice = calculateHomePrice(propertyTaxRate, interestRate, payment, loanTerm)
    const loanPrice = calculateLoanPrice(loanTerm, payment);
    const propertyTaxPayment = calculateMontlyPropertTaxPayment(propertyTaxRate, homePrice);

    $('#monthly-payment').val(formatUsd(payment));
    $('#home-price').val(formatUsd(homePrice));
    $('#loan-price').val(formatUsd(loanPrice));
    $('#property-tax-payment').val(formatUsd(propertyTaxPayment));
}

function calculatePayment(dtiRatio, monthlyIncome, monthlyDebt) {
    return dtiRatio * monthlyIncome - monthlyDebt;
}

function calculateLoanPrice(loanTerm, payment) {
    return loanTerm * payment * MONTHS_IN_YEAR;
}

function calculateMonthlyPaymentPropotion(interestRate, loanTerm) {
    const monthlyInterestRate = interestRate / MONTHS_IN_YEAR;
    const periods = loanTerm * MONTHS_IN_YEAR;

    return monthlyInterestRate * Math.pow(1 + monthlyInterestRate, periods) /
        (Math.pow(1 + monthlyInterestRate, periods) - 1);
}

function calculateHomePrice(propertyTaxRate, interestRate, payment, loanTerm) {
    const monthlyPropertyTaxRate = propertyTaxRate / MONTHS_IN_YEAR;
    const monthlyPaymentProportion = calculateMonthlyPaymentPropotion(interestRate, loanTerm);

    return payment / (monthlyPropertyTaxRate + monthlyPaymentProportion)
}

function calculateMontlyPropertTaxPayment(propertyTaxRate, homePrice) {
    const monthlyPropertyTaxRate = propertyTaxRate / MONTHS_IN_YEAR;

    return monthlyPropertyTaxRate * homePrice;
}