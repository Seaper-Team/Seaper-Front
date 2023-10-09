/** 
 * API 控制器
 * @author Xiaoyi311
 */

import axios from "axios";

/**
 * 发送 Api 请求
 */
export async function apiReq(url:string, method:string, data?:any, params?:any): Promise<any>{
    const req = await axios.request({
        method: method,
        url: url,
        data: data,
        params: params,
        validateStatus: (status: number) => {
            return status == 200 || status == 400;
        }
    });

    //请求码
    if(req.status != 200 && req.status != 400){
        throw new Error("Error Response Code!");
    }

    return req.data;
}

/**
 * 获取用户信息
 */
export async function getUserInfo(){
    const req = await axios.request({
        method: "GET",
        url: USER_INFO,
        validateStatus: (status: number) => {
            return status == 200 || status == 403;
        }
    });

    //请求码
    if(req.status != 200 && req.status != 403){
        throw new Error("Error Response Code!");
    }

    return req;
}



/**
 * Api 路径集
 */
const API = "/api";

const USER = API + "/user";
export const USER_INIT = USER + "/init";
export const USER_INFO = USER + "/info";
const USER_AUTH = API + "/user/auth";
export const USER_AUTH_LOGIN = USER_AUTH + "/login";

const LANG = API + "/lang";
export const LANG_GET = LANG + "/get";
export const LANG_LIST = LANG + "/list";
export const LANG_INIT = LANG + "/init";
