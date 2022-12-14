$(document).ready(function () {
    'use strict';

    $('#addModal, #EditModal').on('shown.bs.modal', function () {
        $('#incomeId, #editIncomeHeadId:first').focus();
    });

    $('#incomeId,#editIncomeHeadId,#incomeHead').select2({
        width: '100%',
    });

    $('#editDate').flatpickr({
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

    $(document).on('click', '.edit-btn', function (event) {
        let id = $(event.currentTarget).data('id');
        renderData(id);
    });

    window.renderData = function (id) {
        $.ajax({
            url: incomeUrl + '/' + id + '/edit',
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let ext = result.data.document_url.split('.').
                        pop().
                        toLowerCase();
                    if (ext == 'pdf') {
                        $('#editPreviewImage').css('background-image', 'url("' + pdfDocumentImageUrl + '")');
                    } else if ((ext == 'docx') || (ext == 'doc')) {
                        $('#editPreviewImage').css('background-image','url("' + docxDocumentImageUrl + '")');
                    } else if (ext == '') {
                        $('#editPreviewImage').css('background-image', 'url("' + defaultDocumentImageUrl + '")');
                    } else {
                        $('#editPreviewImage').css('background-image','url("' + result.data.document_url + '")');
                    }

                    $('#editIncomeId').val(result.data.id);
                    $('#editIncomeHeadId').
                        val(result.data.income_head).
                        trigger('change.select2');
                    $('#editName').val(result.data.name);
                    $('#editDate').val(format(result.data.date, 'YYYY-MM-DD'));
                    $('#editInvoiceNumber').val(result.data.invoice_number);
                    $('#editAmount').val(result.data.amount);
                    $('.price-input').trigger('input');
                    $('#editDescription').val(result.data.description);
                    if (isEmpty(result.data.document_url)) {
                        $('#documentUrl').text('');
                    } else {
                        $('#documentUrl').html('View');
                        $('#documentUrl').
                            attr('href', result.data.document_url);
                    }
                    $('#EditModal').modal('show');
                }
            },
            error: function (result) {
                manageAjaxErrors(result);
            },
        });
    };

    $(document).on('submit', '#editForm', function (event) {
        event.preventDefault();
        $('#btnSave').attr('disabled', true);
        let loadingButton = jQuery(this).find('#btnEditSave');
        loadingButton.button('loading');
        let id = $('#editIncomeId').val();
        let url = incomeUrl + '/' + id + '/update';
        let data = {
            'formSelector': $(this),
            'url': url,
            'type': 'POST',
        };
        editIncomeRecord(data, loadingButton);
    });

    window.editIncomeRecord = function (
        data, loadingButton, modalSelector = '#EditModal',
        btnToDisabledSelector = '') {
        let formData = (data.formSelector === '')
            ? data.formData
            : new FormData(
                $(data.formSelector)[0]);
        $.ajax({
            url: data.url,
            type: data.type,
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    $(modalSelector).modal('hide');
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                }
            },
            error: function (result) {
                UnprocessableInputError(result);
            },
            complete: function () {
                loadingButton.button('reset');
                $(btnToDisabledSelector).attr('disabled', true);
            },
        });
    };

    $('#EditModal').on('hidden.bs.modal', function () {
        resetModalForm('#editForm', '#editValidationErrorsBox');
    });

    $(document).on('change', '#editAttachment', function () {
        let extension = isValidDocument($(this), '#editValidationErrorsBox');
        if (!isEmpty(extension) && extension != false) {
            $('#editValidationErrorsBox').html('').hide();
            displayDocument(this, '#editPreviewImage', extension);
        }
    });

    window.isValidDocument = function (
        inputSelector, validationMessageSelector) {
        let ext = $(inputSelector).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx']) ==
            -1) {
            $(inputSelector).val('');
            $(validationMessageSelector).
                html(documentError).show();
            return false;
        }
        return ext;
    };
});



