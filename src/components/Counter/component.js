//import '../Component2/component.js';


class BaseCounter {
}

class Counter extends BaseCounter {
    constructor() {
        super();
        this.count = 2048;
    }

    increment() {
        this.count += 1;
    }

    decrement() {
        this.count -= 1;
    }
}
