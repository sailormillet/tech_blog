module.exports = class HelloWordPlugin {
    apply(compiler) {
        var start = Date.now()
        console.log('HelloWord', start)
    }
}