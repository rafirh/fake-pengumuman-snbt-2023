const undisplayedElementIfRejected = [
    'birthDateContainer',
    'collegeNameContainer',
    'departementContainer',
    'majorContainer',
    'isKipContainer',
]

const requiredInputsIfRejected = [
    'status',
    'participant_number',
    'name',
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

    var el;
    window.TomSelect && (new TomSelect(el = document.getElementById('college-select'), {
        copyClassesToDropdown: false,
        dropdownClass: 'dropdown-menu ts-dropdown',
        optionClass:'dropdown-item',
        controlInput: '<input>',
        render:{
            item: function(data,escape) {
                if( data.customProperties ){
                    return '<div><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + escape(data.text) + '</div>';
                }
                return '<div>' + escape(data.text) + '</div>';
            },
            option: function(data,escape){
                if( data.customProperties ){
                    return '<div><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + escape(data.text) + '</div>';
                }
                return '<div>' + escape(data.text) + '</div>';
            },
        },
    }));

    setTimeout(function() {
        $('#ads-modal').modal('show');
    }, 1000);

    // setTimeout(function() {
    //     $('#showoff-modal').modal('show');
    // }, 1000);

    setTimeout(function() {
        $('#sawer-modal').modal('show');
    }, 1000);

    setInterval(function() {
        $('#sawer-modal').modal('show');
    }, 30000);
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

    var el;
    window.TomSelect && (new TomSelect(el = document.getElementById('major-select'), {
        copyClassesToDropdown: false,
        dropdownClass: 'dropdown-menu ts-dropdown',
        optionClass:'dropdown-item',
        controlInput: '<input>',
        render:{
            item: function(data,escape) {
                if( data.customProperties ){
                    return '<div><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + escape(data.text) + '</div>';
                }
                return '<div>' + escape(data.text) + '</div>';
            },
            option: function(data,escape){
                if( data.customProperties ){
                    return '<div><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + escape(data.text) + '</div>';
                }
                return '<div>' + escape(data.text) + '</div>';
            },
        },
    }));
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

$('#generate-btn').click(function() {
    const isAccepted = $('input[name="status"]:checked').val() == 'accepted';
    const requiredInputs = isAccepted ? requiredInputsIfAccepted : requiredInputsIfRejected;

    const values = getInputValues(requiredInputs)
    setObjectToLocalStorage(values)

    if (isAccepted) {
        redirectToFile('accepted.html')
    } else {
        redirectToFile('rejected.html')
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
    // $('#generate-btn').attr('disabled', true);
}

function enabledGenerateButton() {
    // $('#generate-btn').attr('disabled', false);
}

function setObjectToLocalStorage(object) {
    Object.keys(object).forEach(key => {
        localStorage.setItem(key, object[key]);
    });
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

function getInputValues(inputNames) {
    const result = {}
    inputNames.forEach(name => {
        const el = $(`[name="${name}"]`);
        let value = '';
        if (el.attr('type') == 'radio') {
            value =  $(`input[name="${name}"]:checked`).val();
        } else if (el.is('input')) {
            value =  el.val()
        } else if (el.is('select')) {
            value =  el.val()
        }
        result[name] = value
    }) 
    return result
}

function redirectToFile(fileName) {
    window.location.href = `${fileName}`;
}
