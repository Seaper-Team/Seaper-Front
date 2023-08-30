/** 
 * Seaper 根页面
 * @author Xiaoyi311
 */

import { useNavigate } from "react-router-dom";
import { USER_INIT, apiReq, getUserInfo } from "../util/api";

export default () => {
    const navigate = useNavigate();

    //是否初始化
    apiReq(USER_INIT, "GET").then((init) => {
        if(init.data == false){
            navigate("/init");
        }
    });

    //是否登录
    getUserInfo().then((info) => {
        if(info.status == 403){
            navigate("/login");
        }
    });

    return (
        <div>Hello Seaper!</div>
    );
}