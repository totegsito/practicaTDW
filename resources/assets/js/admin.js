function getAllUsers() {
    if (typeof (Worker) !== "undefined"){
        var worker = new Worker("ajax_call.js");
        worker.onmessage = function (event) {
            console.log(event.data);
            }
    }else{
        alert("¡Su navegador no soporta Web Workers!")
    }
}