//QUESTIONS: 
//Should I include things to remove panel or panel elements? 
//What two panels have same id? 


//TODO: 
//Change to non hardcoded ids to refer to things??????
//Like to explain better you're doing document.getElementById --> but how to modify THIS instance of panel?
//Guess could do this._id --> document.getElementById(#ClosePanel) to document.getElementById(this._id + "#ClosePanel")
//separate API functions from rest of classes
//Should button click functions be contained within the PanelApi or separated into Javascript? --> is that where observables come in?
//but in situation where panel ID is undefined? 
//ERROR checking for wrong value type passed through?
//Could do for MapApi --> keep track of panel number added
//temporarily keep track of panels in AddPanel function
//This way don't have to refer to panel buttons/elements by ids --> just by numbers (eg: panelArea1, closeButton1, panelContent1)
//

$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../../../rv-styles.css'));

$.getScript('../../../rv-main.js', function () {
    RZ.mapAdded.subscribe(mapi => {

            
            const panelTemplate = '<div id="panelArea"><button id ="ClosePanel">Close Panel</button><div id ="PanelContents" style="border:5px solid gray; margin-left:10px"></div></div>';            
            
            //This mimics addPanel function to be added to map API --> would subscribe to this
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

    });

    $('#main').append(`
        <div id="fgpmap" style="height:700px; width:75%; margin-left:10px" class="column" rv-langs='["en-CA", "fr-CA"]' rv-service-endpoint="http://section917.cloudapp.net:8000/"></div>
    `);

    const mapInstance = new RZ.Map(document.getElementById('fgpmap'), '../../config.rcs.[lang].json');
});

class Panel{

    //control of type Control
    //id of string or number
    constructor(control = undefined, pID = undefined){
        this.height = "400px";
        this.width = "400px";
        this._control = control;
        /*if(id === undefined){
            this._id = "undefined";
        }
        else{
            this._id = pID;
        }
        //TODO modify ID?
        document.getElementById("panelArea").id = this._id;*/
        
    }

    //Triggered by open button on panel
    open(){
        $("#PanelContents").show();
        document.getElementById("ClosePanel").innerHTML = "Close Panel";
    }

    //Triggered by close button on panel
    close(){
        $("#PanelContents").hide();
        document.getElementById("ClosePanel").innerHTML = "Open Panel";

    }

    get control(){
        return this._control;
    }    

    //expected width in pixels or percent
    // so panel.width("800px")
    set width(width){
        document.getElementById("PanelContents").style.width = width;        
    }

    set zindex(zindex){
        console.log("Z Index set!");
        document.getElementById("PanelContents").style.zIndex = zindex;
    }

    set height(height){
        document.getElementById("PanelContents").style.height = height;
    }

    //returns panel shell element
    get element(){
        return document.getElementById("panelArea")
    }

}

//QUESTION: to confirm PanelElement is just one element? or is it a collection of elements?
class PanelElem{

    //element can be string, HTMLElement, jQuery<HTMLElement>
    set element(element){
        if (typeof element === "string"){

        }
        else if (typeof element === "HTMLElement"){

        }
        else{
            
        }
    }

}

