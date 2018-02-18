class Counter {
  constructor(initialValue, addend) {
    this.initialValue = initialValue || 0;
    this.count = this.initialValue;
    this.addend = addend || 1;
  }

  increment() {
    this.count += this.addend;
    return this.count;
  }
  reset() {
    this.count = this.initialValue;
  }
}
exports.Counter = Counter;