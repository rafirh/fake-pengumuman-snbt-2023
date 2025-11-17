const keys = [
    'participant_number',
    'name',
    'date',
    'month',
    'year',
    'college_name',
    'major',
    'is_kip'
]

$(document).ready(function () {
    const formatedParticipantNumber = formatParticipantNumber(
        localStorage.getItem('participant_number')
            .replaceAll('-', '')
            .replaceAll(' ', '')
    ).toUpperCase();
    $('#participant_number').text(formatedParticipantNumber);

    $('#name').text(localStorage.getItem('name').toUpperCase());

    const birthDate = localStorage.getItem('date') + ' - ' + localStorage.getItem('month') + ' - ' + localStorage.getItem('year');
    $('#birth_date').text(birthDate);

    $('#college_name').text(localStorage.getItem('college_name'));
    $('#major').text(localStorage.getItem('major'));
    
    if (localStorage.getItem('is_kip') == '1') {
        $('#kip').css('display', 'block');
    } else {
        $('#kip').css('display', 'none');
    }
})

function getLocalStorageValues(keys) {
    let values = {};
    keys.forEach(key => {
        values[key] = localStorage.getItem(key);
    });
    return values;
}

function formatParticipantNumber(participantNumber) {
    let formatedParticipantNumber = '';
    for (let i = 0; i < participantNumber.length; i++) {
        formatedParticipantNumber += participantNumber[i];
        if (i == 1 || i == 5) {
            formatedParticipantNumber += ' - ';
        }
    }
    return formatedParticipantNumber;
}