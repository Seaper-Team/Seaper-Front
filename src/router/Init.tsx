/** 
 * Seaper 初始化页面
 * @author Xiaoyi311
 */

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import i18n from "../service/i18n";
import userM from "../service/user";
import style from '../css/init.module.css';
import { Input, Select, notification } from 'antd';
import { Md5 } from 'ts-md5';

export default () => {
    const navigate = useNavigate();
    const [aniStatus, setAniStatus] = useState(0);
    const [step, setStep] = useState(1);
    const [isOk, setIsOk] = useState([true, true, true]);
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [lang, setLang] = useState("");

    /**
     * 语言更改
     */
    function langChange(value: string) { setLang(value); }

    /**
     * 语言更改
     */
    function usernameChange(e: any) {
        const temp = user;
        temp.username = e.target.value;
        setUser(temp);
    }

    /**
     * 语言更改
     */
    function passwordChange(e: any) {
        const temp = user;
        temp.password = e.target.value;
        setUser(temp);
    }

    /**
     * 步骤检测
     */
    async function stepCheck(): Promise<boolean>{
        let result;
        switch (step){
            case 2:
                result = true;
                //语言是否未选择
                if (lang == ""){
                    notification.error({
                        message: i18n.msg("error.title"),
                        description: i18n.msg("error.notSelectLang")
                    });
                    result = false;
                }
                //是否需要进一步
                if(result){
                    //初始化语言
                    const data = await i18n.setLang(lang, true);
                    //是否更改成功
                    if(data != "OK"){
                        notification.error({
                            message: i18n.msg("error.title"),
                            description: data
                        });
                        setIsOk([true, true, true]); //特殊情况，未知报错元素
                        return false;
                    }
                }
                setIsOk([result, true, true]);
                return result;
            case 3:
                result = [true, true, true];
                //用户名是否为空
                if (user.username == ""){
                    notification.error({
                        message: i18n.msg("error.title"),
                        description: i18n.msg("user.usernameNull")
                    });
                    result[1] = false;
                }
                //密码是否为空
                if (user.password == ""){
                    notification.error({
                        message: i18n.msg("error.title"),
                        description: i18n.msg("user.passwordNull")
                    });
                    result[2] = false;
                }
                //是否需要进一步且密码不足5位
                if (result[1] && result[2]){
                    if (user.password.length < 5){
                        notification.error({
                            message: i18n.msg("error.title"),
                            description: i18n.msg("user.passwordTooShort")
                        });
                        result[2] = false;
                    } else {
                        //初始化用户系统
                        const data = await userM.init(user.username, Md5.hashStr(user.password));
                        //是否更改成功
                        if(data != "OK"){
                            notification.error({
                                message: i18n.msg("error.title"),
                                description: data
                            });
                            setIsOk([true, true, true]); //特殊情况，未知报错元素
                            return false;
                        }
                    }
                }
                setIsOk(result);
                return result[1] && result[2];
            default:
                return true;
        }
    }

    /**
     * 下一步
     */
    async function nextStep() {
        if (step == 4){
            navigate("/");
            return;
        }

        //检查是否成功
        if(!await stepCheck()){
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
                    <p className={style.title}>{i18n.msg("init.p" + step + "-title")}</p>
                    <p className={style.des}>{i18n.msg("init.p" + step + "-des")}<br/></p>
                    {
                        step == 2 ? 
                        <div>
                            <Select
                                className={style.lang}
                                showSearch
                                status={isOk[0] ? "" : "error"}
                                placeholder={i18n.msg("init.p2-sel")}
                                onChange={langChange}
                                filterOption={(input, option) =>
                                    (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase())
                                }
                                options={i18n.langs}
                            />
                        </div>
                        : null
                    }
                    {
                        step == 3 ? 
                        <div className={style.form}>
                            <div className={style.formItem}>
                                {i18n.msg("user.username")}:
                                <Input
                                    className={style.input}
                                    status={isOk[1] ? "" : "error"}
                                    placeholder={i18n.msg("init.p3-nameInput")}
                                    onChange={(e) => usernameChange(e)}
                                />
                            </div>
                            <div className={style.formItem}>
                                {i18n.msg("user.password")}:
                                <Input.Password
                                    className={style.input}
                                    status={isOk[2] ? "" : "error"}
                                    placeholder={i18n.msg("init.p3-passInput")}
                                    onChange={(e) => passwordChange(e)}
                                />
                            </div>
                        </div>
                        : null
                    }
                    <div className={style.btn} onClick={nextStep}>
                        <p className={style.btn_text}>{step == 1 ? i18n.msg("step.start") : step == 4 ? i18n.msg("step.over") : i18n.msg("step.next")}</p>
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
