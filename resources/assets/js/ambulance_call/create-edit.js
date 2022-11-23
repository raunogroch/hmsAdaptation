$(document).ready(function () {
    'use strict';

    $('#ambulanceId').select2({
        width: '100%',
    });
    $('#patientId').select2({
        width: '100%',
    });
    $('#date').flatpickr({
        format: 'YYYY-MM-DD',
        useCurrent: true,
        sideBySide: true,
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

    $('#ambulanceId').on('change', function () {
        $.ajax({
            url: getDriverNameUrl,
            type: 'get',
            dataType: 'json',
            data: { id: $(this).val() },
            success: function (result) {
                $('#driverName').val(result.data);
            },
            error: function (result) {
                printErrorMessage('#validationErrorsBox', result);
            },
        });
    });

    $('#createAmbulanceCall, #editAmbulanceCall').on('submit', function () {
        $('#saveBtn').attr('disabled', true);
    });
});
