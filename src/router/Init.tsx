/** 
 * Seaper 初始化页面
 * @author Xiaoyi311
 */

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../css/init.module.css';

export default () => {
    const navigate = useNavigate();
    const [aniStatus, setAniStatus] = useState(0);
    const [step, setStep] = useState(1);

    function nextStep() {
        if (step == 4){
            navigate("/");
            return;
        }

        console.log("Next Step");
        setAniStatus(1);
        setTimeout(() => {
            console.log("Ani Ready");
            setAniStatus(2);

            setStep(step + 1);
            console.log("Step Change: " + step);
            setTimeout(() => {
                console.log("Ani Start");
                setAniStatus(3);
            }, 800);
        }, 800);
    }

    return(
        <div className={style.background}>
            <div className={`${aniStatus == 0 || aniStatus == 3 ? style.show : style.hide} ${aniStatus == 2 ? style.ready : ""}`}>
                <div className={style.card}>
                    <p className={style.title}>欢迎使用 Seaper 管理系统</p>
                    <p className={style.des}>Hi! 欢迎使用 Seaper!<br/>看起来您是刚刚启动 Seaper, 让我们开始安装引导吧!</p>
                    <div className={style.btn} onClick={nextStep}>
                        <p className={style.btn_text}>{step == 1 ? "开始" : step == 4 ? "完成" : "继续"}</p>
                    </div>
                    <i className={`seaperIcon sicon-${
                        step == 1 ? "publish" : 
                        step == 2 ? "earth" :
                        step == 3 ? "user" :
                        "ok"
                    } ${style.icon}`}/>
                </div>
            </div>
            <div className={style.aniBack}>
                <img src='/image/init-2.png' title='init-2' className={`${style.ani} ${step > 1 ? style.aniShow : style.aniHide}`}/>
                <img src='/image/init-3.png' title='init-3' className={`${style.ani} ${step > 2 ? style.aniShow : style.aniHide}`}/>
                <img src='/image/init-4.png' title='init-4' className={`${style.ani} ${step > 3 ? style.aniShow : style.aniHide}`}/>
            </div>
            <p className={style.note}>Powered By Xiaoyi311 & SkyWorldStudio</p>
        </div>
    );
}