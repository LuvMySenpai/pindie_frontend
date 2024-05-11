"use client"

import { useStore } from '../../store/app-store';
import { useEffect, useState } from 'react';

import { registrate, authorize, isResponseOk } from '../../api/api-utils';
import { endpoints } from '../../api/config';

import Styles from '../AuthForm/AuthForm.module.css';

export const RegForm = (props) => {
    const [regData, setRegData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState({ status: null, text: null });

    const authContext = useStore();

    const handleInput = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUserData = await registrate(endpoints.reg, regData);

        if (isResponseOk(newUserData)) {
            const authData = { identifier: regData.email, password: regData.password };
            const userData = await authorize(endpoints.auth, authData);

            if (isResponseOk(userData)) {
                authContext.login(userData.user, userData.jwt);
                setMessage({ status: "success", text: "Вы зарегистрировались!" });
            } else {
                setMessage({ status: "error", text: "Ошибка авторизации" });
            }
        } else {
            setMessage({ status: "error", text: "Ошибка регистрации" });
        }
    };

    useEffect(() => {
        let timer;
        if (authContext.user) {
            timer = setTimeout(() => {
                props.close();
            }, 1000)
        }
        return () => clearTimeout(timer);
    }, [authContext.user])

    return (
        <form onSubmit={handleSubmit} className={Styles['form']}>
            <h2 className={Styles['form__title']}>Регистрация</h2>
            <div className={Styles['form__fields']}>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Логин</span>
                    <input onInput={handleInput} className={Styles['form__field-input']} name="username" type="username" placeholder="username" />
                </label>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Email</span>
                    <input onInput={handleInput} className={Styles['form__field-input']} name="email" type="email" placeholder="hello@world.com" />
                </label>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Пароль</span>
                    <input onInput={handleInput} className={Styles['form__field-input']} name="password" type="password" placeholder='***********' />
                </label>
            </div>
            {
                message.status && (
                    <p className={Styles['form__message']}>{message.text}</p>
                )
            }
            <div className={Styles['form__actions']}>
                <button className={Styles['form__reset']} type="reset">Очистить</button>
                <button className={Styles['form__submit']} type="submit">Зарегистрироваться</button>
            </div>
        </form>
    )
};