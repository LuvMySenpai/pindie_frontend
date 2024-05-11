"use client"

import { useStore } from '../../store/app-store';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { AuthForm } from '../AuthForm/AuthForm';
import { RegForm } from '../RegForm/RegForm';
import { Overlay } from '../Overlay/Overlay';
import { Popup } from '../Popup/Popup';

import Styles from './Header.module.css';
import Link from 'next/link';

export const Header = () => {
    const [authPopupIsOpened, setAuthPopupIsOpened] = useState(false);
    const [regPopupIsOpened, setRegPopupIsOpened] = useState(false);

    const authContext = useStore();
    const pathname = usePathname();

    const router = useRouter();

    const openAuthPopup = () => {
        setAuthPopupIsOpened(true);
    };

    const closeAuthPopup = () => {
        setAuthPopupIsOpened(false);
    };

    const openRegPopup = () => {
        setRegPopupIsOpened(true);
    };

    const closeRegPopup = () => {
        setRegPopupIsOpened(false);
    };

    const handleLogout = () => {
        authContext.logout();
    };

    return (
        <header className={Styles['header']}>

            {
                pathname === "/" ?
                    <img
                        className={Styles['logo']}
                        src="/images/logo.svg"
                        alt="Логотип Pindie"
                    />
                    :
                    <Link href="/" className={Styles['logo']}>
                        <img
                            className={Styles['logo__image']}
                            src="/images/logo.svg"
                            alt="Логотип Pindie"
                        />
                    </Link>
            }

            <nav className={Styles['menu']}>
                <ul className={Styles['menu__list']}>
                    <li className={Styles['menu__item']}>
                        <Link
                            href="/new"
                            className={`${Styles["menu__link"]} ${pathname === "/new" ? Styles["menu__link_active"] : ""
                                }`}
                        >
                            Новинки
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link
                            href="/popular"
                            className={`${Styles["menu__link"]} ${pathname === "/popular" ? Styles["menu__link_active"] : ""
                                }`}
                        >
                            Популярные
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link
                            href="/shooters"
                            className={`${Styles["menu__link"]} ${pathname === "/shooters" ? Styles["menu__link_active"] : ""
                                }`}
                        >
                            Шутеры
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link
                            href="/runners"
                            className={`${Styles["menu__link"]} ${pathname === "/runners" ? Styles["menu__link_active"] : ""
                                }`}
                        >
                            Ранеры
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link
                            href="/pixel-games"
                            className={`${Styles["menu__link"]} ${pathname === "/pixel-games" ? Styles["menu__link_active"] : ""
                                }`}
                        >
                            Пиксельные
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link
                            href="/tds"
                            className={`${Styles["menu__link"]} ${pathname === "/tds" ? Styles["menu__link_active"] : ""
                                }`}
                        >
                            TDS
                        </Link>
                    </li>
                </ul>
                <div className={Styles['auth']}>
                    {
                        authContext.isAuth ? (
                            <button className={Styles['auth__button']} onClick={handleLogout}>Выйти</button>
                        ) : (
                            <button className={Styles['auth__button']} onClick={openAuthPopup}>Войти</button>
                        )
                    }
                </div>
                <div className={Styles['auth']}>
                    <button className={Styles['auth__button']} onClick={openRegPopup} disabled={authContext.isAuth}>Регистрация</button>
                </div>
                <div className={Styles['auth']}>
                    <button className={Styles['auth__button']} onClick={() => router.push('/profile')} disabled={!authContext.isAuth}>Профиль</button>
                </div>
            </nav>
            <Overlay isOpened={authPopupIsOpened} close={closeAuthPopup} />
            <Popup isOpened={authPopupIsOpened} close={closeAuthPopup}>
                <AuthForm close={closeAuthPopup} setAuth={authContext.isAuth} />
            </Popup>

            <Overlay isOpened={regPopupIsOpened} close={closeRegPopup}/>
            <Popup isOpened={regPopupIsOpened} close={closeRegPopup}>
                <RegForm close={closeRegPopup} setAuth={authContext.isAuth}/>
            </Popup>
        </header>
    )
};