class Panel{

    constructor(control = undefined, pID = undefined, panelNum){
        this.height = "400px";
        this.width = "400px";
        this._control = control;
        this._close_panel = "ClosePanel"
        if(id === undefined){
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
        document.getElementByClassName("ClosePanel").innerHTML = "Close Panel";
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

class PanelElem {

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
