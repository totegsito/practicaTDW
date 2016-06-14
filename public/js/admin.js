var UsersManagement = function (worker) {

    this.worker = worker;
    var users = {};

    var init = function () {
        if (localStorage.users != undefined) {
            users = $.parseJSON(localStorage.getItem("users")).users;
        }
        // Para reducir la carga inicial del navegador al pedir la primera petición
        // a la api se ha utilizado un web worker.
        setInterval(worker.postMessage({url: "api/users"}), 60000);
        //worker.postMessage({url: "api/users"});
        worker.addEventListener('message', function (e) {
            localStorage.setItem("users", e.data);
            users = $.parseJSON(e.data).users;
            renderUsers();
        }, false);
        renderUsers();
        setJqueryEvents();
    };


    var setJqueryEvents = function () {
        $('#editModal').on('show.bs.modal', function (event) {
            var id = $(event.relatedTarget).data("edit");
            var user = getConcreteUser(id);
            $('#user-id').val(id);
            $('#user-username').val(user.name);
            $('#user-email').val(user.email);
            $('#user-name').val(user.firstname);
            $('#user-surname').val(user.surname);
            $('#user-telephone').val(user.telephone);
            $('#user-enabled').prop('checked', user.enabled ? true : false);
            $('#user-roles').prop('checked', user.roles ? true : false);
        });

        $('#apply-edit').on("click", function (event) {
            var newUser = {}, id;
            id = $('#user-id').val();
            newUser["name"] = $('#user-username').val();
            newUser["email"] = $('#user-email').val();
            newUser["firstname"] = $('#user-name').val();
            newUser["surname"] = $('#user-surname').val();
            newUser["telephone"] = $('#user-telephone').val();
            newUser["enabled"] = $('#user-enabled').prop('checked') == true ? 1 : 0;
            newUser["roles"] = $('#user-roles').prop('checked') == true ? 1 : 0;
            updateUser(id, newUser);
        });

        $('#deleteModal').on('show.bs.modal', function (event) {
            var id = $(event.relatedTarget).data("delete");
            $('#apply-delete').on('click', {id: id}, function (event) {
                var id = event.data.id;
                deleteUser(id);
            });
        });

        $('#add-user').on("click", function (event) {
            var newUser = {};
            newUser["name"] = $('#newUser').val();
            newUser["email"] = $('#newEmail').val();
            newUser["password"] = $('#newPassword').val();
            newUser["firstname"] = $('#newFirstName').val();
            newUser["surname"] = $('#newLastName').val();
            newUser["telephone"] = $('#newTelephone').val();
            addUser(newUser);
        });
    };


    var renderUsers = function () {
        var table = $("#users-table");
        table.empty();
        table.append('<tr>' +
            '<th>Id</th>' +
            '<th>Username</th>' +
            '<th>Email</th>' +
            '<th>Name</th>' +
            '<th>Surname</th>' +
            '<th>Telephone</th>' +
            '<th>Enabled</th>' +
            '<th>Role</th>' +
            '<th>Options</th>' +
            '</tr>');
        for (var user in users) {
            var current = users[user];
            var row = $('<tr></tr>');
            for (var value in current) {
                row.append('<td>' + current[value] + '</td>');
            }
            row.append('<td><div class="btn-group" role="group"><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" data-edit="' + users[user].id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button><button type="button" class="btn btn-danger"data-toggle="modal" data-target="#deleteModal"  data-delete="' + users[user].id + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></td>');
            table.append(row);
        }
    };


    var getConcreteUser = function (id) {
        var result = null;
        for (var user in users) {
            if (users[user].id == id) {
                result = users[user];
            }
        }
        return result;
    };

    var getIndexFromID = function (id) {
        var result = 0;
        var salir = false;
        while (result <= users.length && !salir) {
            if (users[result].id == id) {
                salir = true;
            }
            result++;
        }
        return salir ? result : '';
    };

    var addUser = function (data) {
        $.ajax({
            url: "../api/users",
            method: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                var newUser = data.user;
                users.push(newUser);
                localStorage.setItem("users", users);
            },
            error: function (xhr) {
                console.log("Estoy en fail", xhr)
            }
        });
    };

    var updateUser = function (id, data) {
        $.ajax({
            url: "../api/users/" + id,
            method: "PUT",
            data: data,
            success: function (data) {
                console.log("Estoy en success", data);
            },
            error: function (xhr) {
                console.log("Estoy en fail", xhr)
            }
        })
    };

    var deleteUser = function (id) {
        $.ajax({
            url: "../api/users/" + id,
            method: "DELETE",
            success: function (data) {
                $("#deleteModal").modal('toggle');
                var index = getIndexFromID(id);
                users.splice(index - 1, 1);
                localStorage.setItem("users", JSON.stringify(users));
                renderUsers();
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    };

    init();
};

var CourtsManagement = function (worker) {
    var courts = {};
    this.worker = worker;

    var init = function () {
        if (localStorage.courts != undefined) {
            courts = $.parseJSON(localStorage.getItem("courts")).courts;

        }
        // Para reducir la carga inicial del navegador al pedir la primera petición
        // a la api se ha utilizado un web worker.
        setInterval(worker.postMessage({url: "api/courts"}), 60000);
        //worker.postMessage({url: "api/users"});
        worker.addEventListener('message', function (e) {
            localStorage.setItem("courts", e.data);
            courts = $.parseJSON(e.data).courts;
            renderCourts();
        }, false);
        renderCourts();
        setJQueryEvents();
    };

    var setJQueryEvents = function () {
        $('#editModal').on('show.bs.modal', function (event) {
            var id = $(event.relatedTarget).data("edit");
            var court = getConcreteCourt(id);

        });

        $('#apply-edit').on("click", function (event) {
            var newUser = {}, id;
            id = $('#user-id').val();
            newUser["name"] = $('#user-username').val();
            newUser["email"] = $('#user-email').val();
            newUser["firstname"] = $('#user-name').val();
            newUser["surname"] = $('#user-surname').val();
            newUser["telephone"] = $('#user-telephone').val();
            newUser["enabled"] = $('#user-enabled').prop('checked') == true ? 1 : 0;
            newUser["roles"] = $('#user-roles').prop('checked') == true ? 1 : 0;
            updateUser(id, newUser);
        });

        $('#deleteModal').on('show.bs.modal', function (event) {
            var id = $(event.relatedTarget).data("delete");
            $('#apply-delete').on('click', {id: id}, function (event) {
                var id = event.data.id;
                console.log("Aquí estoy");
                deleteCourt(id);
            });
        });

        $('#add-court').on("click", '#add', function (event) {
            console.log("Here I am");
            addCourt();
        });
    };

    var renderCourts = function () {
        var courtsSpace = $("#courts-space");
        var addCourt = $('#add-court');
        courtsSpace.empty();
        for (var court in courts) {
            var current = courts[court];
            var col = $('<div></div>').addClass("col-xs-6").appendTo(courtsSpace);
            var panel = $('<div></div>').addClass("panel panel-primary").appendTo(col);
            var panelHeading = $('<div></div>').addClass("panel-heading").appendTo(panel);
            var heading = $('<h3></h3>').text("Court " + (Number(court) + 1)).appendTo(panelHeading);
            var tableCourt = $('<table></table>').addClass('table success table-bordered court').appendTo(panel);
            for (var i = 0; i < 2; i++) {
                var row = $('<tr></tr>').addClass(current.avaliable ? "success" : "danger" ).appendTo(tableCourt);
                for (var j = 0; j < 2; j++) {
                    var cell = $('<td></td>').appendTo(row);
                    var cellText = $('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>').appendTo(cell);
                }
            }
            var panelFooter = $('<div></div>').addClass("panel-footer").appendTo(panel);
            var buttonGroup = $('<div></div>').addClass("btn-group").attr("role", "group").appendTo(panelFooter)
            var editButton = $('<button data-toggle="modal" data-target="#editModal" data-edit="' + courts[court].id + '"></button>').addClass("btn btn-warning").appendTo(buttonGroup);
            var editIcon = $('<span></span>').addClass("glyphicon glyphicon-edit").appendTo(editButton);
            var deleteButton = $('<button data-toggle="modal" data-target="#deleteModal" data-delete="' + courts[court].id + '"></button>').addClass("btn btn-danger").appendTo(buttonGroup);
            var deleteIcon = $('<span></span>').addClass("glyphicon glyphicon-trash").appendTo(deleteButton);
        }
        addCourt.appendTo(courtsSpace)
    };


    var addCourt = function () {
        $.ajax({
            url: "../api/courts",
            method: "POST",
            data: JSON.stringify({avaliable: 0}),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                var newCourt = data.court;
                courts.push(newUser);
                localStorage.setItem("courts", users);
            },
            error: function (xhr) {
                console.log("Estoy en fail", xhr)
            }
        });
    };

    var getConcreteCourt = function (id) {
        var result, i=0;
        while( i < courts.length && result == undefined){
            if(courts[i].id==id)
                result = courts[i];
            i++;
        }
        return result;
    };

    var getIndexFromID = function (id) {
        var result = 0;
        var exit = false;
        while (result <= courts.length && !exit) {
            if (courts[result].id == id) {
                exit = true;
            }
            result++;
        }
        return exit ? result : '';
    };
    
    var deleteCourt = function (id) {
        $.ajax({
            url: "../api/courts/" + id,
            method: "DELETE",
            success: function (data) {
                $("#deleteModal").modal('toggle');
                var index = getIndexFromID(id);
                courts.splice(index - 1, 1);
                localStorage.setItem("courts", JSON.stringify(courts));
                renderCourts();
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    };


    init();
};

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

new App();