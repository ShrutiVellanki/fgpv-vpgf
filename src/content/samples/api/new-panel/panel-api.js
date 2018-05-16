class Panel {

    //takes in ID of parent div, id as defined by user, control as defined by user.
    constructor(parentID, pID = undefined, control = undefined) {

        //has panel been added?
        this._panel_added = false;
        this._parent_id = parentID;
        this._control = control;
        //this._z_index = undefined;


        //panel id as set (or not set, by the user)
        if (pID === undefined) {
            this._id = "undefined";
        }
        else {
            this._id = pID;
        }

        //default widths and heights
        this._width = "400px";
        this._height = "auto";

    }

    addPanel(panelCount) {
        this._panel_added = true;
        const panelTemplate =
            '<div id ="panelContents" style="border: 5px solid gray; margin: 10px; position:relative; top:0px; left:0px"><div id ="panelControls"></div><div id = "panelBody"></div></div>';
        this._panel_contents = "panelContents" + panelCount.toString();
        this._panel_controls = "panelControls" + panelCount.toString();
        this._panel_body = "panelBody" + panelCount.toString();
        $("#" + this._parent_id).append(panelTemplate);
        document.getElementById("panelContents").id = this._panel_contents;
        document.getElementById("panelControls").id = this._panel_controls;
        document.getElementById("panelBody").id = this._panel_body;
        document.getElementById(this._panel_contents).className = this._id;

        if(this._z_index !== undefined){
            this.zindex = this._z_index;
        }
        

        //set width and height for panel
        this.width = this._width; //400px default width for panels
        this.height = this._height; //400px default width for panels, no default height
    }

    //Triggered by open button on panel
    open() {
        $("#" + this._panel_contents).show();
        //document.getElementsByClassName("ClosePanel").innerHTML = "Close Panel";
    }

    //Triggered by close button on panel
    close() {
        $("#" + this._panel_contents).hide();
        //document.getElementById("ClosePanel").innerHTML = "Open Panel";

    }

    get control() {
        return this._control;
    }

    get id() {
        return this._id;
    }

    // Can be pixels or percent
    // Will never exceed map edge
    set width(width) {

        if (this._panel_added == false) {
            this._width = width;
        }
        else {
            document.getElementById(this._panel_contents).style.width = width;
            if (document.getElementById(this._parent_id).offsetWidth < document.getElementById(this._parent_id).scrollWidth) {
                alert("Abort mission, panel has no room! Removing Panel.")
                document.getElementById(this._panel_contents).remove();
            }
        }
    }

    set zindex(zindex) {
        console.log("Z Index set!");
        if (this._panel_added == false){
            this._z_index = zindex;
        }
        else{
            document.getElementById(this._panel_contents).style.zIndex = zindex;
        }        
    }

    // Can be pixels or percent
    // Will never exceed map edge
    set height(height) {

        if (this._panel_added == false) {
            this._height = height;
        }
        else {
            document.getElementById(this._panel_contents).style.height = height;
            if (document.getElementById(this._parent_id).offsetHeight < document.getElementById(this._parent_id).scrollHeight) {
                alert("Abort mission, panel has no room! Removing panel.")
                document.getElementById(this._panel_contents).remove();
            }
        }
    }

    //returns panel shell element
    get element() {
        return document.getElementById(this._panel_contents);
    }

}

class PanelElem {

    //element can be string, HTMLElement, jQuery<HTMLElement>
    //TODO: jQuery<HTMLElement>
    set element(element) {
        if (typeof element === "string") {
            this._element = $.parseHTML(element);
        }
        else if (typeof element === "HTMLElement") {
            this._element = element;
        }
    }

    set visible(visible) {
        this._visible = visible;
    }

}

//Control buttons come with open/close for whole panel
//set visible for each PanelElem OOHHHHHHHHHHH. 
class Btn extends PanelElem {
    set element() {
        throw "Exception: Btn Elements cannot be set!"
    }
}
