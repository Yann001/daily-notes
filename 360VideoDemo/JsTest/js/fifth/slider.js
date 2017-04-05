class Slider {
	constructor(id, cycle = 3000) {
		this.container = document.getElementById(id);
		this.items = this.container.querySelectorAll('.slider-list-item,.slider-list-item-selected');
		this.cycle = cycle;
		this.slideHandlers = [];

		let controller = this.container.querySelector('.slider-list-control');
		if(controller) {
			let buttons = document.querySelectorAll('.slider-list-control-button, .slider-list-control-button-selected');
			controller.addEventListener('mouseover', evt => {				
				let idx = Array.from(buttons).indexOf(evt.target);
				console.log(idx);
				if(idx >= 0) {
					this.slideTo(idx);
					this.stop();
				}
			});
			controller.addEventListener('mouseover', evt => {
				this.start();
			});
			this.addSlideListener(function(idx) {
				let selected = controller.querySelector('.slider-list-control-button-selected');
				if(selected) {
					selected.className = 'slider-list-control-button';
				}
				buttons[idx].className = 'slider-list-control-button-selected';
			});
		}
	}
	getSelectedItem() {
		let selected = this.container.querySelector('.slider-list-item-selected');
		return selected;
	}
	getSelectedItemIndex() {
		return Array.from(this.items).indexOf(this.getSelectedItem());
	}
	slideTo(index) {
		let selected = this.getSelectedItem();
		if(selected) {
			selected.className = 'slider-list-item';
		}
		let item = this.items[index];
		if(item) {
			item.className = 'slider-list-item-selected';
		}
		this.slideHandlers.forEach(handler => { 
			handler(index); 
		});
//		this.slideHandlers.forEach(function(item){
//			item(index);
//		});
	}
	slideNext() {
		let currentIndex = this.getSelectedItemIndex();
		let nextIndex = (currentIndex + 1) % this.items.length;
		this.slideTo(nextIndex);
	}
	slidePrevious() {
		let currentIndex = this.getSelectedItemIndex();
		let previousIndex = (this.items.length + currentIndex - 1) % this.items.length;
		this.slideTo(previousIndex);
	}
	start() {
		this.stop();
		this.slideTimer = setInterval(() => { 
			this.slideNext(); 
		}, this.cycle);
	}
	stop() {
		clearInterval(this.slideTimer);
	}
	addSlideListener(handler) {
		this.slideHandlers.push(handler);
	}
}
let slider = new Slider('my-slider');
slider.start();
//setInterval(slider.slideNext.bind(slider),1000);