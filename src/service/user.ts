/**
 * 用户服务
 * @author Xiaoyi311
 */

import { USER_INIT, apiReq } from "../util/api"

export default new class UserManager{
    /**
     * 初始化用户系统
     */
    async init(username: string, password: string): Promise<string>{
        const data = await apiReq(USER_INIT, "POST", {
            username: username,
            password: password
        });
        return data.data;
    }
}