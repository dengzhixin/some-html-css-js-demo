const _ = require('lodash')
let obj1 = {
  a: {
    b: 1
  }
}
let obj2 = _.cloneDeep(obj1)
console.log(obj1 == obj2)