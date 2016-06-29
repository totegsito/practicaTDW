$(document).ready(function () {
    $.material.init();

    var worker;
    if ( typeof ( Worker ) !== "undefined" ) {
        worker = new Worker( "../js/ajax_calls.js" );
    }
    var management = new ReservationsManagement( );
    var localStorageEnabled = ( typeof ( localStorage ) !== "undefined" );

    var loading = false;

    var body = $( 'body' );
    
    body.on('show.bs.modal', '#editModal', function (event) {
        var id = $(event.relatedTarget).data("edit");
        var reservation = management.getConcreteReservation(id);
        $('#reservation-id').val(id);
        $('#reservation-date').val(reservation["reservation_date"]);
        $('#reservation-user').val(reservation["users_id"]);
        $('#reservation-court').val(reservation["courts_id"]);
        $('#reservation-first').val(reservation["1st_player"]);
        $('#reservation-second').val(reservation["2nd_player"]);
        $('#reservation-third').val(reservation["3rd_player"]);
        $('#reservation-fourth').val(reservation["4th_player"]);
    });

    body.on("click", '#apply-edit',function (event) {
        var newReservation = {}, id;
        var date = $('#reservation-date');
        if(date.val().match(/^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (1(1|2|3||7|8|9)|2(0|1)):00:00$/)){
            id = $('#reservation-id').val();
            newReservation["reservation_date"] = date.val();
            newReservation["users_id"] = $('#reservation-user').val();
            newReservation["courts_id"] = $('#reservation-court').val();
            newReservation["1st_player"] = $('#reservation-first').val();
            newReservation["2nd_player"] = $('#reservation-second').val();
            newReservation["3rd_player"] = $('#reservation-third').val();
            newReservation["4th_player"] = $('#reservation-fourth').val();
            $('#editModal').modal('toggle');
            updateAJAX(newReservation, id);
        }else{
            var currentInfo = $('#dateInfo');
            currentInfo.text("Invalid datetime. ");
            currentInfo.removeClass('hidden');
            currentInfo.closest('.form-group').addClass('has-error');
        }
    });

    body.on('show.bs.modal', '#deleteModal', function (event) {
        management.currentId = $(event.relatedTarget).data("delete");
    });

    body.on('click', '#apply-delete', function () {
        $("#deleteModal").modal('toggle');
        deleteAJAX(management.currentId);
    });



    /*
     /
     /   Declaración de las llamadas AJAX
     /
     */

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
                    refreshReservations(reservations);
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
                    refreshReservations(reservations);
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


    /*
     /
     /   Declaración de las funciones
     /
     */

    var render = function ( data ) {
        var table = $("#reservations-table tbody");
        table.empty();
        table.append();
        var reservations = data;
        for (var reservation in reservations) {
            var current = reservations[reservation];
            var row = $('<tr></tr>');
            row.append('<td>' + current["id"] + '</td>');
            Object.keys(current).forEach(function (k) {
                var col = $('<td></td>');
                var foo = current[k];

                if( k !== "id" ){
                    col.append(foo);
                    row.append(col);
                }
            });
            row.append('<td><div class="btn-group" role="group"><button type="button" class="btn btn-raised btn-warning" data-toggle="modal" data-target="#editModal" data-edit="' + reservations[reservation]["id"] + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button><button type="button" class="btn btn-raised btn-danger"data-toggle="modal" data-target="#deleteModal"  data-delete="' + reservations[reservation]["id"] + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></td>');
            table.append(row);
        }
    };

    var refreshReservations = function ( data ) {
        console.log( data );
        if ( localStorageEnabled ) {
            localStorage.setItem( "reservations", JSON.stringify( data ));
        }
        management.setReservations( data );
        render( management.getReservations( ) );
        console.log(management.getReservations());
    };

    var alertSuccess = function ( message ) {
        $( '#alert' ).addClass( "alert-success" ).removeClass( 'alert-danger' ).removeClass( "hidden" ).text( message );
    };

    var alertFail = function ( message ) {
        $( '#alert' ).addClass( "alert-danger" ).removeClass( 'alert-success' ).removeClass( "hidden" ).text( message );
    };




    if ( typeof( localStorage[ "reservations" ] ) !== "undefined" && localStorageEnabled ) {
        render( $.parseJSON( localStorage.getItem( "reservations" )) );
        $('.btn-group .btn').each(function () {
            $(this).attr("disabled", "disabled");
        });
    }

    loading = true;
    if ( typeof ( Worker ) !== "undefined" ) {
        worker.postMessage( {url: "api/reservations"} );
        worker.addEventListener( 'message', function ( e ) {
            refreshReservations( $.parseJSON( e.data )[ "reservations" ]);
            loading = false;
            $('.btn-group .btn').each(function () {
                $(this).removeAttr('disabled');
            });
        }, false );
    } else {
        $.getJSON( '../api/reservations', function ( data ) {
            refreshReservations( data[ "reservations" ]);
        } ).fail( function ( ) {
            alertFail( "Connection failed. Try again later" );
        } ).always( function ( ) {
            loading = false;
            $('.btn-group .btn').each(function () {
                $(this).removeAttr('disabled');
            });
        } );
    }
});

var ReservationsManagement = function () {
    if( typeof ( localStorage ) !== "undefined" ){
        this.reservations = ( localStorage.getItem( "reservations" ) !== "undefined" ) ? $.parseJSON( localStorage.getItem( "reservations" ) ) : {};
    }else{
        this.reservations = {};
    }
};

ReservationsManagement.prototype = {
    constructor: ReservationsManagement,
    getReservations: function ( ) {
        return this.reservations;
    },
    setReservations: function ( reservations ) {
        this.reservations = reservations;
    },
    getCurrentId: function ( ) {
        return this.currentId;
    },
    setCurrentId: function ( id ) {
        this.currentId = id;
    },
    getConcreteReservation: function ( id ) {
        var result = null;
        for ( var reservation in this.reservations ) {
            if ( this.reservations[ reservation ][ "id" ] === id ) {
                result = this.reservations[ reservation ];
            }
        }
        return result;
    },
    getIndexFromID: function ( id ) {
        var result = 0;
        var salir = false;
        while ( result <= this.reservations.length && !salir ) {
            if ( this.reservations[ result ][ "id" ] == id ) {
                salir = true;
            } else {
                result++;
            }
        }
        return salir ? result : '';
    }
};

