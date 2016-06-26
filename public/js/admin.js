/*
var App = function () {

    if (typeof (Worker) !== "undefined") {
        var worker = new Worker("../js/ajax_calls.js"), users, courts, url = window.location.pathname;
        if (url === "/admin/users") {
            users = UsersManagement(worker);
        } else if (url === "/admin/courts") {
            courts = CourtsManagement(worker);
        }
    } else {
        alert("Su navegador no soporta Web Workers");
    }
};

new App();*/
