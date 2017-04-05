class Slider {
	constructor(id) {
		this.container = document.getElementById(id);
		this.items = this.container.querySelectorAll('.slider-list-item,.slider-list-item-selected');
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
	}
	slideNext() {
		let currentIndex = this.getSelectedItem();
		let nextIndex = (currentIndex + 1) % this.items.length;
		this.slideTo(nextIndex);
	}
	slideNext() {
		let currentIndex = this.getSelectedItem();
		let previousIndex = (this.items.length + currentIndex - 1) % this.items.length;
		this.slideTo(previousIndex);
	}
}
let slider = new Slider('my-slider');
setInterval(slider.slideNext.bind(slider),1000);
