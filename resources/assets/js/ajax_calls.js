
function index(url){
    var data = '';
    $.ajax({
        url: url,
        type: "GET",
        data: ''
    }).done(function (data, textStatus, jqXHR) {
        data = $.parseJson(data);
    }).fail(function () {

    });
}