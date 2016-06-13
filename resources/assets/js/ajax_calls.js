
function index(){
    var data = '';
    $.ajax({
        url: 'api/users',
        type: "GET",
        data: ''
    }).done(function (data, textStatus, jqXHR) {
        data = $.parseJson(data);
        postMessage(data);
    }).fail(function () {

    });
}