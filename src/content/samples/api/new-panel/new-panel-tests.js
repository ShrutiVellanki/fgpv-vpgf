$.getScript('./panel-api.js', function () {

    var panelCount = 0;
    var lightyear;

    $("#ConstructPanel").click(function () {
        lightyear = new Panel("dummyMap", "Buzz Lightyear", "Ground Control");
        $("#GetControl").prop('disabled', false);
    });

    //TODO: actual Control object.
    $("#GetControl").click(function () {
        alert(lightyear.control);
        console.log(lightyear.control);
        $("#GetID").prop('disabled', false);
    });

    $("#GetID").click(function () {
        alert(lightyear.id);
        console.log(lightyear.id);
        $("#SetContentBefore").prop('disabled', false);
    });

    $("#SetContentBefore").click(function () {
        alert(lightyear.id);
        console.log(lightyear.id);
        //$("#GetContentBefore").prop('disabled', false);
    });

});





