class SlInput extends HTMLElement{
    constructor() {
        super()
        return;
    }
}
customElements.define("sl-input", SlInput)
let slInput = document.createElement('sl-input')
slInput.innerHTML = '111';
document.body.appendChild(slInput);