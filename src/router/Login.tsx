/** 
 * Seaper 登录页面
 * @author Xiaoyi311
 */

import { Button, Input, notification } from 'antd';
import style from '../css/login.module.css';
import { useState } from 'react';
import { USER_AUTH_LOGIN, apiReq } from '../util/api';
import { Md5 } from 'ts-md5';
import { useNavigate } from 'react-router-dom';
import i18n from '../service/i18n';
import I18n from '../components/I18n';

export default () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [data, setData] = useState<{
        username: string,
        password: string,
    }>({
        username: "",
        password: ""
    });
    const nav = useNavigate();

    const changeMode = () => {
        const page = document.getElementById("page");
        const panel = document.getElementById("panel");
        if(page != null && panel != null){
            page.style.opacity = "0";
            panel.style.right = isLoginMode ? "545px" : "0";
        }
        setTimeout(() => {
            setIsLoginMode(!isLoginMode);
            const page = document.getElementById("page");
            if(page != null && panel != null){
                page.style.opacity = "1";
            }
        }, 500);
    };

    const login = () => {
        console.log(data)
        apiReq(USER_AUTH_LOGIN, "POST", data).then((e) => {
            if(e.data == "OK"){
                nav("/");
            }else{
                notification.error({
                    message: i18n.msg("error.title"),
                    description: e.data
                });
            }
        });
    }

    return (
        <div className={style.background}>
            <div className={style.opaCard}>
                <img className={style.loginImg} alt='left' src='/image/Login-Left.png' />
                <img className={style.loginImg} style={{marginRight: "32px"}} alt='left' src='/image/Login-Right.png' />
                <div id="panel" className={style.panel}>
                    <div className={style.panels}>
                        <div className={style.title}>
                            <span><I18n node="login.welcome"/></span>
                            <img alt="icon" src="/image/Icon.png" />
                            <span>Seaper</span>
                        </div>
                        <div className={style.diver} />
                        {
                            isLoginMode ?
                                <div id="page" className={style.page}>
                                    <span className={style.pageTitle}><I18n node="login.login"/></span>
                                    <span className={style.pageDes}><I18n node="login.loginDes"/></span>
                                    <div className={style.login}>
                                        <div className={style.loginInfo}>
                                            <div>
                                                <span><I18n node="user.username"/></span>
                                                <Input onChange={(e) => setData({username: e.target.value, password: data.password})} className={style.input} placeholder={i18n.msg("user.inputUsername")} />
                                            </div>
                                            <div>
                                                <span><I18n node="user.password"/></span>
                                                <Input.Password onChange={(e) => setData({username: data.username, password: Md5.hashStr(e.target.value)})} className={style.input} placeholder={i18n.msg("user.inputPassword")} />
                                            </div>
                                        </div>
                                        <div className={style.btn}>
                                            <Button onClick={login} style={{marginTop: "20px"}} type="primary"><I18n node="login.loginPanel"/></Button>
                                            <Button onClick={changeMode}><I18n node="login.forget"/></Button>
                                        </div>
                                    </div>
                                    <div id="forget" className={style.note}>
                                        <span><I18n node="login.tips"/></span>
                                    </div>
                                </div>
                            :
                                <div id="page" className={style.page}>
                                    <span className={style.pageTitle}><I18n node="login.forget"/></span>
                                    <span className={style.pageDes}><I18n node="login.forgetDes"/></span>
                                    <span className={style.pageSTitle}><I18n node="login.forgetT1"/></span>
                                    <span className={style.pageDes}>
                                        <li><I18n node="login.forgetD1"/></li>
                                    </span>
                                    <span className={style.pageSTitle}><I18n node="login.forgetT2"/></span>
                                    <span className={style.pageDes}>
                                        <li><I18n node="login.forgetD2"/></li>
                                        <li><I18n node="login.forgetD3"/></li>
                                    </span>
                                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                        <Button type="primary" style={{width: "180px", height: '43px'}} onClick={changeMode}><I18n node="login.backLogin"/></Button>
                                    </div>
                                </div>
                        }
                    </div>
                    <img className={style.bottomImg} src='/image/Login-Bottom.png' title='background'/>
                </div>
            </div>
            <img src='/image/Login.png' title='background'/>
            <p className={style.pageNote}>Powered By Xiaoyi311 & SkyWorldStudio</p>
        </div>
    );
}