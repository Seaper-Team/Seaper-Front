/**
 * Seaper 前端入口点
 * @author Xiaoyi311
 */

import router from "./router";
import I18NManager from "./service/i18n";

//初始化国际化
await I18NManager.initLang();

//加载路由
router();