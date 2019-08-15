import { get, post } from './ajax'
//post请求接口，测试样例，正式另写
export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);
//get请求接口，测试样例，正式另写
export const apiGet = p => get('api/v1/users/my_address/address_edit_before', p);

// 获取业务看台下部分card数据

export const getCustomerOrder = p => post('/orderInfo',p);