$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', './new-panel-styles.css') );

$.getScript('./panel-api.js', function () {

    var lightyear;
    var text = "<p>Text PanelElem<span></span></p>"; //to test for multiple top level elements var text = "<p>Text PanelElem</p><h2></h2>";
    //hidden make visible
    var htmlInput = $("#coolInput");
    var panelElem1, panelElem2 /*, panelElem3*/;
    //var button = new Btn(4, false);

   
    $("#ConstructPanelElems").click(function () {
        panelElem1 = new PanelElem(text);
        panelElem2 = new PanelElem(htmlInput);
        $("#ConstructPanel").prop('disabled', false);
    });

    
    $("#ConstructPanel").click(function () {
        //var controls = new Control([]);
        lightyear = new Panel("Buzz Lightyear", "Ground Control");
        //$("#GetControl").prop('disabled', false);
        $("#GetContent").prop('disabled', false);
        $("#GetID").prop('disabled', false);
        $("#SetZIndex").prop('disabled', false);
        $("#GetElement").prop('disabled', false);
        $("#SetWidth").prop('disabled', false);
        $("#SetHeight").prop('disabled', false);
        $("#SetContent").prop('disabled', false);
        //$("#SetContentOverflow").prop('disabled', false);
        $("#SetPosition").prop('disabled', false);
        $("#AddPanel").prop('disabled', false);
        $("#SetPositionOverflow").prop('disabled', false);
        $("#SetWidthOverflow").prop('disabled', false);
        $("#SetHeightOverflow").prop('disabled', false);
    });

    //TODO: actual Control object.
    /*$("#GetControl").click(function () {
        alert(lightyear.control);
        console.log(lightyear.control);
    });*/

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
        lightyear.addPanel("dummyMap");
    });

    $("#GetContent").click(function () {
        alert(lightyear.content)
        console.log(lightyear.content);
    });

    $("#SetContent").click(function () {
        lightyear.content = [panelElem1, panelElem2];
        $("#SetVisibleInput").prop('disabled', false);
        $("#SetInvisibleInput").prop('disabled', false);
    });

    $("#SetVisibleInput").click(function () {
        panelElem2.visible = true;
        alert(panelElem2.visible);
    });

    $("#SetInvisibleInput").click(function () {
        panelElem2.visible = false;
        alert(panelElem2.visible);
    });

    $("#GetTextID").click(function () {
        alert(panelElem1.id);
    });

    $("#SetContentOverflow").click(function () {
        //lightyear.content = [panelElem1, panelElem2, panelElem3];
        //$("SetVisibleInput").prop('disabled', false);
    });

});



