$(document).ready(function () {
    'use strict';

    $('#patientId, #doctorId').select2({
        width: '100%',
    });
    $('#date').flatpickr({
        enableTime: true,
        defaultDate: new Date(),
        dateFormat: "Y-m-d H:i",
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            },
            months: {
                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
                longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            },
        },
    });
    $('#patientId').focus();

    $('.price-input').trigger('input');

    $('#createPatientCaseForm, #editPatientCaseForm').submit(function () {
        $('#saveBtn').attr('disabled', true);

        if ($('#error-msg').text() !== '') {
            $('#phoneNumber').focus();
            $('#saveBtn').attr('disabled', false);
            return false;
        }
    });
});
