/** 
 * API 控制器
 * @author Xiaoyi311
 */

import axios from "axios";
import { ResponseData } from "src/model/ResponseData";

/**
 * 发送 Api 请求
 */
export async function apiReq(a:string, method:string, data?:any, params?:any){
    const req = await axios.request<ResponseData>({
        method: method,
        url: a,
        data: data,
        params: params,
    });

    //请求码
    if(req.status != 200 && req.status != 400){
        throw new Error("Error Response Code!");
    }

    return req.data;
}



/**
 * Api 路径集
 */
const API = "/api"

const USER = API + "/user"
export const USER_INIT = USER + "/init";
