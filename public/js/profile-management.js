(function () {
    var user;
    var localStorageEnabled = (typeof (localStorage) !== "undefined");

    var init = function () {
        var id = $('#form-user').data('user');

        if(localStorageEnabled){
            user = $.parseJSON(localStorage.getItem("user"));
        }

        $.getJSON("../api/users/" + id, function ( data ) {
            user = data.user;
        })
            .done(function () {
                if( localStorageEnabled ){
                    localStorage.setItem("user", JSON.stringify(user));
                }
                renderData();
        })
            .fail(function () {
                alertFail("Connection failed. Try again later.")
            console.log("failed");
        });
        renderData();
    };


    var renderData = function () {
        $('#showName').text(user["name"]);
        $('#showEmail').text(user["email"]);
        $('#showFirstname').text(user["firstname"]);
        $('#showSurname').text(user["surname"]);
        $('#showTelephone').text(user["telephone"]);

        $('#inputName').val(user["name"]);
        $('#inputEmail').val(user["email"]);
        $('#inputFirstname').val(user["firstname"]);
        $('#inputLastname').val(user["surname"]);
        $('#inputTelephone').val(user["telephone"]);
    };

    var updateUser = function (data) {
        
    };

    var alertSuccess = function (message) {
        $('#alert').addClass("alert-success").removeClass('alert-danger').removeClass("hidden").text(message);
    };

    var alertFail = function (message) {
        $('#alert').addClass("alert-danger").removeClass('alert-success').removeClass("hidden").text(message);
    };

    init();
})();