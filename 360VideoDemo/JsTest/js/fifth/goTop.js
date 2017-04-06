const threshold = 20; //滚动50px之后出现按钮

function goTop(id) {
	this.button = document.getElementById(id);
	let self = this;
	this.button.onclick = () => window.scrollTo(0, 0);
	window.onscroll = (evt) => self.update();
	this.update();
}

goTop.prototype.update = function() {
	if(window.scrollY > threshold) {
		this.button.className = 'scroll';
	} else {
		this.button.className = '';
	}
}

let gotop = new goTop('go-top');


