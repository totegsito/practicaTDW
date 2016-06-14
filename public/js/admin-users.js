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
            }else{
                result++;
            }
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
                alertSuccess(data.message);
                refreshUsers();
            },
            error: function (xhr) {
                alertFail("No se ha podido crear el usuario. Problema: " + JSON.parse(xhr.responseText).error);
            }
        });
    };

    var alertSuccess = function (message) {
        $('#alert').addClass("alert-success").removeClass('alert-danger').removeClass("hidden").text(message);
    };

    var alertFail = function (message) {
        $('#alert').addClass("alert-danger").removeClass('alert-success').removeClass("hidden").text(message);
    };

    var refreshUsers = function () {
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    };

    var updateUser = function (id, data) {
        $.ajax({
            url: "../api/users/" + id,
            method: "PUT",
            data: data,
            success: function (data) {
                $('#editModal').modal('toggle');
                var index = getIndexFromID(id);
                users[index] = data.user;
                refreshUsers();
                alertSuccess(data.message);
            },
            error: function (xhr) {
                alertFail("No se ha podido actualizar el usuario. Problema: " + JSON.parse(xhr.responseText).error);

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
                users.splice(index, 1);
                alertSuccess(data.message);
                refreshUsers();
            },
            error: function (xhr) {
                alertFail("No se ha podido eliminar el usuario. Problema: " + JSON.parse(xhr.responseText).error);
            }
        });
    };

    init();
};
