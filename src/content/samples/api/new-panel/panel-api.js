class Panel {

    /**
    * Creates a new Panel.
    * @constructor Panel
    * @param {number} panelCount - the number of panels (including this one) there are on the map instance
    * @param {string} parentID - the parentID of this panel (usually the map instance where panel sits)
    * @param {(string|number)} [pID] - the user defined ID name for this panel
    * @param {Control} [control] - the user defined controls for this panel
    */
    constructor(panelCount, parentID, pID = undefined, control = undefined) {

        //init attributes
        this._map_added = false;
        this._parent_id = parentID;
        this._control = control;
        this._content = [];

        //add panel template to map/parent div
        var panelSnippet = '<div hidden id ="panelContents" style="border: 5px solid gray; margin: 10px; position:relative; top:0px; left:0px"><div id ="panelControls"></div><div id = "panelBody"></div></div>';
        $("#" + this._parent_id).append(panelSnippet);

        //panel template's div IDs can now be referred to by panelCount
        this._panel_contents = "panelContents" + panelCount.toString();
        this._panel_controls = "panelControls" + panelCount.toString();
        this._panel_body = "panelBody" + panelCount.toString();

        //update panel template's div IDs,
        document.getElementById("panelContents").id = this._panel_contents;
        document.getElementById("panelControls").id = this._panel_controls;
        document.getElementById("panelBody").id = this._panel_body;
        document.getElementById(this._panel_contents).className = pID;

        //set default widths and heights for panel
        this.width = "400px";
        this.height = "auto";

    }

    /**
    * Adds panel to the map.
    */
    addPanel() {
        $("#" + this._panel_contents).removeAttr('hidden');
        this._map_added = true;
        this.checkOutOfBounds(); //check if added map is out of bounds
    }

    /**
    * Opens panel body.
    */
    open() {
        $("#" + this._panel_contents).show();
        //document.getElementsByClassName("ClosePanel").innerHTML = "Close Panel";
    }


    /**
    * Closes panel body.
    */
    close() {
        $("#" + this._panel_contents).hide();
        //document.getElementById("ClosePanel").innerHTML = "Open Panel";

    }

    /**
    * Returns the Control object that contains panel controls
    * @return {Control} - the Control element containing panel controls
    */
    get control() {
        return this._control;
    }

    /**
    * Returns contents for panel
    * @return {(PanelElem|Panel)[]} - a list of contents of the main panel
    */
    get content() {
        return this._content;
    }

    /**
    * Sets the contents for the Panel
    * @param {(PanelElem|Panel)[]} content - a list of contents to be set for the main panel
    */
    set content(content) {
        this._content = content;

        for (let elem of content) {
            $("#" + this._panel_body).append(elem._element);
        }
    }

    /**
    * Sets the contents for the Panel
    * @return {string} - the id of the panel, if set
    */
    get id() {
        return document.getElementById(this._panel_contents).className.toString();
    }

    /**
    * Sets the width of panel, such that when added will never exceed map edge
    * @param {(string|number)} width - string (can specify px or %), number (defaults to px)
    */
    set width(width) {

        if (typeof width === "number") {
            document.getElementById(this._panel_contents).style.width = width.toString() + "px";
        }
        //for strings without "px" or "%"" specifications
        else if (width.slice(-2) !== "px" && width.slice(-1) !== "%") {
            document.getElementById(this._panel_contents).style.width = width + "px";
        }
        else {
            document.getElementById(this._panel_contents).style.width = width;
        }

        //if panel is added to map, check to see its not out of bounds
        if (this._map_added) {
            this.checkOutOfBounds();
        }
    }

    /**
    * Sets the zindex of panel
    * @param {number} zindex - the zindex value
    */
    set zindex(zindex) {
        document.getElementById(this._panel_contents).style.zIndex = zindex;
        alert("Z Index set to: " + zindex.toString());//TODO: remove alert
    }

    /**
    * Sets the height of panel, such that when added will never exceed map edge
    * @param {(string|number)} height - string (can specify px or %), number (defaults to px)
    */
    set height(height) {
        if (typeof height === "number") {
            document.getElementById(this._panel_contents).style.height = height.toString() + "px";
        }
        else if (height.slice(-2) !== "px" && height.slice(-1) !== "%") {
            document.getElementById(this._panel_contents).style.height = height + "px";
        }
        else {
            document.getElementById(this._panel_contents).style.height = height;
        }

        if (this._map_added) {
            this.checkOutOfBounds();
        }
    }

    /**
    * Returns panel shell element
    * @return {jQuery<HTMLElement>} - shell element that holds controls and content of panel
    */
    get element() {
        return document.getElementById(this._panel_contents);
        //TODO: does it actually return jQuery<HTMLElement>?
    }

    /**
    * Position is relative to map's top and left iff no control object given, otherwise relative to controls
    * @param {number} top - top position of panel in pixels
    * @param {number} left - left position of panel in pixels
    * @param {number} bottom - bottom position of panel in pixels
    * @param {number} right - right position of panel in pixels
    */
    position(top, left, bottom, right) {
        if (top != undefined) {
            document.getElementById(this._panel_contents).style.top = top.toString() + "px";
        }

        if (left != undefined) {
            document.getElementById(this._panel_contents).style.left = left.toString() + "px";
        }

        if (right != undefined) {
            document.getElementById(this._panel_contents).style.right = right.toString() + "px";
        }

        if (bottom != undefined) {
            document.getElementById(this._panel_contents).style.bottom = bottom.toString() + "px";
        }

        if (this._map_added) {
            this.checkOutOfBounds();
        }

    }

    /**
    * Auto sets width and height to 20% of parent div
    * If position was out of bounds, autosets to default panel position.
    */
    checkOutOfBounds() {

        if (document.getElementById(this._parent_id).clientHeight < document.getElementById(this._parent_id).scrollHeight) {
            alert("Panel height too big: changing to 20%") //TODO: remove alerts
            document.getElementById(this._panel_contents).style.height = "20%"
        }

        if (document.getElementById(this._parent_id).clientWidth < document.getElementById(this._parent_id).scrollWidth) {
            alert("Panel width too big: changing to 20%")
            document.getElementById(this._panel_contents).style.width = "20%"
        }

        var parent_position = $("#" + this._parent_id).position();
        var pt = parent_position.top; //"parent top"
        var pl = parent_position.left;
        var pr = parent_position.right;
        var pb = parent_position.bottom;

        var panel_position = $("#" + this._panel_contents).position();
        var ct = panel_position.top; //"child top"
        var cl = panel_position.left;
        var cr = panel_position.right;
        var cb = panel_position.bottom;


        //"if the top, left of child less then parent OR bottom, right of child greater than parent"
        if (ct < pt || cl < pl || cr > pr || cb > pb) {
            alert("Panel position out of bounds: changing to default")
            document.getElementById(this._panel_contents).style.top = "0px";
            document.getElementById(this._panel_contents).style.left = "0px";
        }
    }

}

class PanelElem {

    /**
    * Constructs PanelElem objct
    * @param {number} elemNum - number that specifies the number of the PanelElem on panel
    *                           used for pregenerating PanelElem ids
    */
    constructor(elemNum) {
        //this._visible = true;
        this._id = "pe" + elemNum.toString();
    }

    //element can be string, HTMLElement, jQuery<HTMLElement>
    //TODO: jQuery<HTMLElement>
    set element(element) {


        if (typeof element === "string") {
            this._element = $.parseHTML(element);
            //console.log(this._element);
        }
        else {
            this._element = element;
            if (element.id !== undefined) {
                this._id = element.id;
            }
        }

        //this._element_set = true;



        //changes actual element visibility once element set
        //this.visible = this._visible;
    }

    //sets visibility even if element itself is not set --> if set changes actual visibility
    /*set visible(visible) {
        this._visible = visible;

        if(this._element_set && this._visible == false){
            this._element.style.visibility = "hidden";
        }
        else if (this._element_set && this._visible == true){
            this._element.style.visibility = "visible";
        }
    }

    get visible(){
        return this._visible;
    }*/

    get id() {
        return this._id;
    }

}

//Control buttons come with open/close for whole panel
//set visible for each PanelElem OOHHHHHHHHHHH.
class Btn extends PanelElem {
    set element(element) {
        throw "Exception: Btn Elements cannot be set!"
    }
}
