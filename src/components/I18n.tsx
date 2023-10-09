/**
 * 国际化组件
 * @author Xiaoyi311
 */

import i18n from "../service/i18n";

export default (props: any) => {
    return(
        i18n.msg(props.node).split("\n").map((v, i) => {
            return([(i != 0 ? <br/> : ""), v]);
        }
    ));
}