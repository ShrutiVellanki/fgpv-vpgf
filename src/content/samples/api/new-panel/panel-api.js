// class Control {

//     /**
//     * Creates a new Controls object.
//     * @constructor Controls
//     * @param {(PanelElem)[]} controls - the array of PanelElems to be used as panel controls
//     */
//     constructor(controls) {
//         this._id_dict = {};
//         //loop through controls array
//         for (let control of controls){
//             var id = control._id
//         }        
//             //add each id/element to this._id_dict (useful for find method)
//             //if typeof control is Btn
//                 //if control.closeBtn is true then this._hasCloseBtn = true;

//         //if this._hasCloseBtn == false
//             //create closeBtn
//             //append to this._controls

//         var openBtn = new Btn(0, true);
//         openBtn.text = "Close Panel";
//         $("#" + openBtn._id).click(function () {
//             if (document.getElementById(openBtn._id).innerHTML == "Close Panel") {
//                 newPanel.close();
//             }
//             else {
//                 newPanel.open();
//             }

//         });
//     }

//     /**
//     * Finds a control by ID
//     * @param {string} id - the ID of the desired control
//     * @return {(PanelElem | undefined)} - the control if it exists, else undefined
//     */
//     find(id){
//         //return this._id_dict[id];
//     }

// }

class Panel {

    /**
    * Creates a new Panel.
    * @constructor
    * @param {(string|number)} [id] - the user defined ID name for this panel
    * @param {Control} [control] - the user defined controls for this panel
    */
    constructor(id = undefined, control = undefined) {

        //init class attributes
        this._map_added = false;
        this._id = id;
        this._control = control;
        this._content = [];
        this._panel_contents, this._panel_controls, this._panel_body;
        this._document_fragment;
        this._visible;
        this._width, this._height;
        this._zindex;
        this._position_top = "0px", this._position_right, this._position_bottom, this._position_left = "0px";
        this._parent_map,  this._parent_map_jq; //HTML + JQuery versions of parent map 

        //create panel components and document fragment
        this.createPanelComponents();

        //set default height and width
        this.width = "400px";
        this.height = "auto";

    }

    /**
    * Helper method to create panel components and the document fragment. 
    */
    createPanelComponents() {

        //create panel components
        this._panel_contents = $.parseHTML('<div class="panel-contents"></div>');
        this._panel_controls = $.parseHTML('<div class="panel-controls"></div>');
        this._panel_body = $.parseHTML('<div class="panel-body"></div>');

        //convert to jQuery elements
        this._panel_contents = $(this._panel_contents);
        this._panel_controls = $(this._panel_controls);
        this._panel_body = $(this._panel_body);

        this._panel_contents.attr('id', this._id);

        //append panel controls/body to panel contents ("shell")
        this._panel_contents.append(this._panel_controls);
        this._panel_contents.append(this._panel_body);

        //append panel contents ("shell") to document fragment
        this._document_fragment = document.createDocumentFragment();
        this._document_fragment.append(this._panel_contents);

    }

    /**
    * Adds panel to the map.
    * @param {string} [parentID] - the id of the parent (map object) where the panel shows up
    */
    addPanel(parentID) {
        this._map_added = true;

        //javascript and jquery calls to parent object
        this._parent_map = document.getElementById(parentID);
        this._parent_map_jq = $("#" + parentID);

        this._parent_map_jq.append(this._panel_contents);
        this.checkOutOfBounds(); //check if added map is out of bounds
        this.setElemVisibility(); //incase set content didn't call it (content set before panel added)
    }

    /**
    * Helper method to set content: elements need to be constructed before they are added to panel --> this autosets their visibility to false
    * This method goes through elements and changes _visible property to correct visibility. 
    */
    setElemVisibility(){
        for (let content of this.content){
            if(content._element.is(':visible') === true){
                content._visible = true;
            }
            else{
                content._visible = false;
            }
        }
    }

    /**
    * Opens panel body.
    */
    open() {
        this._panel_body.show();
    }


    /**
    * Closes panel body.
    */
    close() {
        this._panel_body.hide();
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
        this._panel_body.empty();

        //then fill in new contents
        for (let elem of content) {
            this._panel_body.append(elem._element);
            this._panel_body.append('<br>');
        }

        //check if content makes panel height too big if panel is added to map
        if(this._map_added){
            this.checkOutOfBounds();
            this.setElemVisibility(); //corrects _visible property of elements
        }        
    }

    /**
    * Sets the id for the Panel
    * @return {string} - the id of the panel, if set
    */
    get id() {
        return this._id;
    }

    /**
    * Sets the width of panel, such that when added will never exceed map edge
    * @param {(string|number)} width - string (can specify px or %), number (defaults to px)
    */
    set width(width) {

        if (typeof width === "number") {
            this._panel_contents.css('width', width.toString() + "px");
        }
        //for strings without "px" or "%"" specifications
        else if (width.slice(-2) !== "px" && width.slice(-1) !== "%") {
            this._panel_contents.css('width', width + "px");
        }
        else {
            this._panel_contents.css('width', width);
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
        this._panel_contents.css('zIndex', zindex);
        alert("Z Index set to: " + zindex.toString());//TODO: remove alert
        this._zindex = zindex;
    }

    /**
    * Sets the height of panel, such that when added will never exceed map edge
    * @param {(string|number)} height - string (can specify px or %), number (defaults to px)
    */
    set height(height) {
        if (typeof height === "number") {
            this._panel_contents.css('height', height.toString() + "px");
            this._height = height.toString() + "px";
        }
        else if (height.slice(-2) !== "px" && height.slice(-1) !== "%") {
            this._panel_contents.css('height', height + "px");
            this._height = height + "px";
        }
        else {
            this._panel_contents.css('height', height);
            this._height = height;
        }
        
        if (this._map_added) {
            //the height at the end of call to checkOutOfBounds is final map height
            this.checkOutOfBounds();

        }
    }

    /**
    * Returns panel shell element
    * @return {jQuery<HTMLElement>} - shell element that holds controls and content of panel
    */
    get element() {
        return this._panel_contents;
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
            this._panel_contents.css('top', top.toString() + "px");
            this._position_top = top.toString() + "px";
        }

        if (left != undefined) {
            this._panel_contents.css('left', left.toString() + "px");
            this._position_left = left.toString() + "px";
        }

        if (right != undefined) {
            this._panel_contents.css('right', right.toString() + "px");
            this._position_right = right.toString() + "px";
        }

        if (bottom != undefined) {
            this._panel_contents.css('bottom', bottom.toString() + "px");
            this._position_bottom = bottom.toString() + "px";
        }

        if (this._map_added) {
            this.checkOutOfBounds();
        }

    }

    /**
    * Helper Method: Checks to see if the panel is out of bounds of its _parent_map
    * Auto sets width and height to 20% of parent div
    * If position was out of bounds, autosets to default panel position.
    */
    checkOutOfBounds() {

        if (this._parent_map.clientHeight < this._parent_map.scrollHeight) {
            alert("Panel height too big: changing to 20%") //TODO: remove alerts
            this._panel_contents.css('height', '20%');
            this._height = '20%';
        }

        if (this._parent_map.clientWidth < this._parent_map.scrollWidth) {
            alert("Panel width too big: changing to 20%")
            this._panel_contents.css('width', '20%');
            this._width = '20%';
        }

        var parent_position = this._parent_map_jq.position();
        var pt = parent_position.top; //"parent top"
        var pl = parent_position.left;
        var pr = parent_position.right;
        var pb = parent_position.bottom;

        var panel_position = this._panel_contents.position();
        var ct = panel_position.top; //"child top"
        var cl = panel_position.left;
        var cr = panel_position.right;
        var cb = panel_position.bottom;


        //"if the top, left of child less then parent OR bottom, right of child greater than parent"
        if (ct < pt || cl < pl || cr > pr || cb > pb) {
            alert("Panel position out of bounds: changing to default")
            this._panel_contents.css('top', '0px');
            this._panel_contents.css('left', '0px');
            this._position_top = '0px';
            this._position_bottom = '0px';
        }

        
    }

}

class PanelElem {

    /**
    * Constructs PanelElem object
    * @param {string | HTMLElement | jQuery<HTMLElement>} element - element to be set as PanelElem
    */
    constructor(element) {

        this._id;
        this.element = element; 
        this._visible;

        //2. Set element and append to document fragment.
        this._document_fragment = document.createDocumentFragment();
        this._document_fragment.append(this._element);
    }

    /**
    * Sets PanelElem object
    * @param {(string | HTMLElement | jQuery<HTMLElement>)} element - element to be set as PanelElem
    * @throws {Exception} - cannot have multiple top level elements
    */
    set element(element) {

        if (typeof element === "string") {
            this._element = $.parseHTML(element);
        }
        else {
            this._element = element;
        }

        //checks if element is jQuery object
        if (!this._element.jquery) {
            this._element = $(this._element);
        }

        //Throw exception if there's multiple top level elements
        var children = this._element.children(); 
        var checkElem = this._element.empty(); 
        if (checkElem.length > 1){
            throw "Exception: Cannot have multiple top level elements!";
        }
        this._element = this._element.append(children); 


        //If element already has id attribute, set id to that id, otherwise set to randomly generated id
        if (this._element !== undefined && this._element.attr('id') !== undefined) {
            this._id = this._element.attr('id');
        }
        else{
            this._id = "PanelElem" + Math.round(Math.random() * 10000).toString(); //random id autogenerated
            this._element.attr('id', this._id);
        }

        //Adds elem style from stylesheet 
        this._element.addClass("elem");

    }

    //visibility can only be changed once element is set (otherwise gets too complicated)
    set visible(visible) {

        if (this._element != undefined && visible == false) {

            //Adds style from stylesheet
            this._element.addClass("unseen");
            this._element.removeClass("seen");
            this._element.removeClass("elem");
            this._element.hide();
            this._visible = false;
        }
        else if (this._element != undefined && visible == true) {

            //Adds styles from stylesheet
            this._element.addClass("seen");
            this._element.removeClass("unseen");
            this._element.addClass("elem");

            this._element.show();
            this._visible = true;
        }

    }

    //get visibility can only be called once element is set
    get visible() {
        return this._visible;
    }

    get id() {
        return this._id;
    }

    get fragment() {
        return this._document_fragment;
    }

}

// class Btn extends PanelElem {

//     /**
//     * Constructs Btn objct
//     * @param {number} elemNum - number that specifies the number of the PanelElem on panel
//     *                           used for pregenerating PanelElem ids
//     * @param {boolean} btnCloses - whether or not this Btn opens and closes the panel body
//     * @param {{string|SVG}} [toClose] - the string or image that is set when button needs to close panel
//     *                                 - only specified if this btnCloses is true
//     * 
//     */
//     constructor(elemNum, btnCloses) {        
//         super(elemNum);
//         this.closeBtn = btnCloses;

//         this._element = $.parseHTML('<button></button>');
//         //checks if element is jquery object
//         if (!this._element.jquery) {
//             this._element = $(this._element);
//         }
//         this._element.attr('id', this._id);
//         //Btn elements (unlike PanelElems) are auto set --> helpful for changing visibility etc.
//         this._element_set = true;

//     }

//     /**
//     * Throws an exception when the user tries to set an element for a Btn
//     * @param {number} element - the element that the user is trying to set
//     * @throws {Exception} - cannot set the element of a Btn (all Btns are HTML <button>)
//     */
//     set element(element) {
//         throw "Exception: Btn Elements cannot be set!";
//     }

//     /**
//     * Sets an icon for the Btn
//     * @param {SVG} svg - the icon to be set for the Btn
//     */
//     set icon(svg) {
//         this._element.appendChild(svg);
//     }

//     /**
//     * Sets text for the Btn
//     * @param {string} txt - the text to be set for the Btn
//     */
//     set text(txt) {
//         this._element.html(txt);
//     }

//     // the scope of this function will include both the Btn and Panel instance, so 
//     // this.panel.close() or this.visible = false is valid.
//     //action: (evt: Event) => void; // on click or enter keypress when focused
// }
