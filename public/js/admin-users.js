$(document).ready(function () {
    var worker;
    if (typeof ( Worker ) !== "undefined") {
        worker = new Worker("../js/ajax_calls.js");
    }
    var management = new UsersManagement(worker);
    var localStorageEnabled = ( typeof ( localStorage ) !== "undefined" );

    var loading = false, body = $('body');
    var buttons;

    /*
     /
     / Declaración de eventos
     /
     */
   body.on('show.bs.modal', '#editModal', function (event) {
        var id = $(event.relatedTarget).data("edit");
        var user = management.getConcreteUser(id);
        $('#user-id').val(id);
        $('#user-username').val(user.name);
        $('#user-email').val(user.email);
        $('#user-name').val(user.firstname);
        $('#user-surname').val(user.surname);
        $('#user-telephone').val(user.telephone);
        $('#user-enabled').prop('checked', (user.enabled == 1));
        $('#user-roles').prop('checked', (user.roles == 1));
    });

    body.on("click", '#apply-edit',function (event) {
        var newUser = {}, id;
        id = $('#user-id').val();
        newUser["name"] = $('#user-username').val();
        newUser["email"] = $('#user-email').val();
        newUser["firstname"] = $('#user-name').val();
        newUser["surname"] = $('#user-surname').val();
        newUser["telephone"] = $('#user-telephone').val();
        newUser["enabled"] = $('#user-enabled').prop('checked') == true ? 1 : 0;
        newUser["roles"] = $('#user-roles').prop('checked') == true ? 1 : 0;
        $('#editModal').modal('toggle');
        updateAJAX(newUser, id);
    });

    body.on('show.bs.modal', '#deleteModal', function (event) {
        management.currentId = $(event.relatedTarget).data("delete");
    });

    body.on('click', '#apply-delete', function () {
        $("#deleteModal").modal('toggle');
        deleteAJAX(management.currentId);
    });

    body.on("click", '#add-user',function () {
        var newUser = {};
        newUser["name"] = $('#newUser').val();
        newUser["email"] = $('#newEmail').val();
        newUser["password"] = $('#newPassword').val();
        newUser["firstname"] = $('#newFirstName').val();
        newUser["surname"] = $('#newLastName').val();
        newUser["telephone"] = $('#newTelephone').val();
        postAJAX(newUser);
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
                url: "../api/users/" + id,
                method: "DELETE",
                success: function () {
                    var users = management.getUsers();
                    var index = management.getIndexFromID(id);
                    users.splice(index, 1);
                    alertSuccess("User removed successfully");
                    refreshUsers(users);
                },
                error: function (xhr) {
                    alertFail("The user hasn't been removed. Reason: " + JSON.parse(xhr.responseText).error);
                },
                complete: function () {
                    loading = false;
                }
            });
        }
    };

    var postAJAX = function (data) {
        if (!loading) {
            loading = true;
            $.ajax({
                url: "../api/users",
                method: "POST",
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data) {
                    var users = management.getUsers();
                    users.push(data["user"]);
                    alertSuccess(data.message);
                    refreshUsers(users);
                    $('#addUserForm').each(function () {
                        this.reset();
                    });
                },
                error: function (xhr) {
                    alertFail("User couldn't be created. Reason: " + JSON.parse(xhr.responseText).error);
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
                url: "../api/users/" + id,
                method: "PUT",
                data: data,
                success: function (data) {
                    var users = management.getUsers();
                    var index = management.getIndexFromID(id);
                    users[index] = data.user;
                    refreshUsers(users);
                    alertSuccess(data.message);
                },
                error: function (xhr) {
                    alertFail("The user hasn't been updated. Reason: " + JSON.parse(xhr.responseText).error);
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

    var render = function (data) {

        var table = $("#users-table tbody");
        table.empty();
        table.append();
        var users = data;
        for (var user in users) {
            var current = users[user];
            var row = $('<tr></tr>');
            row.append('<td>' + current["id"] + '</td>');
            Object.keys(current).forEach(function (k) {
                var col = $('<td></td>');
                var foo = current[k];
                if ( k === "roles" || k === "enabled"){
                    if( current[ k ] == 1 ){
                        foo = $('<span class="glyphicon glyphicon-ok"></span>');
                        col.addClass("success");
                    }else{
                        foo = $('<span class="glyphicon glyphicon-remove"></span>');
                        col.addClass("danger");
                    }
                }
                if( k !== "id"){
                    col.append(foo);
                    row.append(col);
                }
                /*if ( k != "id" ) {
                    row.append( '<td>' + foo + '</td>' );
                }*/
            });
            row.append('<td><div class="btn-group" role="group"><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" data-edit="' + users[user]["id"] + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button><button type="button" class="btn btn-danger"data-toggle="modal" data-target="#deleteModal"  data-delete="' + users[user]["id"] + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></td>');
            table.append(row);
        }
    };

    var refreshUsers = function (data) {
        if (localStorageEnabled) {
            localStorage.setItem("users", JSON.stringify(data));
        }
        management.setUsers(data);
        render(management.getUsers());
    };

    var alertSuccess = function (message) {
        $('#alert').addClass("alert-success").removeClass('alert-danger').removeClass("hidden").text(message);
    };

    var alertFail = function (message) {
        $('#alert').addClass("alert-danger").removeClass('alert-success').removeClass("hidden").text(message);
    };

    /*
     /
     /   Código que se ejecuta cada vez que se abre la página
     /
     */


    // Para mejorar la UX he hecho uso de algunas de las APIS de HTML 5
    // En primer lugar he utilizado la api localStorage con el fin de que los
    // usuarios se guarden en local. De esta forma cuando un usuario recarga la
    // página sólo notará que se está haciendo la petición AJAX si es la primera vez
    // que accede.
    // Esto tiene una pega, y es que los datos se guardan en claro en el navegador.
    // Una posible vía de mejora sería borrarlos cada vez que un usuario se desloguea.

    // La otra API que he utilizado ha sido la de Web Workers. En este caso
    // ha sido meramente por fines didácticos ya que quería familiarizarme con ella.
    // Esta API nos permite crear pseudo hilos de ejecución paralelos a la ejecución
    // de nuestros Scripts. Es útil cuando se tienen que hacer tareas pesadas.
    // En este caso sólo se ha utilizado para obtener los datos de la API.
    // Cabe destacar que estos hilos no permiten la ejecución de código JQuery por
    // lo que el código que contienen es puro JS.

    // En ambos casos se ha tenido en cuenta que aún hay usuarios que puedan usar
    // navegadores "antiguos" que no tengan implementadas las nuevas APIs de HTML5 y
    // más concretamente estas dos.

    loading = true;
    if (typeof( localStorage["users"] ) !== "undefined" && localStorageEnabled) {
        render($.parseJSON(localStorage.getItem("users")));
        $('.btn-group .btn').each(function () {
            $(this).attr("disabled", "disabled");
        })
    }

    if (typeof ( Worker ) !== "undefined") {
        worker.postMessage({url: "api/users"});
        worker.addEventListener('message', function (e) {
            refreshUsers($.parseJSON(e.data)["users"]);
            loading = false;
            $('.btn-group .btn').each(function () {
                $(this).removeAttr('disabled');
            });
        }, false);
    } else {
        $.getJSON('../api/users', function (data) {
            refreshUsers(data["users"]);
        }).fail(function () {
            alertFail("Connection failed. Try again later");
        }).always(function () {
            loading = false;
            $('.btn-group .btn').each(function () {
                $(this).removeAttr('disabled');
            });
        });
    }
});

/*
 / Definición del modelo de datos de usuarios.
 */

var UsersManagement = function () {
    this.users = ( localStorage.getItem("users") !== "undefined" ) ? localStorage.getItem("users") : {};
};

UsersManagement.prototype = {
    currentId: null,
    constructor: UsersManagement,
    getUsers: function () {
        return this.users;
    },
    setUsers: function (users) {
        this.users = users;
    },
    getConcreteUser: function (id) {
        var result = null;
        for (var user in this.users) {
            if (this.users[user].id == id) {
                result = this.users[user];
            }
        }
        return result;
    },
    getIndexFromID: function (id) {
        var result = 0;
        var salir = false;
        while (result <= this.users.length && !salir) {
            if (this.users[result]["id"] == id) {
                salir = true;
            } else {
                result++;
            }
        }
        return salir ? result : '';
    }

};

/*

 var CourtsManagement = function ( worker ) {

 this.localStorageEnabled = ( typeof ( localStorage ) !== "undefined" );
 this.worker = worker;
 this.users = {};
 this.currentId = null;


 this.CourtsManagement = function ( ) {
 if ( localStorage.users != undefined && this.localStorageEnabled ) {
 this.users = $.parseJSON( localStorage.getItem( "users" ));
 }
 if ( typeof ( worker ) !== "undefined" ) {
 worker.postMessage( {url: "api/users"} );
 worker.addEventListener( 'message', function ( e ) {
 this.users = $.parseJSON( e.data ).users;
 if ( this.localStorageEnabled ) {
 localStorage.setItem( "users", JSON.stringify( this.users ));
 }
 this.renderUsers( );
 }, false );
 } else {
 $.getJSON( '../api/users', function ( data ) {

 } )

 }
 this.renderUsers( );
 };


 this.setJqueryEvents = function ( ) {
 $( '#editModal' ).on( 'show.bs.modal', function ( event ) {
 var id = $( event.relatedTarget ).data( "edit" );
 var user = getConcreteCourt( id );
 $( '#user-id' ).val( id );
 $( '#user-username' ).val( user.name );
 $( '#user-email' ).val( user.email );
 $( '#user-name' ).val( user.firstname );
 $( '#user-surname' ).val( user.surname );
 $( '#user-telephone' ).val( user.telephone );
 $( '#user-enabled' ).prop( 'checked', user.enabled ? true : false );
 $( '#user-roles' ).prop( 'checked', user.roles ? true : false );
 } );

 $( '#apply-edit' ).on( "click", function ( event ) {
 var newUser = {}, id;
 id = $( '#user-id' ).val( );
 newUser[ "name" ] = $( '#user-username' ).val( );
 newUser[ "email" ] = $( '#user-email' ).val( );
 newUser[ "firstname" ] = $( '#user-name' ).val( );
 newUser[ "surname" ] = $( '#user-surname' ).val( );
 newUser[ "telephone" ] = $( '#user-telephone' ).val( );
 newUser[ "enabled" ] = $( '#user-enabled' ).prop( 'checked' ) == true ? 1 : 0;
 newUser[ "roles" ] = $( '#user-roles' ).prop( 'checked' ) == true ? 1 : 0;
 $( '#editModal' ).modal( 'toggle' );
 updateUser( id, newUser );
 } );

 $( '#deleteModal' ).on( 'show.bs.modal', function ( event ) {
 currentId = $( event.relatedTarget ).data( "delete" );

 } );

 $( 'body' ).on( 'click', '#apply-delete', function ( event ) {
 $( "#deleteModal" ).modal( 'toggle' );
 deleteUser( currentId );
 } );

 $( '#add-user' ).on( "click", function ( ) {
 var newUser = {};
 newUser[ "name" ] = $( '#newUser' ).val( );
 newUser[ "email" ] = $( '#newEmail' ).val( );
 newUser[ "password" ] = $( '#newPassword' ).val( );
 newUser[ "firstname" ] = $( '#newFirstName' ).val( );
 newUser[ "surname" ] = $( '#newLastName' ).val( );
 newUser[ "telephone" ] = $( '#newTelephone' ).val( );
 addUser( newUser );
 } );
 };


 this.renderUsers = function ( ) {
 var table = $( "#users-table tbody" );
 table.empty( );
 table.append( );
 for ( var user in users ) {
 var current = users[ user ];
 var row = $( '<tr></tr>' );
 for ( var value in current ) {
 row.append( '<td>' + current[ value ] + '</td>' );
 }
 row.append( '<td><div class="btn-group" role="group"><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" data-edit="' + users[ user ].id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button><button type="button" class="btn btn-danger"data-toggle="modal" data-target="#deleteModal"  data-delete="' + users[ user ].id + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></td>' );
 table.append( row );
 }
 };


 this.getConcreteCourt = function ( id ) {
 var result = null;
 for ( var user in users ) {
 if ( users[ user ].id == id ) {
 result = users[ user ];
 }
 }
 return result;
 };

 this.getIndexFromID = function ( id ) {
 var result = 0;
 var salir = false;
 while ( result <= users.length && !salir ) {
 if ( users[ result]["id" ] == id ) {
 salir = true;
 } else {
 result++;
 }
 }
 return salir ? result : '';
 };

 this.addUser = function ( data ) {
 $.ajax( {
 url: "../api/users",
 method: "POST",
 data: JSON.stringify( data ),
 contentType: 'application/json',
 dataType: 'json',
 success: function ( data ) {
 var newUser = data.user;
 users.push( newUser );
 alertSuccess( data.message );
 refreshUsers( );
 },
 error: function ( xhr ) {
 alertFail( "User couldn't be created. Reason: " + JSON.parse( xhr.responseText ).error );
 }
 } );
 };

 this.alertSuccess = function ( message ) {
 $( '#alert' ).addClass( "alert-success" ).removeClass( 'alert-danger' ).removeClass( "hidden" ).text( message );
 };

 this.alertFail = function ( message ) {
 $( '#alert' ).addClass( "alert-danger" ).removeClass( 'alert-success' ).removeClass( "hidden" ).text( message );
 };

 this.refreshUsers = function ( ) {
 if ( localStorageEnabled ) {
 localStorage.setItem( "users", JSON.stringify( users ));
 }
 renderUsers( );
 };

 this.updateUser = function ( id, data ) {
 $.ajax( {
 url: "../api/users/" + id,
 method: "PUT",
 data: data,
 success: function ( data ) {
 var index = this.getIndexFromID( id );
 this.users[ index ] = data.user;
 this.refreshUsers( );
 this.alertSuccess( data.message );
 },
 error: function ( xhr ) {
 alertFail( "The user hasn't been updated. Reason: " + JSON.parse( xhr.responseText ).error );
 }
 } )
 };

 this.deleteUser = function ( id ) {
 $.ajax( {
 url: "../api/users/" + id,
 method: "DELETE",
 success: function ( response ) {
 var index = getIndexFromID( id );
 users.splice( index, 1 );
 alertSuccess( "User removed successfully" );
 refreshUsers( );
 },
 error: function ( xhr ) {
 alertFail( "The user hasn't been removed. Reason: " + JSON.parse( xhr.responseText ).error );
 }
 } );
 };
 };
 */




/*function CourtsManagement( TheWorker ) {
 if ( localStorage.users != undefined && this.localStorageEnabled ) {
 this.users = $.parseJSON( localStorage.getItem( "users" ));
 }
 if ( typeof ( worker ) !== "undefined" ) {
 TheWorker.postMessage( {url: "api/users"} );
 TheWorker.addEventListener( 'message', function ( e ) {
 this.users = $.parseJSON( e.data ).users;
 if ( this.localStorageEnabled ) {
 localStorage.setItem( "users", JSON.stringify( this.users ));
 }
 this.renderUsers( );
 }, false );
 } else {
 $.getJSON( '../api/users', function ( data ) {
 this.users = $.parseJSON( e.data ).users;
 if ( this.localStorageEnabled ) {
 localStorage.setItem( "users", JSON.stringify( this.users ));
 }
 this.renderUsers( );

 } )

 }
 this.renderUsers( );

 }*/