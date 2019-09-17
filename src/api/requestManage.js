/**
 *  @author liuyihu
 *  @date 2019/4/28 11:57
 *
 *  所有的请求统一放在这里维护
 */

import {get, post} from './api'

// TOPO接口

// 新增节点接口
export const nodeInsert = data => post('/node/newNodeConfig', data);
// 查询节点列表接口
export const nodeQueryList = data => post('/node/findNodeConfigByPage', data);
// 删除节点接口
export const nodeDelete = data => post('/node//delNodeConfig', data);

// 查询连线列表接口
export const lineQueryList = data => post('/line/findLineConfigByPage', data);
// 新增连线接口
export const lineInsert = data => post('/line/newLineConfig', data);
// 删除连线接口
export const lineDelete = data => post('/line/delLineConfig', data);

// 查询菜单项列表接口
export const menuItemQueryList = data => post('/Menu/findMenuItemByPage', data);
// 新增菜单项接口
export const menuItemInsert = data => post('/Menu/newMenuItem', data);
// 修改菜单项接口
export const menuItemUpdate = data => post('/Menu/updateMenuItem', data);
// 删除菜单项接口
export const menuItemDelete = data => post('/Menu/delMenuItem', data);
// 查询菜单项详情接口
export const menuItemQueryById = data => post('Menu/findMenuItemById', data);