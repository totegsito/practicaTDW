var CourtsManagement = function (worker) {
    var courts = {};
    this.worker = worker;
    var loading = false;

    var init = function () {
        loading = true;
        if (localStorage.courts != undefined) {
            courts = $.parseJSON(localStorage.getItem("courts")).courts;
            console.log(courts);
        }
        worker.postMessage({url: "api/courts"});
        //worker.postMessage({url: "api/courts"});
        worker.addEventListener('message', function (e) {
            var response = $.parseJSON(e.data);
            localStorage.setItem("courts", JSON.stringify(response["courts"]));
            courts = response["courts"];
            renderCourts();
        }, false);
        renderCourts();
        setJQueryEvents();
        loading = false;
    };

    var getCourts = function () {
        return courts;
    };

    var setCourts = function (newCourts) {
        courts = newCourts;
    };

    var setJQueryEvents = function () {
        $('#editModal').on('show.bs.modal', function (event) {
            currentId = $(event.relatedTarget).data("edit");
            var court  = getConcreteCourt(currentId);
            $('#edit-confirm').text(court["avaliable"] ? "disable" : "enable" );
        });

        $('#apply-edit').on("click", function () {
            if(!loading){
                var newCourt = {};
                var currentCourt = courts[getIndexFromID(currentId)];
                newCourt["avaliable"] = Number(!currentCourt["avaliable"]);
                $('#editModal').modal('toggle');
                updateCourt(currentId, newCourt);
            }
        });

        $('#deleteModal').on('show.bs.modal', function (event) {
            currentId = $(event.relatedTarget).data("delete");
        });
        
        $('#apply-delete').on('click', {id: currentId}, function (event) {
            if(!loading){
                $("#deleteModal").modal('toggle');
                deleteCourt(currentId);
            }
        });

        $('#courts-space').on("click", '#add', function (event) {
            if(!loading){
                addCourt();
            }
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
                var row = $('<tr></tr>').addClass(Boolean(courts[court]["avaliable"]) ? "success" : "danger" ).appendTo(tableCourt);
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
        loading = true;
        $.ajax({
            url: "../api/courts",
            method: "POST",
            data: JSON.stringify({avaliable: 0}),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                var newCourt = data.court;
                courts.push(newCourt);
                alertSuccess(data.message);
            },
            error: function (xhr) {
                alertFail("Court couldn't be created. Reason: " + JSON.parse(xhr.responseText).error);
            }
        });
        loading = false;
    };

    var updateCourt = function(id, data) {
        loading = true;
        console.log("estoy enviando: " + JSON.stringify(data));
        $.ajax({
            url: "../api/courts/" + id,
            method: "PUT",
            data: data,
            success: function (data) {
                var index = getIndexFromID(id);
                courts[index] = data.court;
                refreshCourts();
                alertSuccess(data.message);
            },
            error: function (xhr) {
                alertFail("The court hasn't been updated. Reason: " + JSON.parse(xhr.responseText).error);
            }
        })
        loading = false;
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
        $('#alert').addClass("alert-success").removeClass('alert-danger').removeClass("hidden").text(message);
    };

    var alertFail = function (message) {
        $('#alert').addClass("alert-danger").removeClass('alert-success').removeClass("hidden").text(message);
    };

    var getIndexFromID = function (id) {
        var result = 0;
        var exit = false;
        while (result <= courts.length && !exit) {
            if (courts[result]["id"] == id) {
                exit = true;
            }else{
                result++;
            }
        }
        return exit ? result : '';
    };

    var refreshCourts = function () {
        localStorage.setItem("courts", JSON.stringify(courts));
        renderCourts();
    };

    var deleteCourt = function (id) {
        loading = true;
        $.ajax({
            url: "../api/courts/" + id,
            method: "DELETE",
            success: function (data) {
                var index = getIndexFromID(id);
                courts.splice(index - 1, 1);
                refreshCourts();
                alertSuccess("Court removed successfully");
            },
            error: function (xhr) {
                alertFail("Court hasn't been removed. Reason: " + JSON.parse(xhr.responseText).error);
            }
        });
        loading = false;
    };


    init();
};
