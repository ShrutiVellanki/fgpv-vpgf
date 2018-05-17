$.getScript('./panel-api.js', function () {

    var lightyear;
    var text = "<p>My name is Buzzlightyear</p>";
    //hidden make visible
    var htmlInput = $("#coolInput");
    //make visible
    var htmlButton = $("#coolButton");
    var panelElem1, panelElem2, panelElem3;

    $("#ConstructPanelElems").click(function () {
        panelElem1 = new PanelElem(1);
        panelElem2 = new PanelElem(2);
        panelElem3 = new PanelElem(3);
        $("#SetStringElem").prop('disabled', false);
    });

    $("#SetStringElem").click(function () {
        panelElem1.element = text;
        $("#SetInputElem").prop('disabled', false);
    });

    $("#SetInputElem").click(function () {
        panelElem2.element = htmlInput;
        $("#SetButtonElem").prop('disabled', false);
    });

    $("#SetButtonElem").click(function () {
        panelElem3.element = htmlButton;
        $("#ConstructPanel").prop('disabled', false);
    });

    $("#ConstructPanel").click(function () {
        lightyear = new Panel(1, "dummyMap", "Buzz Lightyear", "Ground Control");
        //$("#GetControl").prop('disabled', false);
        $("#GetContent").prop('disabled', false);
        $("#GetID").prop('disabled', false);
        $("#SetZIndex").prop('disabled', false);
        $("#GetElement").prop('disabled', false);
        $("#SetWidth").prop('disabled', false);
        $("#SetHeight").prop('disabled', false);
        $("#SetContent").prop('disabled', false);
        $("#SetPosition").prop('disabled', false);
        $("#AddPanel").prop('disabled', false);
        $("#SetPositionOverflow").prop('disabled', false);
        $("#SetWidthOverflow").prop('disabled', false);
        $("#SetHeightOverflow").prop('disabled', false);
    });

    //TODO: actual Control object.
    $("#GetControl").click(function () {
        alert(lightyear.control);
        console.log(lightyear.control);
    });

    $("#GetID").click(function () {
        alert(lightyear.id);
        console.log(lightyear.id);
    });

    $("#SetZIndex").click(function () {
        lightyear.zindex = -1000;
    });

    $("#GetElement").click(function () {
        alert(lightyear.element);
        console.log(lightyear.element);
    });

    //width/height can be set to string/number, pixels/percents
    //TODO: check for width/height going off parent div. --> doesn't seem to work when div is hidden.
    $("#SetWidth").click(function () {
        lightyear.width = 300;
    });

    $("#SetHeight").click(function () {
        lightyear.height = "20%";
    });

    //if width and height cause overflow, or positions cause overflow we need to keep things on screen
    //Idea: save width/height/positions as last set, and set it back to that. 
    //new function: offscreen (as parameters, new width/height/position)
    //when you change width/
    $("#SetWidthOverflow").click(function () {
        lightyear.width = 10000;
    });

    $("#SetHeightOverflow").click(function () {
        lightyear.height = "800%";
    });

    $("#SetPosition").click(function () {
        lightyear.position(20, 60, undefined, 90);
    });

    $("#SetPositionOverflow").click(function () {
        lightyear.position(-100, 60, 90000, 90);
    });

    $("#AddPanel").click(function () {
        lightyear.addPanel();
    });

    $("#GetContent").click(function () {
        alert(lightyear.content)
        console.log(lightyear.content);
    });

    $("#SetContent").click(function () {
        lightyear.content = [panelElem1, panelElem2, panelElem3];
        $("SetVisibleInput").prop('disabled', false);
        $("SetVisibleButton").prop('disabled', false);
    });

});



