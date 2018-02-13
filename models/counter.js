class Counter {
  constructor(initialValue, addend) {
    this.initialValue = initialValue || 0;
    this.count = this.initialValue;
    this.addend = addend || 1;
  }

  increment() {
    return this.count += this.addend;             
  }

  reset() {
    this.count = this.initialValue;
  }
}
exports.Counter = Counter;
