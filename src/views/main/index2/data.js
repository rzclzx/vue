import _ from 'lodash'
const getData = () => {
  return _.cloneDeep([
    {
      ind: 0,
      a: undefined,
      b: 0,
      c: 0
    },
    {
      ind: 1,
      a: 0,
      b: 0,
      c: 0
    }
  ])
}
export default getData
