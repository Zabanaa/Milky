class MyClass {
    constructor() {
        this.header = document.querySelector('.super-header')
        this.header.addEventListener("click", this.log);
    }

    log() {
        console.log("Hey Bro");
    }
}
export let test = new MyClass()
