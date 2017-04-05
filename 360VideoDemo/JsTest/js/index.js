const traffic = document.getElementById("traffic");
/*
 * 法一：不利于扩展，多重回调
 */
/*(function reset(){
	traffic.className="wait";
	setTimeout(function(){
		traffic.className="stop";
		setTimeout(function(){
			traffic.className="pass"
			setTimeout(reset,2000);
		},2000);		
	},2000);
})();*/
/*
 * 法二,封装性差，依赖于外部变量
 */
/*var states = ["wait", "stop", "pass"];
var currentState = 0;
setInterval(function() {
	var state = states[currentState];
	traffic.className = state;
	currentState = ++currentState % states.length;
}, 1000)*/
/*
 * 法三，抽象出数据
 */
/*function trafficLight(traffic, states) {
	var currentState = 0;
	setInterval(function() {
		var state = states[currentState];
		traffic.className = state;
		currentState = ++currentState % states.length;
	}, 1000);
}
trafficLight(traffic, ["wait", "stop", "pass"]);*/
/*
 * 法四，函数式编程，抽象出过程
 */
/*function poll(...fnList) {
	let currentState = 0;
	return function(...args) {
		let fn = fnList[currentState++ % fnList.length];
		return fn.apply(this, args);
	}
}

function setState(state) {
	traffic.className = state;
}

let trafficStatePoll = poll(setState.bind(null, "wait"),
	setState.bind(null, "stop"),
	setState.bind(null, "pass")
);
setInterval(trafficStatePoll, 1000);*/
//function a(){return 0};
//function b(){return 1};
//var toggle=poll(a,b);
//console.log([toggle(),toggle(),toggle(),toggle()]);
/*
 * 法五，利用Promise抽象出时间
 */
function wait(time){
	return new Promise(resolve=>setTimeout(resolve,time));
}
function setState(state) {
	traffic.className = state;
}
function reset () {
	Promise.resolve()
	.then(setState.bind(null,"wait"))
	.then(wait.bind(null,1000))
	.then(setState.bind(null,"stop"))
	.then(wait.bind(null,2000))
	.then(setState.bind(null,"pass"))
	.then(wait.bind(null,3000))
	.then(reset);
}
reset();
/*
 * 法六，
 */