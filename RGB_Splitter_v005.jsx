

// Create GUI
var GUI = new Window("palette", "RGB SPLITTER", undefined);
GUI.orientation = "column";
var sliders = GUI.add("group",undefined)
sliders.orientation = "column";

// Red slider
var Rslidergroup = sliders.add("group", undefined)
var REDTEXT = Rslidergroup.add("statictext",undefined, "R")
var Rslider = Rslidergroup.add("slider",undefined)
Rslider.value =  0;
Rslider.minvalue = -100;
Rslider.maxvalue = 100;

// Green slider
var Gslidergroup = sliders.add("group",undefined)
var GREENTEXT = Gslidergroup.add("statictext",undefined,"G")
var Gslider = Gslidergroup.add("slider",undefined)
Gslider.value =  0;
Gslider.minvalue = -100;
Gslider.maxvalue = 100;

// Blue slider
var Bslidergroup = sliders.add("group",undefined)
var BLUETEXT = Bslidergroup.add("statictext",undefined,"B")
var Bslider = Bslidergroup.add("slider",undefined)
Bslider.value =  0;
Bslider.minvalue = -100;
Bslider.maxvalue = 100;


// Run button
var GUIRUN = GUI.add("group",undefined)
var runbutton = GUIRUN.add("button", undefined, "Split!")
GUIRUN.orientation = "row";



//Close button
var CLOSEBUTTON = GUIRUN.add("button", undefined,"Cancel")
CLOSEBUTTON.onClick = function () {
    GUI.close()
    }


GUI.show();



//runs SPLITTER
runbutton.onClick = function() {
var myLayer = app.project.activeItem.selectedLayers[0]

app.beginUndoGroup("RGB Splitter");

//var myLayer1 = app.project.activeItem.selectedLayers[0].index 
if (app.project.activeItem.selectedLayers[0]) {
myLayer.blendingMode=BlendingMode.ADD;
myLayer.name = "BLUE"
myLayer.property("Effects").addProperty("ADBE Shift Channels")("Take Green From").setValue(10)
myLayer.property("Effects")("ADBE Shift Channels")("Take Blue From").setValue(4)
myLayer.property("Effects")("ADBE Shift Channels")("Take Red From").setValue(10);
myLayer.duplicate().name = "RED"
app.project.activeItem.layers.byName("RED").property("Effects")("ADBE Shift Channels")("Take Blue From").setValue(10)
app.project.activeItem.layers.byName("RED").property("Effects")("ADBE Shift Channels")("Take Green From").setValue(10)
app.project.activeItem.layers.byName("RED").property("Effects")("ADBE Shift Channels")("Take Red From").setValue(2);
myLayer.duplicate().name = "GREEN"
app.project.activeItem.layers.byName("GREEN").property("Effects")("ADBE Shift Channels")("Take Blue From").setValue(10)
app.project.activeItem.layers.byName("GREEN").property("Effects")("ADBE Shift Channels")("Take Green From").setValue(3)
app.project.activeItem.layers.byName("GREEN").property("Effects")("ADBE Shift Channels")("Take Red From").setValue(10);






//connect GUI slider to x position

//Green slider
app.project.activeItem.layers.byName("GREEN").position.setValue(app.project.activeItem.layers.byName("GREEN").position.value + [(Gslider.value),0])
Gslider.onChanging = function () {
    app.project.activeItem.layers.byName("GREEN").position.setValue([(Gslider.value+app.project.activeItem.width/2),app.project.activeItem.height/2])
    }

// Red slider
app.project.activeItem.layers.byName("RED").position.setValue(app.project.activeItem.layers.byName("RED").position.value + [(Rslider.value),0])
Rslider.onChanging = function () {
    app.project.activeItem.layers.byName("RED").position.setValue([(Rslider.value+app.project.activeItem.width/2),app.project.activeItem.height/2])
    }

// Blue slider
app.project.activeItem.layers.byName("BLUE").position.setValue(app.project.activeItem.layers.byName("BLUE").position.value + [(Bslider.value),0])

Bslider.onChanging = function () {
    app.project.activeItem.layers.byName("GREEN").position.setValue([(Bslider.value+app.project.activeItem.width/2),app.project.activeItem.height/2])
    
    app.endUndoGroup();
    
    }
}
else (alert("Please select a layer")) 
}







