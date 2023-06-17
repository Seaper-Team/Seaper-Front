/**
 * 国际化服务
 * @author Xiaoyi311
 */

import { LANG_GET, LANG_INIT, LANG_LIST, apiReq } from "../util/api"

export default new class I18NManager {
    /**
     * 语言数据
     */
    langData: any;

    /**
     * 语言列表
     */
    langs: Array<any> = [];

    /**
     * 初始化语言系统
     */
    async initLang(): Promise<void> {
        console.log("Getting Lang");
        this.langData = (await apiReq(LANG_GET, "GET")).data;
        const langs = (await apiReq(LANG_LIST, "GET")).data;
        for (let i = 0; i < langs.length; i++) {
            this.langs[i] = {
                label: langs[i].name,
                value: langs[i].code
            }
        }
    }

    /**
     * 获取国际化信息
     */
    msg(nodes: string): string {
        let data: any = this.langData;
        nodes.split(".").forEach(node => {
            data = data[node];
        });
        return data == undefined ? nodes : data;
    }

    /**
     * 设置语言
     */
    async setLang(code: string, init?: boolean): Promise<string> {
        if(init != null){
            const data = await apiReq(LANG_INIT, "POST", {
                lang: code
            });
            this.initLang();
            return data.data;
        }
        return "";
    }
}