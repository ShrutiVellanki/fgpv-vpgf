class Control {

    /**
    * Creates a new Controls object.
    * @constructor Controls
    * @param {(PanelElem)[]} controls - the array of PanelElems to be used as panel controls
    */
    constructor(controls) {

        //loop through controls array        
            //add each id/element to this._id_dict (useful for find method)
            //if typeof control is Btn
                //if control.closeBtn is true then this._hasCloseBtn = true;

        //if this._hasCloseBtn == false
            //create closeBtn
            //append to this._controls

        var openBtn = new Btn(0, true);
        openBtn.text = "Close Panel";
        $("#" + openBtn._id).click(function () {
            if (document.getElementById(openBtn._id).innerHTML == "Close Panel") {
                newPanel.close();
            }
            else {
                newPanel.open();
            }

        });
    }

    /**
    * Finds a control by ID
    * @param {string} id - the ID of the desired control
    * @return {(PanelElem | undefined)} - the control if it exists, else undefined
    */
    find(id){
        //return this._id_dict[id];
    }

}

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

        //Box design credit: https://codepen.io/deam0n/pen/RRzmjq
        var panelSnippet = '<div hidden id ="panelContents" style="background: #F2F2F2; border: 1px solid #ccc; box-shadow: 1px 1px 2px #fff inset, -1px -1px 2px #fff inset; margin: 10px; position:relative; top:0px; left:0px"><div id ="panelControls" style="border: 1px solid #ccc;"></div><div id = "panelBody"></div></div>';
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

        //First empty existing controls (prevents accidental overflow)
        $("#" + this._panel_controls).empty();

        //goes through controls and appends to panel controls! 
        /*for (let elem of this._control._array) {
            $("#" + this._panel_controls).append(elem._element);
            $("#" + this._panel_controls).append("<br>");
        }*/

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
        $("#" + this._panel_body).show();
        //document.getElementsByClassName("ClosePanel").innerHTML = "Close Panel";
    }


    /**
    * Closes panel body.
    */
    close() {
        $("#" + this._panel_body).hide();
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

        //First empty existing content
        $("#" + this._panel_body).empty();

        //then fill in new contents
        for (let elem of content) {
            $("#" + this._panel_body).append(elem._element);
            $("#" + this._panel_body).append('<br>');
        }

        //check if content makes panel height too big
        this.checkOutOfBounds();
    }

    /**
    * Sets the id for the Panel
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
        this._id = "pe" + elemNum.toString();
        this._element_set = false;
    }

    /**
    * Constructs PanelElem objct
    * @param {number} elemNum - number that specifies the number of the PanelElem on panel
    *                           used for pregenerating PanelElem ids
    */
    set element(element) {

        if (typeof element === "string") {
            this._element = $.parseHTML(element);
        }
        else {
            this._element = element;
        }

        //checks if element is jquery object
        if (!this._element.jquery) {
            this._element = $(this._element);
        }

        this._element.attr('id', this._id);
        this._element.css('padding-bottom', "3px");
        this._element.css('border-bottom', "white solid 1px");

        this._element_set = true;
    }

    //visibility can only be changed once element is set (otherwise gets too complicated)
    set visible(visible) {

        console.log('hello');

        if (this._element_set == true && visible == false) {
            this._element.css('visibility', 'hidden');
            this._element.hide();
        }
        else if (this._element_set == true && visible == true) {
            this._element.css('visibility', 'visible');
            this._element.css('padding-bottom', "3px");
            this._element.css('border-bottom', "white solid 1px");
            this._element.show();
        }


    }

    //get visibility can only be called once element is set
    get visible() {
        return this._element.is(':visible');
    }

    get id() {
        return this._id;
    }

}

class Btn extends PanelElem {

    /**
    * Constructs Btn objct
    * @param {number} elemNum - number that specifies the number of the PanelElem on panel
    *                           used for pregenerating PanelElem ids
    * @param {boolean} btnCloses - whether or not this Btn opens and closes the panel body
    * @param {{string|SVG}} [toClose] - the string or image that is set when button needs to close panel
    *                                 - only specified if this btnCloses is true
    * 
    */
    constructor(elemNum, btnCloses) {        
        super(elemNum);
        this.closeBtn = btnCloses;

        this._element = $.parseHTML('<button></button>');
        //checks if element is jquery object
        if (!this._element.jquery) {
            this._element = $(this._element);
        }
        this._element.attr('id', this._id);
        //Btn elements (unlike PanelElems) are auto set --> helpful for changing visibility etc.
        this._element_set = true;

    }

    /**
    * Throws an exception when the user tries to set an element for a Btn
    * @param {number} element - the element that the user is trying to set
    * @throws {Exception} - cannot set the element of a Btn (all Btns are HTML <button>)
    */
    set element(element) {
        throw "Exception: Btn Elements cannot be set!"
    }

    /**
    * Sets an icon for the Btn
    * @param {SVG} svg - the icon to be set for the Btn
    */
    set icon(svg) {
        this._element.appendChild(svg);
    }

    /**
    * Sets text for the Btn
    * @param {string} txt - the text to be set for the Btn
    */
    set text(txt) {
        this._element.html(txt);
    }

    // the scope of this function will include both the Btn and Panel instance, so 
    // this.panel.close() or this.visible = false is valid.
    //action: (evt: Event) => void; // on click or enter keypress when focused
}
