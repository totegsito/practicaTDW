$(document).ready(function () {
    $.material.init();
    var worker;
    if (typeof ( Worker ) !== "undefined") {
        worker = new Worker("../js/ajax_calls.js");
    }
    var localStorageEnabled = (typeof (localStorage) !== "undefined"), body = $('body'), loading = false ;
    var management = new userReservations($('#user-id').text());
    
    body.on('click', '.disabled', function () {
        return false;
    });

    body.on('dp.change', '#reservation-date', function () {
        var id = management.getCurrentId();
        var reservation = management.getConcreteReservation(id);
        var date = moment(reservation["reservation_date"]);
        var radios = $('input[name=putRadios]');
        if($(this).val() == moment().format('YYYY-MM-DD')){
            radios.each(function (k) {
                if ($(this).val() <= moment().hour() && moment().isSame(date, "day")) {
                    $(this).attr('disabled', true);
                    $(this).addClass('disabled');
                }
            });
        }else{
            radios.each(function () {
                $(this).attr('disabled', false);
                $(this).removeClass('disabled');
            })
        }
    });


    body.on('show.bs.modal', '#editModal', function (event) {
        var id = $(event.relatedTarget).data("edit");
        var reservation = management.getConcreteReservation(id);
        var date = moment(reservation["reservation_date"]);
        management.setCurrentId(id);
        $('input[name=putRadios]').each(function (k) {
            if ($(this).val() <= moment().hour() && moment().isSame(date, "day")) {
                $(this).attr('disabled', true);
                $(this).addClass('disabled');
            }
            if($(this).val() == date.hour()){
                $(this).attr('checked', true);
            }
        });
        $('#reservation-id').val(id);
        $('#reservation-date').val(date.format('YYYY-MM-DD'));
        $('#reservation-user').val(management.getId());
        $('#reservation-court').val(reservation["courts_id"]);
        $('#reservation-first').val(reservation["1st_player"]);
        $('#reservation-second').val(reservation["2nd_player"]);
        $('#reservation-third').val(reservation["3rd_player"]);
        $('#reservation-fourth').val(reservation["4th_player"]);
    });

    body.on("click", '#apply-edit', function (event) {
        var newReservation = {}, id;
        var date = $('#reservation-date');
        if (date.val().match(/^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/)) {
            id = $('#reservation-id').val();
            newReservation["reservation_date"] = date.val() + " " + $('input[name=putRadios]:checked').val() + ":00:00";
            var user = management.getId();
            var court = $('#reservation-court').val();
            if (court === "") {
                $('#courtInfo').text("Empty court").removeClass('hidden');
            } else {
                newReservation["users_id"] = user;
                newReservation["courts_id"] = court;
                newReservation["1st_player"] = $('#reservation-first').val();
                newReservation["2nd_player"] = $('#reservation-second').val();
                newReservation["3rd_player"] = $('#reservation-third').val();
                newReservation["4th_player"] = $('#reservation-fourth').val();
                $('#editModal').modal('toggle');
                updateAJAX(newReservation, id);
            }
        } else {
            var currentInfo = $('#dateInfo');
            currentInfo.text("Invalid datetime.");
            currentInfo.removeClass('hidden');
            currentInfo.closest('.form-group').addClass('has-error');
        }
    });


    $('#reservation-date').datetimepicker({
        locale: 'en',
        format: 'YYYY-MM-DD',
        enabledHours: [10, 11, 12, 13, 17, 18, 19, 20, 21],
        minDate: moment().add(-1, "days"),
        maxDate: moment().add(7, "days"),
        keepInvalid: true
    });

    body.on('show.bs.modal', '#deleteModal', function (event) {
        management.setCurrentId($(event.relatedTarget).data("delete"));
    });

    body.on('click', '#apply-delete', function () {
        $("#deleteModal").modal('toggle');
        deleteAJAX(management.getCurrentId());
    });


    var deleteAJAX = function (id) {
        if (!loading) {
            loading = true;
            $.ajax({
                url: "../api/reservations/" + id,
                method: "DELETE",
                success: function () {
                    var reservations = management.getReservations();
                    var index = management.getIndexFromID(id);
                    reservations.splice(index, 1);
                    alertSuccess("Reservation removed successfully");
                    refresh(reservations);
                },
                error: function (xhr) {
                    alertFail("The reservation hasn't been removed. Reason: " + JSON.parse(xhr.responseText).error);
                },
                complete: function () {
                    loading = false;
                }
            });
        }
    };

    var updateAJAX = function (data, id) {
        if (!loading) {
            loading = true;
            $.ajax({
                url: "../api/reservations/" + id,
                method: "PUT",
                data: data,
                success: function (data) {
                    var reservations = management.getReservations();
                    var index = management.getIndexFromID(id);
                    reservations[index] = data["reservation"];
                    refresh(reservations);
                    alertSuccess(data["message"]);
                },
                error: function (xhr) {
                    alertFail("The reservation hasn't been updated. Reason: " + JSON.parse(xhr.responseText).error);
                },
                complete: function () {
                    loading = false;
                }
            });
        }
    };


    var render = function (data) {
        var table = $('table tbody').first();
        table.empty();
        for( var reservation in data ){
            var current = data[reservation];
            var row = $('<tr></tr>').appendTo(table);
            Object.keys(current).forEach(function (k) {
                if( k !== "users_id"){
                    row.append('<td>'+current[k]+'</td>');
                }
            });
            var date = moment(current['reservation_date']);
            var last = $('<td></td>').appendTo(row);
            var btnGroup = $('<div class="btn-group" role="group"></div>').appendTo(last);
            btnGroup.append('<button type="button" class="btn btn-raised btn-warning '+ ((moment().isAfter(date)) ? 'disabled past' : '') +'" data-toggle="modal" data-target="#editModal" data-edit="' + current["id"] + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>').appendTo(btnGroup);
            btnGroup.append('<button type="button" class="btn btn-raised btn-danger"data-toggle="modal" data-target="#deleteModal"  data-delete="' + current["id"] + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>');
        }
    };


    var alertSuccess = function (message) {
        $('#alert').addClass("alert-success").removeClass('alert-danger').removeClass("hidden").text(message);
    };

    var alertFail = function (message) {
        $('#alert').addClass("alert-danger").removeClass('alert-success').removeClass("hidden").text(message);
    };

    var refresh = function (data) {
        management.setReservations(data);
        render(data);
        if(localStorageEnabled){
            localStorage.setItem('userReservations', JSON.stringify(data));
        }
    };


    loading = true;
    if(localStorageEnabled){
        if(localStorage.getItem("userReservations")){
            render($.parseJSON(localStorage.getItem("userReservations")))
            $('.btn').addClass('disabled');
        }
    }

    if (typeof ( worker ) !== "undefined") {
        worker.postMessage({url: "api/reservations/user/" + management.getId()});
        worker.addEventListener('message', function (e) {
            loading = false;
            refresh($.parseJSON(e["data"])["reservations"]);
            $('.btn:not(.past)').removeClass('disabled');
        }, false);
    } else {
        $.getJSON('../api/courts', function (data) {
            loading = false;
            refresh(data["reservations"]);
            $('.btn:not(.past)').removeClass('disabled');
        }).fail(function () {
            alertFail("Connection failed. Try again later");
        });
    }


});

var userReservations = function (id) {
    this.reservations = {};
    this.currentId = '';
    this.id = id;
};

userReservations.prototype = {
    constructor: userReservations,
    getReservations: function () {
        return this.reservations;
    },
    setReservations: function (reservations) {
        this.reservations = reservations;
    },
    setId: function (id) {
        this.id = id;
    },
    getId: function () {
        return this.id;
    },
    setCurrentId: function (id) {
        this.currentId = id;
    },
    getCurrentId: function () {
        return this.currentId;
    },
    getConcreteReservation: function (id) {
        var result = null;
        for (var reservation in this.reservations) {
            if (this.reservations[reservation]["id"] === id) {
                result = this.reservations[reservation];
            }
        }
        return result;
    },
    getIndexFromID: function (id) {
        var result = 0;
        var salir = false;
        while (result <= this.reservations.length && !salir) {
            if (this.reservations[result]["id"] == id) {
                salir = true;
            } else {
                result++;
            }
        }
        return salir ? result : '';
    }
};