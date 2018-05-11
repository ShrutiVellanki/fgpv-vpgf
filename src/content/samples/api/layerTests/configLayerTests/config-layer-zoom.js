$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../../../../rv-styles.css'));

$.getScript('../../../../rv-main.js', function () {
    RZ.mapAdded.subscribe(mapi => {

        //SETUP: 
        // JSON snippet to be added as a ConfigLayer
        const layerJSON = {
            "id": "0",
            "name": "minor_cities",
            "layerType": "esriFeature",
            "state": {
                "visibility": true
            },
            "url": "http://section917.cloudapp.net/arcgis/rest/services/TestData/SupportData/MapServer/2"
        };


        //add config layer
        mapi.layers.addLayer(layerJSON);

        mapi.layers.layerAdded.subscribe(layer => {
            if (layer.id === '0') {

                // set the config layer to a constant for ease of use
                const configLayer = mapi.layers.getLayersById('0')[0];

                //WORKS
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

                //WORKS
                //No associated subscribe function
                document.getElementById("CheckZoomLevel2").onclick = function () {
                    if (mapi.zoom === 0) {
                        document.getElementById("CheckZoomLevel2").style.backgroundColor = "#00FF00";
                        //activates zooom to scale if successful (makes sense to do this when zoomed out to 0)
                        document.getElementById("ZoomToScale").disabled = false;
                    }
                    else {
                        console.log("Test failed (though it could be because user did not zoom enough).")
                        document.getElementById("CheckZoomLevel2").style.backgroundColor = "#cd0000";
                    }
                }

                //No associated subscribe function
                //works good job.
                document.getElementById("PanToBoundary").onclick = function () {

                    // turn on the bounding box for the layer whose boundary is being panned to and then pan to layer boundary
                    configLayer.panToBoundary();

                    //expect map zoom level to have changed accordingly
                    if (mapi.zoom === 3) {
                        document.getElementById("PanToBoundary").style.backgroundColor = "#00FF00";
                    }
                    else {
                        console.log("Test failed: Zoom level did not change after panning to boundary!")
                        document.getElementById("PanToBoundary").style.backgroundColor = "#cd0000";
                    }
                }

                //TODO: Zoom to scale doesn't seem to be working (not my fault)?
                //TODO: Need to have subscribe function for detecting if zoomed? --> doesn't seem to be in layer API?
                document.getElementById("ZoomToScale").onclick = function () {
                    // zoom to layer scale
                    configLayer.zoomToScale();

                    //expect map zoom level to have changed accordingly
                    if (mapi.zoom === 8) {
                        document.getElementById("ZoomToScale").style.backgroundColor = "#00FF00";
                        document.getElementById("ZoomToScale2").disabled = false;
                    }
                    else {
                        console.log("Test failed: Zoom level did not change after zoomToScale!")
                        document.getElementById("ZoomToScale").style.backgroundColor = "#cd0000";
                    }
                }

                //TODO: need to double check once get zoom to scale working.
                //No associated subscribe function
                document.getElementById("ZoomToScale2").onclick = function () {

                    //record current zoom, verify greater than 8
                    const currentZoom = mapi.zoom;
                    if (currentZoom > 8) {
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
                        console.log("Test failed: currentZoom<=8 (Though user may have accidently zoomed out).")
                    }

                }

            }

        });
    });

    $('#main').append(`
        <div id="fgpmap" style="height:900px; width:80%; margin-left:10px" class="column" rv-langs='["en-CA", "fr-CA"]' rv-service-endpoint="http://section917.cloudapp.net:8000/""></div>
    `);

    const mapInstance = new RZ.Map(document.getElementById('fgpmap'), '../../../config.rcs.[lang].json');
});