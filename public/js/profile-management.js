(function () {
    var user;
    
    var init = function () {
        var id = $('#form-user').data('user');

        $.getJSON("../api/users/" + id, function ( data ) {
            user = data.user;
        })
            .done(function () {
            console.log(user);
        })
            .fail(function () {
            console.log("failed");
        });
        console.log(id)
    };

    init();
})();