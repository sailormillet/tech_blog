import { A } from './sync'
import B from './syncdefault'
console.log(A)
B()
import(/* webpackChunkName: "async" */ './async').then(content => {
    console.log('module async: ', content)
})