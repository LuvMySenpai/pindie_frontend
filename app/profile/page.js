"use client"

import { useStore } from '../store/app-store';
import { useRouter } from 'next/navigation';

import Styles from './Profile.module.css';

export default function Profile() {
    const userContext = useStore();
    const router = useRouter();

    return (
        <form className={Styles['form']}>
            <h2 className={Styles['form__title']}>Профиль</h2>
            <div className={Styles['form__fields']}>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Логин</span>
                    <input className={Styles['form__field-input']} readOnly value={userContext.user.username}/>
                </label>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Email</span>
                    <input className={Styles['form__field-input']} readOnly value={userContext.user.email}/>
                </label>
            </div>
            <div className={Styles['form__actions']}>
                <button className={Styles['form__submit']} onClick={() => router.push('/')}>Выйти из профиля</button>
                {/* при выходе почему-то выдаёт ошибку
                    понятия не имею как это исправить */}
            </div>
        </form>
    );
};