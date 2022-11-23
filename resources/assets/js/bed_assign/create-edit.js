$(document).ready(function () {
    'use strict';

    let dischargeFlatPicker = undefined;
    $('#caseId, #bedId').select2({
        width: '100%',
    });

    $('#ipdPatientId').select2({
        width: '100%',
        placeholder: 'Select IPD Patient',
    });

    let assignDatePicker = $("#assignDate").flatpickr({
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
        onChange: function(selectedDates, dateStr, instance) {
            let minDate = moment($('#assignDate').val()).add(1, 'days').format();
            if (typeof dischargeFlatPicker != "undefined"){
                dischargeFlatPicker.set('minDate', minDate)
            }
        }
    });

    $('#caseId').first().focus();

    if (isEdit) {
        setTimeout(function () {
            $('#caseId').trigger('change');
            $('#assignDate').trigger('dp.change');
        }, 300);

        dischargeFlatPicker = $("#dischargeDate").flatpickr({
            enableTime: true,
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
        let minDate = moment($('#assignDate').val()).add(1, 'days').format();
        dischargeFlatPicker.set('minDate', minDate)
    }

    $('#createBedAssign, #editBedAssign').on('submit', function () {
        $('#saveBtn').attr('disabled', true);
        if ($('#validationErrorsBox').text() !== '') {
            $('#saveBtn').attr('disabled', false);
        }
    });

    $('#caseId').on('change', function () {
        if ($(this).val() !== '') {
            $.ajax({
                url: ipdPatientsList,
                type: 'get',
                dataType: 'json',
                data: { id: $(this).val() },
                success: function (data) {
                    if (data.data.length !== 0) {
                        $('#ipdPatientId').empty();
                        $('#ipdPatientId').removeAttr('disabled');
                        $.each(data.data, function (i, v) {
                            $('#ipdPatientId').
                                append($('<option></option>').
                                    attr('value', i).
                                    text(v));
                        });
                    } else {
                        $('#ipdPatientId').prop('disabled', true);
                    }
                },
            });
        }
        $('#ipdPatientId').empty();
        $('#ipdPatientId').prop('disabled', true);
    });
});
