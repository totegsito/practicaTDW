$(document).ready(function () {
    var worker;
    if (typeof ( Worker ) !== "undefined") {
        worker = new Worker("../js/ajax_calls.js");
    }
    var management = new IndividualUserManagement(worker), body = $('body'), id = $('#form-user').data('user'), loading = false, localStorageEnabled = ( typeof ( localStorage ) !== "undefined" );

    /*
     /
     / Declaración de eventos
     /
     */
    body.on('show.bs.modal', '#editModal',function (event) {
        var id = $(event.relatedTarget).data("edit");
        var user = management.getUser();
        $('#inputName').val(data["name"]);
        $('#inputEmail').val(data["email"]);
        $('#inputFirstname').val(data["firstname"]);
        $('#inputLastname').val(data["surname"]);
        $('#inputTelephone').val(data["telephone"]);
    });

    body.on("click", '#apply-edit',function (event) {
        var newUser = {};
        newUser["name"] = $('#inputName').val();
        newUser["email"] = $('#inputEmail').val();
        newUser["firstname"] = $('#inputFirstname').val();
        newUser["surname"] = $('#inputLastname').val();
        newUser["telephone"] = $('#inputTelephone').val();
        $('#myModal').modal('toggle');
        updateAJAX(newUser);
    });

    body.on("click", '#apply-password-edit',function (event) {
        var newUser = management.getUser();
        var current = $('#inputOldPassword');
        var newPass = $('#inputNewPassword');
        var confirm = $('#inputConfirmPassword');

        if(current.val() === ""){
            var currentInfo = $('#currentInfo');
            currentInfo.text("Password cannot be empty");
            currentInfo.removeClass('hidden');
            currentInfo.closest('.form-group').addClass('has-error');
        }else if(newPass.val() ===""){
            var newInfo = $('#newInfo');
            newInfo.text("Password cannot be empty");
            newInfo.removeClass('hidden');
            newInfo.closest('.form-group').addClass('has-error');
        }else if(confirm.val() !== newPass.val()){
            var confirmInfo = $('#confirmInfo');
            confirmInfo.text("Passwords don't match");
            confirmInfo.removeClass('hidden');
            confirmInfo.closest('.form-group').addClass('has-error');
        }else{
            newUser['password'] = newPass.val();
            newUser['oldpassword'] = current.val();
            newUser['password_confirmation'] = confirm.val();
            $('#changePasswordModal').modal('toggle');
            $('#changePass').each(function () {
                this.reset();
            });
            updateAJAX(newUser, true);
        }
    });


    
    /*
     /
     /   Declaración de las llamadas AJAX
     /
     */
    
    var updateAJAX = function (data, pass) {
        if (!loading) {
            loading = true;
            $.ajax({
                url: "../api/users/"+ (pass ? 'password/' : '') + id,
                method: "PUT",
                data: data,
                success: function (data) {
                    refreshUser(data["user"]);
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
        $('#showName').text(data["name"]);
        $('#showEmail').text(data["email"]);
        $('#showFirstname').text(data["firstname"]);
        $('#showSurname').text(data["surname"]);
        $('#showTelephone').text(data["telephone"]);

        $('#inputName').val(data["name"]);
        $('#inputEmail').val(data["email"]);
        $('#inputFirstname').val(data["firstname"]);
        $('#inputLastname').val(data["surname"]);
        $('#inputTelephone').val(data["telephone"]);
    };

    var refreshUser = function (data) {
        if (localStorageEnabled) {
            localStorage.setItem("user", JSON.stringify(data));
        }
        management.setUser(data);
        render(management.getUser());
    };

    var alertSuccess = function (message) {
        $('#alert').addClass("alert-success").removeClass('alert-danger').removeClass("hidden").text(message);
    };

    var alertFail = function (message) {
        $('#alert').addClass("alert-danger").removeClass('alert-success').removeClass("hidden").text(message);
    };



    if (typeof( localStorage["user"] ) !== "undefined" && localStorageEnabled) {
        render($.parseJSON(localStorage.getItem("user")));
    }

    loading = true;
    if (typeof ( Worker ) !== "undefined") {

        worker.postMessage({url: "api/users/" + id});
        worker.addEventListener('message', function (e) {
            refreshUser($.parseJSON(e.data)["user"]);
            loading = false;
        }, false);
    } else {
        $.getJSON('../api/users/' + id, function (data) {
            refreshUser(data["user"]);
        }).fail(function () {
            alertFail("Connection failed. Try again later");
        }).always(function () {
            loading = false;
        });
    }

});


var IndividualUserManagement = function (id) {
    var data = {};
    this.user = {};
    if( typeof ( localStorage["currentUser"]) !== "undefined"){
        data = $.parseJSON(localStorage.getItem("currentUser"));
        this.user["id"] = data["id"];
        this.user["name"] = data["name"] || "";
        this.user["email"] = data["email"] || "";
        this.user["firstname"] = data["firstname"] || "";
        this.user["lastname"] = data["lastname"] ||"";
        this.user["telephone"] = data["telephone"] || "";
    }
};

IndividualUserManagement.prototype = {
    constructor: IndividualUserManagement,
    getUser: function () {
        return this.user;
    },
    setUser: function (user) {
        this.user = user;
    },
    getConcreteProperty: function (property) {
        return this.user[property] || "Property not found";
    },
    setConcreteProperty: function (property, val) {
        this.user["property"] = val;
    }
};