const inputNames = ['kpu_input', 'kku_input', 'ppu_input', 'kmm_input', 'lbind_input', 'lbing_input', 'pm_input'];

const countBtn = document.getElementById('count-btn');
countBtn.addEventListener('click', countUtbkAverageScore);

function countUtbkAverageScore() {
    const inputValues = getInputValues(inputNames);
    const method = document.querySelector('input[name=method]:checked').value;

    let result = 0;
    if (method == 'first') {
        result = firtsMethod(inputValues);
    } else if (method == 'second') {
        result = secondMethod(inputValues);
    }

    setResult(result);
}

function firtsMethod(inputValues) {
    const result = calculateAverage([
        inputValues.kpu_input, 
        inputValues.kku_input, 
        inputValues.ppu_input, 
        inputValues.kmm_input,
        inputValues.lbind_input, 
        inputValues.lbing_input,
        inputValues.pm_input
    ]);

    return roundToTwo(result);
}

function secondMethod(inputValues) {
    const tpsAverage = calculateAverage([
        inputValues.kpu_input,
        inputValues.kku_input,
        inputValues.ppu_input,
        inputValues.kmm_input
    ]);

    const literacyAverage = calculateAverage([
        inputValues.lbind_input,
        inputValues.lbing_input,
    ]);

    const result = calculateAverage([
        tpsAverage,
        literacyAverage,
        inputValues.pm_input
    ]);

    return roundToTwo(result);
}

function getInputValues(names) {
    let values = {};
    names.forEach(name => {
        const value = document.querySelector(`input[name=${name}]`).value || 0;
        values[name] = parseInt(value);
    });
    return values;
}

function calculateAverage(grades) {
    let sum = 0;
    grades.forEach(grade => {
        sum += grade;
    });
    return sum / grades.length;
}

function setResult(value) {
    const result = document.getElementById('result');
    result.innerHTML = value;
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

$(document).ready(function() {
    hitCounterApi();
});

function hitCounterApi() {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/counter?id=asdn8823jjas&hit=true',
        headers: { 'X-Api-Key': 'iPTYWm3teu+VtIp8w0YyNA==3ycdOWOsF1vM3sCU'},
        contentType: 'application/json',
        success: function(result) {
            setVisitorCounter(result.value);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function setVisitorCounter(value) {
    const counter = document.getElementById('visitor-counter');
    counter.innerHTML = value;
}

