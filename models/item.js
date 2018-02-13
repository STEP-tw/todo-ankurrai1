class Item {
	constructor(id, text) {
		this.id = id;
		this.text = text;
		this.done = false;
	}
	markAsDone() {
		return this.done = true;
	}
	isItemDone() {
		return this.done;
	}
	changeText(newText) {
		return this.text = newText;
	}
	markAsNotDone() {
		return this.done = false;
	}
}




module.exports = Item;
