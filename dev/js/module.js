class MyClass {
    constructor() {
        this.header = document.querySelector('.super-header')
        this.header.addEventListener("click", this.log);
    }

    log(e) {
        e.stopPropagation()
        alert("Hey Yo Bro")
    }
}
export let test = new MyClass()
