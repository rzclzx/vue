import utils from '@/utils/utils'

let state = {
  menuExpand: false,
  dict: {},
  scale: 1.5,
  // 追入率
  ratein: 0.8,
  // 止盈步长
  step: 0.2
}

let mutations = {
  SET_DICT: (state, value) => {
    state.dict = value
  },
  SET_MENUEXPAND (state, value) {
    state.menuExpand = value
  }
}

let actions = {
  setDict: ({ commit }, data) => {
    let dict = {};
    data = utils.clone(data);
    data.forEach(item => {
      dict[item.name] = {
        list: item.dictDetails,
        map: {}
      }
      item.dictDetails.forEach(val => {
        dict[item.name].map[val.value] = val.label;
      })
    })
    commit('SET_DICT', dict);
  }
}

export default {
  state,
  mutations,
  actions
}