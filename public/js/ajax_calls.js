//simple XHR request in pure JavaScript
function load(method, data, url, callback) {
    var xhr;
    if (method === '') {
        method = "GET";
    }

    if (typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
    else {
        var versions = ["MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"];

        for (var i = 0, len = versions.length; i < len; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            }
            catch (e) {
            }
        } // end for
    }

    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
        if (xhr.readyState < 4) {
            return;
        }

        if (xhr.status !== 200) {
            return;
        }

        // all is well
        if (xhr.readyState === 4) {
            callback(xhr);
        }
    }

    xhr.open(method, url, true);
    xhr.send(data);
}

//and here is how you use it to load a json file with ajax


self.addEventListener("message", function (event) {
    var data, method;
    if (!event.data.data) {
        data = '';
    }else{
        data = event.data.data;
    }
    if (!event.data.method) {
        method = 'GET';
    }else{
        method = event.data.method;
    }

    load(method, data, '../' + event.data.url, function (xhr) {
        self.postMessage(xhr.responseText);
    });


}, false);
