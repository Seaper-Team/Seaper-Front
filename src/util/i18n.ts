/**
 * 国际化管理器
 * @author Xiaoyi311
 */

import { LANG_GET, apiReq } from "./api"

export default new class I18NManager {
    /**
     * 语言数据
     */
    langData: any;

    /**
     * 初始化语言系统
     */
    async initLang(): Promise<void> {
        console.log("Getting Lang");
        this.langData = (await apiReq(LANG_GET, "GET")).data;
    }

    /**
     * 初始化语言系统
     */
    msg(nodes: string): string {
        let data: any = this.langData;
        nodes.split(".").forEach(node => {
            data = data[node];
        });
        return data == undefined ? nodes : data;
    }
}