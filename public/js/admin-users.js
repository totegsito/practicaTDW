var UsersManagement = function (worker) {

    this.worker = worker;
    var users = {};
    var currentId;

    var init = function () {
        if (localStorage.users != undefined) {
            users = $.parseJSON(localStorage.getItem("users")).users;
        }
        worker.postMessage({url: "api/users"});
        worker.addEventListener('message', function (e) {
            users = $.parseJSON(e.data).users;
            localStorage.setItem("users", JSON.stringify(users));
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
            $('#editModal').modal('toggle');
            updateUser(id, newUser);
        });

        $('#deleteModal').on('show.bs.modal', function (event) {
            currentId = $(event.relatedTarget).data("delete");

        });
        
        $('body').on('click', '#apply-delete', function (event) {
            console.log(currentId);
            $("#deleteModal").modal('toggle');
            deleteUser(currentId);
        });

        $('#add-user').on("click", function () {
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
        var table = $("#users-table tbody");
        table.empty();
        table.append();
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
            if (users[result]["id"] == id) {
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
                alertFail("User couldn't be created. Reason: " + JSON.parse(xhr.responseText).error);
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

    var updateUser = function(id, data) {
        $.ajax({
            url: "../api/users/" + id,
            method: "PUT",
            data: data,
            success: function (data) {
                var index = getIndexFromID(id);
                users[index] = data.user;
                refreshUsers();
                alertSuccess(data.message);
            },
            error: function (xhr) {
                alertFail("The user hasn't been updated. Reason: " + JSON.parse(xhr.responseText).error);
            }
        })
    };

    var deleteUser = function(id) {
        $.ajax({
            url: "../api/users/" + id,
            method: "DELETE",
            success: function (response) {
                var index = getIndexFromID(id);
                users.splice(index, 1);
                alertSuccess("User removed successfully");
                refreshUsers();
            },
            error: function (xhr) {
                alertFail("The user hasn't been removed. Reason: " + JSON.parse(xhr.responseText).error);
            }
        });
    };

    init();
};
