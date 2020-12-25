import init from './axios'

const service = init(process.env.VUE_APP_USER_API);

export default service;