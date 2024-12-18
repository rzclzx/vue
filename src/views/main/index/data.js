import _ from 'lodash'
let arr = []
for (let i = 0; i < 6; i++) {
  arr.push({
    ind: i,
    a: 0,
    b: 0,
    c: 0
  })
}
const getData = () => {
  return _.cloneDeep(arr)
}
export default getData
