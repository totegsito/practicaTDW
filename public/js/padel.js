$(document).ready(function () {
        $.material.init();
        var worker;
        if (typeof ( Worker ) !== "undefined") {
            worker = new Worker("../js/ajax_calls.js");
        }

        var localStorageEnabled = (typeof (localStorage) !== "undefined");

        /*
         Si el navegador no soporta localStorage no permito las opciones de guardar datos
         */
        if (!localStorageEnabled) {
            $('#save-btn').remove();
            $('#recover-btn').remove();
        }

        var padel = new PadelReservation();
        var loading = false;
        var body = $('body');


        body.on('click', 'table.avaliable', function () {
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
        });

        body.on('click', 'table.selected', function () {
            $(this).toggleClass('selected')
        });

        body.on('shown.bs.tab', '#nav-days.nav-tabs a[data-toggle="tab"]', function () {
            var date = moment();
            var index = $('#nav-days li.active').index();
            var tab = $($(this).attr('href'));
            tab.find('li:not(.disabled) a').first().tab('show');
            $('.temporal').removeClass('temporal');
        });


        body.on('shown.bs.tab', '#tabs .tab-pane a[data-toggle="tab"]', function (e) {
            var active = $('#tabs-text .active');
            active.addClass('row');
            var dayIndex = $('#nav-days li.active').attr('data-date');
            var hour = $('#tabs div.active li.active a').attr('href').replace('#', '');
            active.empty();
            var date = moment().add(dayIndex, 'days').minute(0).hour(hour).seconds(0);
            var reservations = padel.getReservationsByDateTime(date.format("YYYY-MM-DD HH:mm:ss"));
            var courts = padel.getCourts();
            var avaliable = true, occupied = false;
            for (var i in courts) {
                avaliable = courts[i]["avaliable"];
                occupied = false;
                var j = 0;
                while(j < reservations.length && !occupied){
                    occupied = reservations[j]["courts_id"] == courts[i]["id"];
                    if(!occupied){
                        j++;
                    }
                }
                var section = $('<section class="col-md-4 col-sm-6"></section>');
                var title;
                if(occupied){
                    title = reservations[j]["1st_player"] + ", "
                        + reservations[j]["2nd_player"] + ", "
                        + reservations[j]["3rd_player"] + ", "
                        + reservations[j]["4th_player"];
                }
                var header = $('<header></header>').appendTo(section);
                var h4 = '<h4>Court ' + (Number(i) + 1) + '</h4>';
                if(title != undefined){
                    h4 = '<a href="javascript: false;" title="'+title+'">'+h4+'</a>';
                }
                $(h4).appendTo(header);
                var table = $('<table class="table table-bordered court' + ((!occupied && avaliable) ? ' avaliable' : '') + '" data-id="' + courts[i]["id"] + '"></table>').appendTo(section);
                for (var i = 0; i < 2; i++) {
                    var rows = $('<tr class=' + ( avaliable == 1 ? (occupied ? "warning" : "success") : "danger" ) + '></tr>');
                    for (var j = 0; j < 2; j++) {
                        rows.append('<td></td>');
                    }
                    table.append(rows)
                }
                active.append(section);
                title = undefined;
            }
        });

        body.on('click', '.disabled', function () {
            return false;
        });


        body.on('click', '#save-btn', function () {
            var fail;
            var selected = $('.selected');
            if (selected.length >= 1) {
                var stPlayer = $('#1st_player');
                if (stPlayer.val().match(/^[A-Za-z0-9-_]{2,255}$/)) {
                    stPlayer.closest('.form-group').addClass('has-success');
                    var ndPlayer = $('#2nd_player');
                    if (ndPlayer.val().match(/^[A-Za-z0-9-_]{2,255}$/)) {
                        ndPlayer.closest('.form-group').addClass('has-success');
                        var rdPlayer = $('#3rd_player');
                        if (rdPlayer.val().match(/^[A-Za-z0-9-_]{2,255}$/)) {
                            rdPlayer.closest('.form-group').addClass('has-success');
                            var thPlayer = $('#4th_player');
                            if (thPlayer.val().match(/^[A-Za-z0-9-_]{2,255}$/)) {
                                thPlayer.closest('.form-group').addClass('has-success');
                                $('.temporal').removeClass('temporal');
                                selected.addClass('temporal').removeClass('selected');
                                var day = ($('#nav-days li.active').index()) - (new Date().getDay());
                                var hour = ($('#tabs .active li.active a').attr('href')).replace('#', '');
                                var id = $('table.temporal[data-id]').first().attr('data-id');
                                var date = moment().add(day, 'days').hour(hour).minute(0).seconds(0);
                                var localReservation = {
                                    users_id: $('#user-id').val(),
                                    "courts_id": id,
                                    "reservation_date": date.format("YYYY-MM-DD HH:mm:ss"),
                                    "1st_player": stPlayer.val(),
                                    "2nd_player": ndPlayer.val(),
                                    "3rd_player": rdPlayer.val(),
                                    "4th_player": thPlayer.val()
                                };
                                localStorage.setItem("temporalReservation", JSON.stringify(localReservation));
                                $('#recover-btn').removeClass('disabled');
                            } else {
                                thPlayer.focus();
                                fail = $('#thInfo');
                                fail.text("Invalid name").removeClass('hidden');
                                fail.closest('.form-group').addClass('has-error').removeClass('has-success');
                            }
                        } else {
                            rdPlayer.focus();
                            fail = $('#rdInfo');
                            fail.text("Invalida name").removeClass('hidden');
                            fail.closest('.form-group').addClass('has-error').removeClass('has-success');
                        }
                    } else {
                        ndPlayer.focus();
                        fail = $('#ndInfo');
                        fail.text("Invalid name").removeClass('hidden');
                        fail.closest('.form-group').addClass('has-error').removeClass('has-success');
                    }
                } else {
                    stPlayer.focus();
                    fail = $('#stInfo');
                    fail.text("Invalid name").removeClass('hidden');
                    fail.closest('.form-group').addClass('has-error').removeClass('has-success');
                }
            } else {
                alertFail("Please choose a court and a day");
            }
        });

        /*

         Creo el evento encargado de obtener las reservas temporales

         */

        /*
         Antes de asignar el evento de recuperar datos de pistas me aseguro de que haya datos que recuperar
         y de que esté autorizado a utilizarlos.
         */

        /* Compruebo que el navegador soporte localStorage */
        var recover = $('#recover-btn');
        /* Compruebo que haya datos guardados que recuperar */
        if (localStorage.getItem("temporalReservation") != undefined) {
            /* Compruebo que los datos pertenecen al usuario logueado */
            if ($.parseJSON(localStorage.getItem("temporalReservation"))["users_id"] == $('#user-id').val()) {
                /* Compruebo que si hay datos la fecha que haya guardada no sea anterior a la del día actual */
                var pastDate = moment().isBefore($.parseJSON(localStorage.getItem("temporalReservation"))["reservation_date"]);
                if (pastDate) {
                    body.on('click', '#recover-btn', function () {
                            var reservation = $.parseJSON(localStorage.getItem("temporalReservation"));
                            var date = moment(reservation["reservation_date"]);
                            var day = $('#nav-days li').eq(date.day()).find('a');
                            day.tab('show');
                            $(day.attr('href')).find('a[href="#' + date.hour() + '"]').tab("show");
                            var fo = function (data) {
                                var table = $('table.avaliable:not(.temporal)[data-id="' + reservation["courts_id"] + '"]');
                                table.last().addClass('temporal');
                            };
                            $('#1st_player').val(reservation["1st_player"]);
                            $('#2nd_player').val(reservation["2nd_player"]);
                            $('#3rd_player').val(reservation["3rd_player"]);
                            $('#4th_player').val(reservation["4th_player"]);
                            setTimeout(fo, 500);
                        }
                    );
                } else {
                    recover.addClass('disabled');
                }
            } else {
                localStorage.setItem('temporalReservation', undefined);
                recover.addClass('disabled');
            }
        } else {
            recover.addClass('disabled');
        }

        body.on('click', '#reserve-btn', function () {
            var fail;
            var selected = $('.selected');
            if (selected.length >= 1) {
                var stPlayer = $('#1st_player');
                if (stPlayer.val().match(/^[A-Za-z0-9-_]{2,255}$/)) {
                    stPlayer.closest('.form-group').addClass('has-success');
                    var ndPlayer = $('#2nd_player');
                    if (ndPlayer.val().match(/^[A-Za-z0-9-_]{2,255}$/)) {
                        ndPlayer.closest('.form-group').addClass('has-success');
                        var rdPlayer = $('#3rd_player');
                        if (rdPlayer.val().match(/^[A-Za-z0-9-_]{2,255}$/)) {
                            rdPlayer.closest('.form-group').addClass('has-success');
                            var thPlayer = $('#4th_player');
                            if (thPlayer.val().match(/^[A-Za-z0-9-_]{2,255}$/)) {
                                thPlayer.closest('.form-group').addClass('has-success');
                                var day = ($('#nav-days li.active').index()) - (new Date().getDay());
                                var hour = ($('#tabs .active li.active a').attr('href')).replace('#', '');
                                var id = $('table.selected[data-id]').first().attr('data-id');
                                var date = moment().add(day, 'days').hour(hour).minute(0).seconds(0);
                                var localReservation = {
                                    "users_id": $('#user-id').val(),
                                    "courts_id": id,
                                    "reservation_date": date.format("YYYY-MM-DD HH:mm:ss"),
                                    "1st_player": stPlayer.val(),
                                    "2nd_player": ndPlayer.val(),
                                    "3rd_player": rdPlayer.val(),
                                    "4th_player": thPlayer.val()
                                };
                                selected.removeClass('selected');
                                $('#nav-days li.active a').tab('show');
                                postAJAX(localReservation);
                            } else {
                                thPlayer.focus();
                                fail = $('#thInfo');
                                fail.text("Invalid name").removeClass('hidden');
                                fail.closest('.form-group').addClass('has-error').removeClass('has-success');
                            }
                        } else {
                            rdPlayer.focus();
                            fail = $('#rdInfo');
                            fail.text("Invalida name").removeClass('hidden');
                            fail.closest('.form-group').addClass('has-error').removeClass('has-success');
                        }
                    } else {
                        ndPlayer.focus();
                        fail = $('#ndInfo');
                        fail.text("Invalid name").removeClass('hidden');
                        fail.closest('.form-group').addClass('has-error').removeClass('has-success');
                    }
                } else {
                    stPlayer.focus();
                    fail = $('#stInfo');
                    fail.text("Invalid name").removeClass('hidden');
                    fail.closest('.form-group').addClass('has-error').removeClass('has-success');
                }
            } else {
                alertFail("Please choose a court and a day");
            }
        });


        var postAJAX = function (data) {
            if (!loading) {
                loading = true;
                $.ajax({
                    url: "../api/reservations",
                    method: "POST",
                    data: data,
                    success: function (data) {
                        var reservations = padel.getReservations();
                        reservations.push(data["reservation"]);
                        alertSuccess(data.message);
                        renderHours();
                    },
                    error: function (xhr) {
                        alertFail("The reservation hasn't been created. Reason: " + JSON.parse(xhr.responseText).error);
                    },
                    complete: function () {
                        loading = false;
                    }
                });
            }
        };


        var renderHours = function () {
            var currentDate = new Date();
            var currentDay = currentDate.getDay();
            var panels = $("#nav-days li");
            var hour = new Date().getHours();
            panels.each(function (k) {
                $(this).attr('data-date', ((k) - currentDay));
                if ((k) < currentDay || (( ( k ) == currentDay ) && (hour >= 21))) {
                    $($(this).attr('href')).empty();
                    $(this).addClass('disabled');
                    $(this).children('a').attr('href', '');
                } else if ((( k ) == currentDay)) {
                    $(this).find('a').tab('show');
                    $('#tabs .active li a').each(function (k) {
                        var ref = $(this).attr('href');
                        ref = ref.replace('#', '');
                        if (ref <= hour) {
                            $(this).closest('li').addClass('disabled');
                            $(this).attr('href', '');
                        } else if (ref >= (hour + 1)) {
                            $('#tabs .active li:not(.disabled) a').first().tab('show');
                        }
                    })
                } else if (( k == ( currentDay + 1)) && (hour >= 21)) {
                    $(this).find('a').tab('show');
                    $('#tabs .active li:not(.disabled) a').first().tab('show');
                }
            })
        };

        var alertSuccess = function (message) {
            $('#alert').addClass("alert-success").removeClass('alert-danger').removeClass("hidden").text(message);
        };

        var alertFail = function (message) {
            $('#alert').addClass("alert-danger").removeClass('alert-success').removeClass("hidden").text(message);
        };


        loading = true;

        if (typeof ( worker ) !== "undefined") {
            worker.postMessage({url: "api/courts"});
            worker.addEventListener('message', function (e) {
                padel.setCourts($.parseJSON(e["data"])["courts"]);
                $.getJSON('../api/reservations', function (data) {
                    padel.setReservations(data["reservations"]);
                    renderHours();
                }).fail(function () {
                    alertFail("Connection failed. Try again later");
                }).always(function () {
                    loading = false;
                })

            }, false);
        } else {
            $.getJSON('../api/courts', function (data) {
                padel.setCourts(data);
                $.getJSON('../api/reservations', function (reservations) {
                    padel.setReservations(reservations["reservations"]);
                    renderHours();
                }).fail(function () {
                    alertFail("Connection failed. Try again later");
                }).always(function () {
                    loading = false;
                })
            }).fail(function () {
                alertFail("Connection failed. Try again later");

            }).always(function () {
                loading = false;
            });
        }
    }
)
;
var PadelReservation = function () {
    this.courts = {};
    this.reservations = {};
};

PadelReservation.prototype = {
    constructor: PadelReservation,
    getCourts: function () {
        return this.courts;
    },
    setCourts: function (courts) {
        this.courts = courts
    },
    getReservations: function () {
        return this.reservations;
    },
    setReservations: function (reservations) {
        this.reservations = reservations;
    },
    getReservationsByDateTime: function (reservationDateTime) {
        var reservationByDateTime = [];
        for (var i in this.reservations) {
            var current = this.reservations[i];
            if (current["reservation_date"] == reservationDateTime) {
                reservationByDateTime.push(current);
            }
        }
        return reservationByDateTime;
    }


};

/*
 var renderCourts = function (courts) {
 var currentDate = new Date();
 var currentDay = currentDate.getDay();
 var paneles = $("#nav-days li");
 paneles.each(function (k) {
 if ((k + 1) < currentDay) {
 $(this).empty();
 $(this).addClass('disabled');
 $(this).children('a').attr('href', '');
 } else {
 var contCourts = 1;
 courts.forEach(function (court) {
 this.addClass('row');
 var section = $('<section class="col-md-4 col-xs-6"></section>').appendTo(this);
 var header = $('<header><h5>Court ' + contCourts + '</h5></header>').appendTo(section);
 var table = $('<table class="table table-bordered court"></table>').appendTo(section);
 for (var i = 0; i < 2; i++) {
 var rows = $('<tr class=' + (court["avaliable"] == 1 ? "success" : "danger" ) + '></tr>');
 for (var j = 0; j < 2; j++) {
 rows.append('<td></td>');
 }
 table.append(rows)
 }
 // tableHeader = 


 contCourts++;
 }, $('.tab-pane:nth-child(' + (k + 1) + ')'));
 }
 })
 };*/
