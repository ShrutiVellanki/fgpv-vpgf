import {Panel} from "panel-api.js";
import {PanelElem} from "panel-api.js";
import {Control} from "panel-api.js";

$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../../../rv-styles.css'));

$.getScript('../../../rv-main.js', function () {
    //RZ.mapAdded.subscribe(mapi => {


            const panelTemplate =
            '<div class="panelArea " style="top:0px left:0px  margin-left:10px">
                <button class="ClosePanel">Close Panel</button>
                <div class ="panelContents"  style="border: 5px solid gray">
                  <div class ="panelControls"></div>
                  <div class = "panelBody"></div>
                </div>
            </div>';

            //This mimics addPanel function to be added to map API --> would subscribe to panelAdded
            //notice how rest of functions need to be nestled into "AddPanel"
            $("#AddPanel").click(function () {
                $("#main").append(panelTemplate);
                const newPanel = new Panel();

                //BUTTON TO BE CONTAINED WITHIN PANEL API
                $("#ClosePanel").click(function (){
                    if(document.getElementById("ClosePanel").innerHTML == "Close Panel"){
                        newPanel.close();
                    }
                    else{
                        newPanel.open();
                    }

                });

                $("#zIndex").click(function (){
                    newPanel.zindex = 2;
                });

            });

    //});

    /*$('#main').append(`
        <div id="fgpmap" style="height:700px; width:75%; margin-left:10px" class="column" rv-langs='["en-CA", "fr-CA"]' rv-service-endpoint="http://section917.cloudapp.net:8000/"></div>
    `);*/

    //const mapInstance = new RZ.Map(document.getElementById('fgpmap'), '../../config.rcs.[lang].json');
});
