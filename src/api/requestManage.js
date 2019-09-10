/**
 *  @author liuyihu
 *  @date 2019/4/28 11:57
 *
 *  所有的请求统一放在这里维护
 */

import {get, post} from './api'

export const demoGet = data => get('/modelManage/pageFindMmSpecAttribute', data);
export const demoPost = data => post('/modelManage/pageFindMmSpecAttribute', data);

// TOPO接口(本地测试)
export const nodeInsert = data => post('/node/insert', data);

