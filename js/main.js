const undisplayedElementIfRejected = [
    'birthDateContainer',
    'collegeNameContainer',
    'departementContainer',
    'majorContainer'
]

const requiredInputsIfRejected = [
    'status',
    'participant_number',
    'name',
    'is_kip'
]

const requiredInputsIfAccepted = [
    'status',
    'participant_number',
    'name',
    'date',
    'month',
    'year',
    'college_name',
    'departement',
    'major',
    'is_kip'
]

let selectedCollege, selectedDepartement;

$(document).ready(function () {
    const colleges = Object.keys(universities);
    addOptionToSelect('college_name', colleges);
})

$('select[name="college_name"]').change(function () {
    selectedCollege = $(this).val();
    const departements = Object.keys(universities[selectedCollege]);

    removeOptionFromSelect('departement');
    removeOptionFromSelect('major');
    addOptionToSelect('departement', departements);
});

$('select[name="departement"]').change(function () {
    selectedDepartement = $(this).val();
    const majors = universities[selectedCollege][selectedDepartement];

    removeOptionFromSelect('major');
    addOptionToSelect('major', majors);
});

$('input[name="status"]').change(function () {
    if (this.value == 'rejected') {
        hideElements(undisplayedElementIfRejected);
    } else {
        showElements(undisplayedElementIfRejected);
    }
});

$('input').add('select').on('input', function () {
    const isAccepted = $('input[name="status"]:checked').val() == 'accepted';
    const requiredInputs = isAccepted ? requiredInputsIfAccepted : requiredInputsIfRejected;
    if (checkRequiredInputs(requiredInputs)) {
        enabledGenerateButton();
    } else {
        disabledGenerateButton();
    }
})

function hideElements(elementIds) {
    elementIds.forEach(elementId => {
        document.getElementById(elementId).style.display = 'none';
    });
}

function showElements(elementIds) {
    elementIds.forEach(elementId => {
        document.getElementById(elementId).style.display = 'block';
    });
}

function checkRequiredInputs(inputNames) {
    let isValid = true;
    inputNames.forEach(inputName => {
        if (!isFilledInputOrSelect(inputName)) {
            isValid = false;
        }
    });
    return isValid;
}

function isFilledInputOrSelect(inputName) {
    const el = $(`[name="${inputName}"]`);
    if (el.attr('type') == 'radio') {
        return $(`input[name="${inputName}"]:checked`).val() != undefined;
    } else if (el.is('input')) {
        return el.val() != '';
    } else if (el.is('select')) {
        return el.val() != null;
    }
}


function disabledGenerateButton() {
    $('#generate-btn').attr('disabled', true);
}

function enabledGenerateButton() {
    $('#generate-btn').attr('disabled', false);
}

function setDataToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getDataFromLocalStorage(key) {
    return localStorage.getItem(key);
}

function removeDataFromLocalStorage(key) {
    localStorage.removeItem(key);
}

function addOptionToSelect(selectName, options) {
    options.forEach(option => {
        $(`select[name="${selectName}"]`).append(`<option value="${option}">${option}</option>`);
    });
}

function removeOptionFromSelect(selectName) {
    $(`select[name="${selectName}"]`).empty();
    $(`select[name="${selectName}"]`).append(`<option value="" disabled selected>Pilih</option>`);
}
