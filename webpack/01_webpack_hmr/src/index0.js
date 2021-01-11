function test() {
    console.log(333333)
}
function render() {
    div = document.createElement('div');
    div.innerHTML = 'hello world0';
    document.body.appendChild(div)
}
render()