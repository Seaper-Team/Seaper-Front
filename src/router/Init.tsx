/** 
 * Seaper 初始化页面
 * @author Xiaoyi311
 */

import style from '../css/init.module.css';

export default () => {
    return(
        <div className={style.background}>
            <div className={style.card}>
                <p className={style.title}>欢迎使用 Seaper 管理系统</p>
                <p className={style.des}>Hi！欢迎使用 Seaper！<br/>看起来您是刚刚启动 Seaper，让我们开始安装引导吧！</p>
                <div className={style.btn}>
                    <p className={style.btn_text}>开始</p>
                </div>
                <i className={`seaperIcon sicon-publish ${style.icon}`}/>
            </div>
            <p className={style.note}>Powered By Xiaoyi311 & SkyWorldStudio</p>
        </div>
    );
}