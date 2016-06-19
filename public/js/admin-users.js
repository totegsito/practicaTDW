$(document).ready(function () {
    var worker;
    if (typeof (Worker) !== "undefined") {
        worker = new Worker("../js/ajax_calls.js");
    }
    var management = new UsersManagement(worker);
    management.start();


    $('#editModal').on('show.bs.modal', function (event) {
        var id = $(event.relatedTarget).data("edit");
        var user = management.getConcreteUser(id);
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
        management.updateUser(id, newUser);
    });

    $('#deleteModal').on('show.bs.modal', function (event) {
        management.currentId = $(event.relatedTarget).data("delete");

    });

    $('body').on('click', '#apply-delete', function () {
        $("#deleteModal").modal('toggle');
        management.deleteUser(management.currentId);
    });

    $('#add-user').on("click", function () {
        var newUser = {};
        newUser["name"] = $('#newUser').val();
        newUser["email"] = $('#newEmail').val();
        newUser["password"] = $('#newPassword').val();
        newUser["firstname"] = $('#newFirstName').val();
        newUser["surname"] = $('#newLastName').val();
        newUser["telephone"] = $('#newTelephone').val();
        management.addUser(newUser);
    });
});


/*function UsersManagement(TheWorker) {
 if (localStorage.users != undefined && this.localStorageEnabled) {
 this.users = $.parseJSON(localStorage.getItem("users"));
 }
 if (typeof (worker) !== "undefined") {
 TheWorker.postMessage({url: "api/users"});
 TheWorker.addEventListener('message', function (e) {
 this.users = $.parseJSON(e.data).users;
 if (this.localStorageEnabled) {
 localStorage.setItem("users", JSON.stringify(this.users));
 }
 this.renderUsers();
 }, false);
 } else {
 $.getJSON('../api/users', function (data) {
 this.users = $.parseJSON(e.data).users;
 if (this.localStorageEnabled) {
 localStorage.setItem("users", JSON.stringify(this.users));
 }
 this.renderUsers();

 })

 }
 this.renderUsers();

 }*/

var UsersManagement = function (worker) {
    this.worker = worker;
    this.localStorageEnabled = ( typeof ( localStorage ) !== "undefined");
    this.users = (localStorage.getItem("users") !== "undefined") ? localStorage.getItem("users") : {};
};


UsersManagement.prototype = {
    currentId: null,
    constructor: UsersManagement,
    renderUsers: function () {
        console.log("estoy renderizando");
        var table = $("#users-table tbody");
        table.empty();
        table.append();
        for (var user in this.users) {
            var current = this.users[user];
            var row = $('<tr></tr>');
            for (var value in current) {
                row.append('<td>' + current[value] + '</td>');
            }
            row.append('<td><div class="btn-group" role="group"><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" data-edit="' + this.users[user].id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button><button type="button" class="btn btn-danger"data-toggle="modal" data-target="#deleteModal"  data-delete="' + this.users[user].id + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></td>');
            table.append(row);
        }
    },
    start: function () {
        if (localStorage.users != undefined && this.localStorageEnabled) {
            this.users = $.parseJSON(localStorage.getItem("users"));
        }
        if (typeof ( Worker ) !== "undefined") {
            this.worker.postMessage({url: "api/users"});
            this.worker.addEventListener('message', function (e) {
                this.users = $.parseJSON(e.data).users;
                if (this.localStorageEnabled) {
                    localStorage.setItem("users", JSON.stringify(this.users));
                }
            }, false);
        } else {
            $.getJSON('../api/users', function (data) {
                this.users = data.users;
                if (this.localStorageEnabled) {
                    localStorage.setItem("users", JSON.stringify(this.users));
                }
            }).done(function () {
            }).fail(function () {
                UsersManagement.prototype.alertFail("Connection failed. Try again later");
            });
        }
        this.renderUsers();
    },

    /*renderUsers: function () {
        var table = $("#users-table tbody");
        table.empty();
        table.append();
        for (var user in this.users) {
            var current = this.users[user];
            var row = $('<tr></tr>');
            for (var value in current) {
                row.append('<td>' + current[value] + '</td>');
            }
            row.append('<td><div class="btn-group" role="group"><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" data-edit="' + this.users[user].id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button><button type="button" class="btn btn-danger"data-toggle="modal" data-target="#deleteModal"  data-delete="' + this.users[user].id + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></td>');
            table.append(row);
        }
    },*/
    getConcreteUser: function (id) {
        var result = null;
        for (var user in this.users) {
            if (this.users[user].id == id) {
                result = this.users[user];
            }
        }
        return result;
    },
    addUser: function (data) {
        $.ajax({
            url: "../api/users",
            method: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                var newUser = data.user;
                this.users.push(newUser);
                this.alertSuccess(data.message);
                this.refreshUsers();
            },
            error: function (xhr) {
                this.alertFail("User couldn't be created. Reason: " + JSON.parse(xhr.responseText).error);
            }
        });
    },

    alertSuccess: function (message) {
        $('#alert').addClass("alert-success").removeClass('alert-danger').removeClass("hidden").text(message);
    },

    alertFail: function (message) {
        $('#alert').addClass("alert-danger").removeClass('alert-success').removeClass("hidden").text(message);
    },

    refreshUsers: function () {
        if (this.localStorageEnabled) {
            localStorage.setItem("users", JSON.stringify(this.users));
        }

    },

    updateUser: function (id, data) {
        $.ajax({
            url: "../api/users/" + id,
            method: "PUT",
            data: data,
            success: function (data) {
                var result = 0;
                var salir = false;
                while (result <= this.users.length && !salir) {
                    if (this.users[result]["id"] == id) {
                        salir = true;
                    } else {
                        result++;
                    }
                }
                var index = salir ? result : '';
                this.users[index] = data.user;
                this.refreshUsers();
                this.renderUsers();
                this.alertSuccess(data.message);
            },
            error: function (xhr) {
                this.alertFail("The user hasn't been updated. Reason: " + JSON.parse(xhr.responseText).error);
            }
        })
    },
    deleteUser: function (id) {
        $.ajax({
            url: "../api/users/" + id,
            method: "DELETE",
            success: function (response) {
                var result = 0;
                var salir = false;
                while (result <= this.users.size && !salir) {
                    if (this.users[result]["id"] == id) {
                        salir = true;
                    } else {
                        result++;
                    }
                }
                var index = salir ? result : '';
                this.users.splice(index, 1);
                this.alertSuccess("User removed successfully");
                this.refreshUsers();
            },
            error: function (xhr) {
                this.alertFail("The user hasn't been removed. Reason: " + JSON.parse(xhr.responseText).error);
            }
        });
    }

};

/*

 var UsersManagement = function (worker) {

 this.localStorageEnabled = ( typeof ( localStorage ) !== "undefined" );
 this.worker = worker;
 this.users = {};
 this.currentId = null;


 this.UsersManagement = function () {
 if (localStorage.users != undefined && this.localStorageEnabled) {
 this.users = $.parseJSON(localStorage.getItem("users"));
 }
 if (typeof (worker) !== "undefined") {
 worker.postMessage({url: "api/users"});
 worker.addEventListener('message', function (e) {
 this.users = $.parseJSON(e.data).users;
 if (this.localStorageEnabled) {
 localStorage.setItem("users", JSON.stringify(this.users));
 }
 this.renderUsers();
 }, false);
 } else {
 $.getJSON('../api/users', function (data) {

 })

 }
 this.renderUsers();
 };


 this.setJqueryEvents = function () {
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


 this.renderUsers = function () {
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


 this.getConcreteUser = function (id) {
 var result = null;
 for (var user in users) {
 if (users[user].id == id) {
 result = users[user];
 }
 }
 return result;
 };

 this.getIndexFromID = function (id) {
 var result = 0;
 var salir = false;
 while (result <= users.length && !salir) {
 if (users[result]["id"] == id) {
 salir = true;
 } else {
 result++;
 }
 }
 return salir ? result : '';
 };

 this.addUser = function (data) {
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

 this.alertSuccess = function (message) {
 $('#alert').addClass("alert-success").removeClass('alert-danger').removeClass("hidden").text(message);
 };

 this.alertFail = function (message) {
 $('#alert').addClass("alert-danger").removeClass('alert-success').removeClass("hidden").text(message);
 };

 this.refreshUsers = function () {
 if (localStorageEnabled) {
 localStorage.setItem("users", JSON.stringify(users));
 }
 renderUsers();
 };

 this.updateUser = function (id, data) {
 $.ajax({
 url: "../api/users/" + id,
 method: "PUT",
 data: data,
 success: function (data) {
 var index = this.getIndexFromID(id);
 this.users[index] = data.user;
 this.refreshUsers();
 this.alertSuccess(data.message);
 },
 error: function (xhr) {
 alertFail("The user hasn't been updated. Reason: " + JSON.parse(xhr.responseText).error);
 }
 })
 };

 this.deleteUser = function (id) {
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
 };
 */
