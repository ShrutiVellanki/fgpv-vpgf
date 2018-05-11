$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../../../../rv-styles.css'));

$.getScript('../../../../rv-main.js', function () {
    RZ.mapAdded.subscribe(mapi => {

        //SETUP: 
        // JSON snippet to be added as a ConfigLayer
        const layerJSON = {
            "id": "0",
            "name": "Liquids Pipeline",
            "layerType": "esriFeature",
            "state": {
                "visibility": true
            },
            "url": "http://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_infrastructure_of_north_america_en/MapServer/3"
        };


        //add config layer
        mapi.layers.addLayer(layerJSON);

        mapi.layers.layerAdded.subscribe(layer => {
            if (layer.id === '0') {
                // set the config layer to a constant for ease of use
                const configLayer = mapi.layers.getLayersById('0')[0];

                //ADD NAME CHANGE TESTS:
                //TODO: seems like configLayer is undefined.
                // subscribe to name changed

                configLayer.nameChanged.subscribe(l => {
                    console.log('Name changed');

                    if ($("#ChangeName").text() == "to 'Liquids Pipeline'") {
                        if (configLayer.name == "Liquids Pipeline") {
                            $("#ChangeName").text("to 'new Name'");
                        }
                    } else {
                        if (configLayer.name == "new Name") {
                            $("#ChangeName").text("to 'Liquids Pipeline'");
                        }
                    }

                });

                //Click button, change name
                document.getElementById("ChangeName").onclick = function () {
                    if (configLayer.name == "Liquids Pipeline") {
                        configLayer.name = "new Name";
                    }
                    else {
                        configLayer.name = "Liquids Pipeline";
                    }
                }

                //ADD OPACITY TESTS:
                // subscribe to opacity changed
                configLayer.opacityChanged.subscribe(l => {
                    console.log('Opacity changed');

                    if ($("#ChangeOpacity").text() == "to 0.3") {
                        if (configLayer.opacity === 0.3) {
                            $("#ChangeOpacity").text("to 1.0");
                        }
                    }
                    else {
                        if (configLayer.opacity === 1) {
                            $("#ChangeOpacity").text("to 0.3");
                        }
                    }
                });

                //Click button, opacity changes
                document.getElementById("ChangeOpacity").onclick = function () {
                    if (configLayer.opacity === 1) {
                        configLayer.opacity = 0.3;
                    }
                    else {
                        configLayer.opacity = 1;
                    }
                }

                //ADD Visibility TESTS:
                // subscribe to visibility changed
                configLayer.visibilityChanged.subscribe(l => {
                    console.log('Visibility changed');

                    if ($("#ChangeVisibility").text() == "Make Visible") {
                        if (configLayer.visibility == true) {
                            $("#ChangeVisibility").text("Make Invisible");
                        }
                    } else {
                        if (configLayer.visibility == false) {
                            $("#ChangeVisibility").text("Make Visible");
                        }
                    }

                });

                document.getElementById("ChangeVisibility").onclick = function () {
                    if (configLayer.visibility == false) {
                        configLayer.visibility = true;
                    }
                    else {
                        configLayer.visibility = false;
                    }
                }

                // subscribe to attributes added
                configLayer.attributesAdded.subscribe(l => {
                    console.log('Attributes added');
                    document.getElementById("FetchAttributes").style.backgroundColor = "#00FF00";
                    //enables ability to set attributes/get attributes for already downloaded attributes. 
                    document.getElementById("SetSingleAttribute").disabled = false;
                    document.getElementById("SetAllAttributes").disabled = false;
                    document.getElementById("GetAllAttributes").disabled = false;
                    document.getElementById("GetAttribute").disabled = false;
                    document.getElementById("RemoveAttribute").disabled = false;
                    document.getElementById("RemoveAllAttributes").disabled = false;
                });

                // subscribe to attributes changed
                configLayer.attributesChanged.subscribe(l => {
                    console.log('Attributes changed');

                    $("button").click(function () {
                        if (this.id === "SetSingleAttribute" || this.id === "SetAllAttributes") {
                            document.getElementById(this.id).style.backgroundColor = "#00FF00";
                        }
                    });
                });


                // download attributes
                document.getElementById("FetchAttributes").onclick = function () {
                    configLayer.fetchAttributes();
                }

                //CHANGE ATTRIBUTES: 
                //TODO: why isn't the subscribed picking up on button action?
                document.getElementById("SetSingleAttribute").onclick = function () {
                    configLayer.setAttributes(1, 'Country', 'new Country');
                    //disable after attribute is set, so user can't set again.
                    document.getElementById("SetSingleAttribute").disabled = true;
                }

                document.getElementById("SetAllAttributes").onclick = function () {
                    configLayer.setAttributes(2, { Country: 'Country is new', OBJECTID: -1 });
                    //disable after attribute is set, so user can't set again.
                    document.getElementById("SetAllAttributes").disabled = true;
                }

                //GET ATTRIBUTES (no associated subscribe function): 
                //TODO: how to get Country/county name to verify attributes
                document.getElementById("GetAttribute").onclick = function () {
                    document.getElementById("output").innerHTML = configLayer.getAttributes(5);
                    console.log(configLayer.getAttributes(5));
                }

                document.getElementById("GetAllAttributes").onclick = function () {
                    document.getElementById("output").innerHTML = configLayer.getAttributes();
                }

                //REMOVE ATTRIBUTES: 

                // subscribe to attributes removed --> WONKINESS HERE MIGHT BE BECAUSE GETATTRIBUTES IS CALLED AGAIN
                //TODO: LAST CHECK FOR GETATTRIBUTES
                configLayer.attributesRemoved.subscribe(l => {
                    console.log('Attributes removed');

                    $("button").click(function () {

                        if (this.id == "RemoveAttribute") {
                            // confirm attribute for OID 5 removed, but others still persist
                            if (configLayer.getAttributes(5) === undefined && configLayer.getAttributes(10) !== undefined) {
                                document.getElementById("RemoveAttribute").style.backgroundColor = "#00FF00";
                            }
                            else {
                                console.log("Test failed because attribute was not removed successfully, or removed wrong attribute")
                                document.getElementById("RemoveAttribute").style.backgroundColor = "#cd0000";
                            }
                        }

                        if (this.id == "RemoveAllAttributes") {
                            // confirm previously present attribute was removed, and attributes list is now empty
                            if (configLayer.getAttributes(10) === undefined && configLayer.getAttributes().length() === 0) {
                                document.getElementById("RemoveAllAttributes").style.backgroundColor = "#00FF00";
                            }
                            else {
                                console.log("Test failed because attributes were not removed successfully")
                                document.getElementById("RemoveAttribute").style.backgroundColor = "#cd0000";
                            }
                        }


                    });

                });

                document.getElementById("RemoveAttribute").onclick = function () {
                    document.getElementById("GetAttribute").disabled = true;
                    document.getElementById("RemoveAttribute").disabled = true;
                    // remove single attribute field of layer whose attributes are already downloaded
                    configLayer.removeAttributes(5);
                }

                document.getElementById("RemoveAllAttributes").onclick = function () {

                    document.getElementById("SetSingleAttribute").disabled = true;
                    document.getElementById("SetAllAttributes").disabled = true;
                    document.getElementById("GetAllAttributes").disabled = true;
                    document.getElementById("GetAttribute").disabled = true;
                    document.getElementById("RemoveAttribute").disabled = true;
                    document.getElementById("RemoveAllAttributes").disabled = true;
                    // remove single attribute field of layer whose attributes are already downloaded
                    configLayer.removeAttributes();
                }

                //No associated subscribe function
                document.getElementById("CheckZoomLevel").onclick = function () {
                    if (mapi.zoom === 17) {
                        document.getElementById("CheckZoomLevel").style.backgroundColor = "#00FF00";
                    }
                    else {
                        console.log("Test failed (though it could be because user did not zoom enough).")
                        document.getElementById("CheckZoomLevel").style.backgroundColor = "#cd0000";
                    }
                }

                //No associated subscribe function
                document.getElementById("CheckZoomLevel2").onclick = function () {
                    if (mapi.zoom === 0) {
                        document.getElementById("CheckZoomLevel2").style.backgroundColor = "#00FF00";
                    }
                    else {
                        console.log("Test failed (though it could be because user did not zoom enough).")
                        document.getElementById("CheckZoomLevel2").style.backgroundColor = "#cd0000";
                    }
                }

                //No associated subscribe function
                document.getElementById("PanToBoundary").onclick = function () {

                    // turn on the bounding box for the layer whose boundary is being panned to and then pan to layer boundary
                    configLayer.panToBoundary();

                    //expect map zoom level to have changed accordingly
                    if (mapi.zoom === 4) {
                        document.getElementById("PanToBoundary").style.backgroundColor = "#00FF00";
                    }
                    else {
                        console.log("Test failed: Zoom level did not change after panning to boundary!")
                        document.getElementById("PanToBoundary").style.backgroundColor = "#cd0000";
                    }
                }

                //No associated subscribe function
                document.getElementById("ZoomToScale").onclick = function () {
                    // zoom to layer scale
                    configLayer.zoomToScale()

                    //expect map zoom level to have changed accordingly
                    if (mapi.zoom === 6) {
                        document.getElementById("ZoomToScale").style.backgroundColor = "#00FF00";
                        document.getElementById("ZoomToScale2").disabled = false;
                    }
                    else {
                        console.log("Test failed: Zoom level did not change after zoomToScale!")
                        console.log(mapi.zoom);
                        document.getElementById("ZoomToScale").style.backgroundColor = "#cd0000";
                    }
                }

                //No associated subscribe function
                document.getElementById("ZoomToScale2").onclick = function () {

                    //record current zoom, verify greater than 6
                    const currentZoom = mapi.zoom;
                    if (currentZoom > 6) {
                        //zoom to layer scale again, verify nothing changed.
                        configLayer.zoomToScale();
                        if (mapi.zoom === currentZoom) {
                            document.getElementById("ZoomToScale2").style.backgroundColor = "#00FF00";
                        }
                        else {
                            document.getElementById("ZoomToScale2").style.backgroundColor = "#cd0000";
                            console.log("Test failed: map zoom unexpectedly changed after zoomToScale!")
                        }
                    }
                    else {
                        document.getElementById("ZoomToScale2").style.backgroundColor = "#cd0000";
                        console.log("Test failed: currentZoom<=6 (Though user may have accidently zoomed out).")
                    }

                }

            }

        });
    });

    $('#main').append(`
        <div id="fgpmap" style="height:1300px; width:80%; margin-left:10px" class="column" rv-langs='["en-CA", "fr-CA"]' rv-service-endpoint="http://section917.cloudapp.net:8000/""></div>
    `);

    const mapInstance = new RZ.Map(document.getElementById('fgpmap'), '../../../config.rcs.[lang].json');
});