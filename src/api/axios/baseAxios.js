import init from './axios'

const service = init(process.env.VUE_APP_BASE_API);

export default service;