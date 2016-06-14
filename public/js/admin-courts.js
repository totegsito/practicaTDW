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
            $('#editModal').modal('toggle');
            updateUser(id, newUser);
        });

        $('#deleteModal').on('show.bs.modal', function (event) {
            var id = $(event.relatedTarget).data("delete");
            $('#apply-delete').on('click', {id: id}, function (event) {
                var id = event.data.id;
                $("#deleteModal").modal('toggle');
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

    var alertSuccess = function (message) {
        $('#alert').addClass("alert-success").removeClass('alert-danger');
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
