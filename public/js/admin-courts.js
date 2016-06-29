$( document ).ready( function ( ) {
    var worker;
    if ( typeof ( Worker ) !== "undefined" ) {
        worker = new Worker( "../js/ajax_calls.js" );
    }
    var management = new CourtsManagement( );
    var localStorageEnabled = ( typeof ( localStorage ) !== "undefined" );

    var loading = false;

    var cuerpo = $( 'body' );
    
    /*
     /
     / Declaración de eventos
     /
     */

    cuerpo.on( 'show.bs.modal', '#editModal', function ( event ) {
        var id = $( event.relatedTarget ).data( "edit" );
        var court = management.getConcreteCourt( id );
        $( '#edit-confirm' ).text( (court[ "avaliable" ] == 1 ) ? "disable" : "enable" );
        management.setCurrentId( id );
    } );

    cuerpo.on( "click", '#apply-edit', function ( ) {
        var newcourt, id = management.getCurrentId( );
        newcourt = management.getConcreteCourt( id );

        console.log( typeof ( newcourt[ "avaliable" ] ) );
        if( newcourt[ "avaliable" ]){
            newcourt[ "avaliable" ] = Number(0);
        }else{
            newcourt[ "avaliable" ] = Number(1);
        }
        console.log( newcourt );

        $( '#editModal' ).modal( 'toggle' );
        updateAJAX( newcourt, id );
    } );

    cuerpo.on( 'show.bs.modal', '#deleteModal', function ( event ) {
        management.setCurrentId( $( event.relatedTarget ).data( "delete" ));
    } );

    cuerpo.on( 'click', '#apply-delete', function ( ) {
        $( "#deleteModal" ).modal( 'toggle' );
        deleteAJAX( management.getCurrentId( ) );
    } );

    cuerpo.on( "click", '#add', function ( ) {
        postAJAX( {} );
    } );


    /*
     /
     /   Declaración de las llamadas AJAX
     /
     */

    var deleteAJAX = function ( id ) {
        if ( !loading ) {
            loading = true;
            $.ajax( {
                url: "../api/courts/" + id,
                method: "DELETE",
                success: function ( ) {
                    var courts = management.getCourts( );
                    var index = management.getIndexFromID( id );
                    courts.splice( index, 1 );
                    alertSuccess( "court removed successfully" );
                    refreshCourts( courts );
                },
                error: function ( xhr ) {
                    alertFail( "The court hasn't been removed. Reason: " + JSON.parse( xhr.responseText ).error );
                },
                complete: function ( ) {
                    loading = false;
                }
            } );
        }
    };

    var postAJAX = function ( data ) {
        if ( !loading ) {
            loading = true;
            $.ajax( {
                url: "../api/courts",
                method: "POST",
                data: JSON.stringify( data ),
                contentType: 'application/json',
                dataType: 'json',
                success: function ( data ) {
                    var courts = management.getCourts( );
                    courts.push( data[ "court" ]);
                    alertSuccess( data.message );
                    refreshCourts( courts );
                    $( '#addcourtForm' ).each( function ( ) {
                        this.reset( );
                    } );
                },
                error: function ( xhr ) {
                    alertFail( "court couldn't be created. Reason: " + JSON.parse( xhr.responseText ).error );
                },
                complete: function ( ) {
                    loading = false;
                }
            } );
        }
    };

    var updateAJAX = function ( data, id ) {
        if ( !loading ) {
            loading = true;
            $.ajax( {
                url: "../api/courts/" + id,
                method: "PUT",
                data: data,
                success: function ( data ) {
                    var courts = management.getCourts( );
                    var index = management.getIndexFromID( id );
                    console.log(typeof (data["court"]["id"]));
                    courts[ index ] = data["court"];
                    refreshCourts( courts );
                    alertSuccess( data.message );
                },
                error: function ( xhr ) {
                    alertFail( "The court hasn't been updated. Reason: " + JSON.parse( xhr.responseText ).error );
                },
                complete: function ( ) {
                    loading = false;
                }
            } );
        }
    };


    /*
     /
     /   Declaración de las funciones
     /
     */

    var render = function ( data ) {
        var courts = data;
        var courtsSpace = $( "#courts-space" );
        var addCourt = $( '#add-court' );
        courtsSpace.empty( );
        for ( var court in courts ) {
            var current = courts[ court ];
            var col = $( '<div></div>' ).addClass( "col-xs-12 col-sm-6 col-md-4" ).appendTo( courtsSpace );
            var panel = $( '<div></div>' ).addClass( "panel panel-"+( Boolean( current[ "avaliable" ]) ? "success" : "danger" )).appendTo( col );
            var panelHeading = $( '<div></div>' ).addClass( "panel-heading" ).appendTo( panel );
            var heading = $( '<h4></h4>' ).text( "Court " + ( Number( court ) + 1 )).appendTo( panelHeading );
            var tableCourt = $( '<table></table>' ).addClass( 'table success table-bordered court' ).appendTo( panel );
            for ( var i = 0; i < 2; i++ ) {
                var row = $( '<tr></tr>' ).addClass( Boolean( current[ "avaliable" ]) ? "success" : "danger" ).appendTo( tableCourt );
                for ( var j = 0; j < 2; j++ ) {
                    var cell = $( '<td></td>' ).appendTo( row );
                    var cellText = $( '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>' ).appendTo( cell );
                }
            }
            var panelFooter = $( '<div></div>' ).addClass( "panel-footer" ).appendTo( panel );
            var buttonGroup = $( '<div></div>' ).addClass( "btn-group" ).attr( "role", "group" ).appendTo( panelFooter )
            var editButton = $( '<button data-toggle="modal" data-target="#editModal" data-edit="' + courts[ court ][ "id" ] + '" data-avaliable="'+courts[ court ][ "avaliable" ]+'"></button>' ).addClass( "btn btn-warning" ).appendTo( buttonGroup );
            var editIcon = $( '<span></span>' ).addClass( "glyphicon glyphicon-edit" ).appendTo( editButton );
            var deleteButton = $( '<button data-toggle="modal" data-target="#deleteModal" data-delete="' + courts[ court ].id + '"></button>' ).addClass( "btn btn-danger" ).appendTo( buttonGroup );
            var deleteIcon = $( '<span></span>' ).addClass( "glyphicon glyphicon-trash" ).appendTo( deleteButton );
        }
        addCourt.appendTo( courtsSpace )

    };

    var refreshCourts = function ( data ) {
        console.log( data );
        if ( localStorageEnabled ) {
            localStorage.setItem( "courts", JSON.stringify( data ));
        }
        management.setCourts( data );
        render( management.getCourts( ) );
        console.log(management.getCourts());
    };

    var alertSuccess = function ( message ) {
        $( '#alert' ).addClass( "alert-success" ).removeClass( 'alert-danger' ).removeClass( "hidden" ).text( message );
    };

    var alertFail = function ( message ) {
        $( '#alert' ).addClass( "alert-danger" ).removeClass( 'alert-success' ).removeClass( "hidden" ).text( message );
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

    if ( typeof( localStorage[ "courts" ] ) !== "undefined" && localStorageEnabled ) {
        render( $.parseJSON( localStorage.getItem( "courts" )) );
    }

    loading = true;
    if ( typeof ( Worker ) !== "undefined" ) {
        worker.postMessage( {url: "api/courts"} );
        worker.addEventListener( 'message', function ( e ) {
            refreshCourts( $.parseJSON( e.data )[ "courts" ]);
            loading = false;
        }, false );
    } else {
        $.getJSON( '../api/courts', function ( data ) {
            refreshCourts( data[ "courts" ]);
        } ).fail( function ( ) {
            alertFail( "Connection failed. Try again later" );
        } ).always( function ( ) {
            loading = false;
        } );
    }
} );

var CourtsManagement = function ( ) {
    if( typeof ( localStorage ) !== "undefined" ){
        this.courts = ( localStorage.getItem( "courts" ) !== "undefined" ) ? $.parseJSON( localStorage.getItem( "courts" ) ) : {};
    }else{
        this.courts = {};
    }
};

CourtsManagement.prototype = {
    currentId: null,
    constructor: CourtsManagement,
    getCourts: function ( ) {
        return this.courts;
    },
    // Fuerzo a trabajar siempre con números
    setCourts: function ( courts ) {
        this.courts = courts;
        this.courts.forEach(function (k) {
            k["avaliable"] = Number(k["avaliable"])
        });
    },
    getCurrentId: function ( ) {
        return this.currentId;
    },
    setCurrentId: function ( id ) {
        this.currentId = id;
    }
    ,
    getConcreteCourt: function ( id ) {
        var result = null;
        for ( var court in this.courts ) {
            if ( this.courts[ court ][ "id" ] === id ) {
                result = this.courts[ court ];
            }
        }
        return result;
    },
    getIndexFromID: function ( id ) {
        var result = 0;
        var salir = false;
        while ( result <= this.courts.length && !salir ) {
            if ( this.courts[ result ][ "id" ] == id ) {
                salir = true;
            } else {
                result++;
            }
        }
        return salir ? result : '';
    }

};


/*var CourtsManagement = function ( worker ) {
 var courts = {};
 this.worker = worker;
 var loading = false;
 var currentId;


 //TODO: Hay que refinar más esta funcionalidad


 var init = function ( ) {
 loading = true;
 if ( localStorage.courts != undefined ) {
 courts = $.parseJSON( localStorage.getItem( "courts" )).courts;
 }
 worker.postMessage( {url: "api/courts"} );
 //worker.postMessage( {url: "api/courts"} );
 worker.addEventListener( 'message', function ( e ) {
 var response = $.parseJSON( e.data );
 localStorage.setItem( "courts", JSON.stringify( response[ "courts" ]) );
 courts = response[ "courts" ];
 renderCourts( );
 }, false );
 renderCourts( );
 setJQueryEvents( );
 loading = false;
 };

 var setJQueryEvents = function ( ) {
 $( '#editModal' ).on( 'show.bs.modal', function ( event ) {
 currentId = $( event.relatedTarget ).data( "edit" );
 var court  = getConcreteCourt( currentId );
 $( '#edit-confirm' ).text( court[ "avaliable" ] ? "disable" : "enable" );
 } );

 $( '#apply-edit' ).on( "click", function ( ) {
 if( !loading ){
 var newCourt = {};
 var currentCourt = courts[ getIndexFromID( currentId )];
 newCourt[ "avaliable" ] = Number( !currentCourt[ "avaliable" ]);
 $( '#editModal' ).modal( 'toggle' );
 updateCourt( currentId, newCourt );
 }
 } );

 $( '#deleteModal' ).on( 'show.bs.modal', function ( event ) {
 currentId = $( event.relatedTarget ).data( "delete" );
 } );

 $( '#apply-delete' ).on( 'click', {id: currentId}, function ( event ) {
 if( !loading ){
 $( "#deleteModal" ).modal( 'toggle' );
 deleteCourt( currentId );
 }
 } );

 $( 'body' ).on( "click", '#add', function ( ) {
 if( !loading ){
 addCourt( );
 }
 } );
 };

 var renderCourts = function ( ) {
 var courtsSpace = $( "#courts-space" );
 var addCourt = $( '#add-court' );
 courtsSpace.empty( );
 for ( var court in courts ) {
 var current = courts[ court ];
 var col = $( '<div></div>' ).addClass( "col-xs-6" ).appendTo( courtsSpace );
 var panel = $( '<div></div>' ).addClass( "panel panel-primary" ).appendTo( col );
 var panelHeading = $( '<div></div>' ).addClass( "panel-heading" ).appendTo( panel );
 var heading = $( '<h3></h3>' ).text( "Court " + ( Number( court ) + 1 )).appendTo( panelHeading );
 var tableCourt = $( '<table></table>' ).addClass( 'table success table-bordered court' ).appendTo( panel );
 for ( var i = 0; i < 2; i++ ) {
 var row = $( '<tr></tr>' ).addClass( Boolean( courts[ court ][ "avaliable" ]) ? "success" : "danger" ).appendTo( tableCourt );
 for ( var j = 0; j < 2; j++ ) {
 var cell = $( '<td></td>' ).appendTo( row );
 var cellText = $( '<span class="glyphicon glyphicon-court" aria-hidden="true"></span>' ).appendTo( cell );
 }
 }
 var panelFooter = $( '<div></div>' ).addClass( "panel-footer" ).appendTo( panel );
 var buttonGroup = $( '<div></div>' ).addClass( "btn-group" ).attr( "role", "group" ).appendTo( panelFooter )
 var editButton = $( '<button data-toggle="modal" data-target="#editModal" data-edit="' + courts[ court ].id + '"></button>' ).addClass( "btn btn-warning" ).appendTo( buttonGroup );
 var editIcon = $( '<span></span>' ).addClass( "glyphicon glyphicon-edit" ).appendTo( editButton );
 var deleteButton = $( '<button data-toggle="modal" data-target="#deleteModal" data-delete="' + courts[ court ].id + '"></button>' ).addClass( "btn btn-danger" ).appendTo( buttonGroup );
 var deleteIcon = $( '<span></span>' ).addClass( "glyphicon glyphicon-trash" ).appendTo( deleteButton );
 }
 addCourt.appendTo( courtsSpace )
 };


 var addCourt = function ( ) {
 loading = true;
 $.ajax( {
 url: "../api/courts",
 method: "POST",
 data: JSON.stringify( {avaliable: 0} ),
 contentType: 'application/json',
 dataType: 'json',
 success: function ( data ) {
 var newCourt = data.court;
 courts.push( newCourt );
 refreshCourts( );
 alertSuccess( data.message );
 },
 error: function ( xhr ) {
 alertFail( "Court couldn't be created. Reason: " + JSON.parse( xhr.responseText ).error );
 }
 } );
 loading = false;
 };

 var updateCourt = function( id, data ) {
 loading = true;
 console.log( "estoy enviando: " + JSON.stringify( data ));
 $.ajax( {
 url: "../api/courts/" + id,
 method: "PUT",
 data: data,
 success: function ( data ) {
 var index = getIndexFromID( id );
 courts[ index ] = data.court;
 console.log( courts[ index ]);
 refreshCourts( );
 alertSuccess( data.message );
 },
 error: function ( xhr ) {
 alertFail( "The court hasn't been updated. Reason: " + JSON.parse( xhr.responseText ).error );
 }
 } );
 loading = false;
 };

 var getConcreteCourt = function ( id ) {
 var result, i=0;
 while( i < courts.length && result == undefined ){
 if( courts[ i ].id==id )
 result = courts[ i ];
 i++;
 }
 return result;
 };

 var alertSuccess = function ( message ) {
 $( '#alert' ).addClass( "alert-success" ).removeClass( 'alert-danger' ).removeClass( "hidden" ).text( message );
 };

 var alertFail = function ( message ) {
 $( '#alert' ).addClass( "alert-danger" ).removeClass( 'alert-success' ).removeClass( "hidden" ).text( message );
 };

 var getIndexFromID = function ( id ) {
 var result = 0;
 var exit = false;
 while ( result <= courts.length && !exit ) {
 if ( courts[ result ][ "id" ] == id ) {
 exit = true;
 }else{
 result++;
 }
 }
 return exit ? result : '';
 };

 var refreshCourts = function ( ) {
 localStorage.setItem( "courts", JSON.stringify( courts ));
 renderCourts( );
 };

 var deleteCourt = function ( id ) {
 loading = true;
 $.ajax( {
 url: "../api/courts/" + id,
 method: "DELETE",
 success: function ( data ) {
 var index = getIndexFromID( id );
 courts.splice( index - 1, 1 );
 refreshCourts( );
 alertSuccess( "Court removed successfully" );
 },
 error: function ( xhr ) {
 alertFail( "Court hasn't been removed. Reason: " + JSON.parse( xhr.responseText ).error );
 }
 } );
 loading = false;
 };


 init( );
 };*/
