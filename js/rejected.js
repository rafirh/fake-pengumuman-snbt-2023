const keys = [
    'participant_number',
    'name',
]

$(document).ready(function () {
    const values = getLocalStorageValues(keys);

    $('#name').text(values['name'].toUpperCase());

    let formatedParticipantNumber = formatParticipantNumber(values['participant_number']);
    $('#participant_number').text(formatedParticipantNumber);
});

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
