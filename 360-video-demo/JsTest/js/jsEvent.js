var EventUtil = {
	addHandler: function(element, type, handler) {
		if(element.addEventListener) { //检测DOM2级方法
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent) { //检测IE方法
			element.attachEvent("on" + type, handler);
		} else { //检测DOM0级方法
			element["on" + type] = handler;
		}
	},
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}
}
///////////////////
var btn = document.getElementById("btn");
btn.onclick = function() {
	alert("Click Buttom");
}
var clickEvent = function() {
	alert("Click Buttom1");
};
btn.addEventListener("click", clickEvent);
setTimeout(function() {
	btn.removeEventListener("click", clickEvent);
}, 5000)
///////////////////
var pic = document.getElementsByTagName("img");
EventUtil.addHandler(pic[0],"click", function(event) {
	console.log(event);
	alert("Clent coordinates: " + event.clientX + "," + event.clientY);
	alert("Page coordinates: " + event.pageX + "," + event.pageY);
	alert("Screen coordinates: " + event.screenX + "," + event.screenY);
});