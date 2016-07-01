$(document).ready(function () {
    $.material.init();
    /*
     $('.nav-tabs a').on('click', function (e) {
     e.preventDefault();
     $(this).tab('show');
     });*/

    var worker;
    if (typeof ( Worker ) !== "undefined") {
        worker = new Worker("../js/ajax_calls.js");
    }

    var padel = new PadelReservation();
    var loading = false;
    var body = $('body');
    
    body.on('click', '#nav-days li:not(.active) a', function ( e ) {
        $('#nav-hours').remove();
        var navBar = $('<ul id="nav-hours" class="nav nav-tabs success">'+
            '<li><a href="#10" data-toggle="tab">10:00</a></li>'+
        '<li><a href="#11" data-toggle="tab">11:00</a></li>'+
        '<li><a href="#12" data-toggle="tab">12:00</a></li>'+
        '<li><a href="#13" data-toggle="tab">13:00</a></li>'+
        '<li><a href="#17" data-toggle="tab">17:00</a></li>'+
        '<li><a href="#18" data-toggle="tab">18:00</a></li>'+
        '<li><a href="#19" data-toggle="tab">19:00</a></li>'+
        '<li><a href="#20" data-toggle="tab">20:00</a></li>'+
        '<li><a href="#21" data-toggle="tab">21:00</a></li>'+
        '</ul>');
        $('#tabs').find('.active').first().prepend(navBar);
    });
    


    var renderCourts = function (courts) {
        var currentDate = new Date();
        var currentDay = currentDate.getDay();
        var paneles = $(".nav-tabs li");

        paneles.each(function (k) {
            if ((k + 1) < currentDay) {
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
    };


    loading = true;
    if (typeof ( worker ) !== "undefined") {
        worker.postMessage({url: "api/courts"});
        worker.addEventListener('message', function (e) {
            padel.setCourts($.parseJSON(e["data"])["courts"]);
            renderCourts(padel.getCourts());

            $.getJSON('../api/reservations', function (data) {
                padel.setReservations(data["reservations"]);
            }).fail(function () {

            }).always(function () {
                loading = false;
            })

        }, false);
    } else {
        $.getJSON('../api/courts', function (data) {
            padel.setCourts(data);

            $.getJSON('../api/reservations', function (reservations) {
                padel.setReservations(reservations["reservations"]);
            }).fail(function () {

            }).always(function () {
                loading = false;
            })
        }).fail(function () {

        }).always(function () {
            loading = false;
        });
    }
});

var PadelReservation = function () {
    this.players = {};
    this.courts = {};
    this.reservations = {};
};

PadelReservation.prototype = {
    constructor: PadelReservation,
    getPlayers: function () {
        return this.players;
    },
    setPlayers: function (players) {
        this.players = players;
    },
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
    }


};