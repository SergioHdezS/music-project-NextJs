import Image from 'next/image'
import React from 'react'
import styles from '../styles/sidebar.module.css';
import { signOut, useSession } from 'next-auth/react';
import { LogoutIcon } from '@heroicons/react/outline';

function Sidebar() {
    const { data: session } = useSession();
    return (
        <div className={styles.container}>
            <section className={styles.sidebar}>
                <img
                className={styles.icon}
                src='/assets/Spotify_Icon_RGB_Black.png' 
                alt=''
                />
                <div className={styles.userInfo}>
                    <img
                        src={session.user.image}
                        alt=""
                        className={styles.user}
                    />
                    <h3 className={styles.username}>{session.user.name}</h3>
                    <h2 className={styles.welcome}>Bienvenido!</h2>
                </div>
                <button
                    className={styles.button}
                    onClick={() => signOut({ redirect: false })}
                >
                        <LogoutIcon className={styles.logoutIcon}/>
                        <p className={styles.logout}>Cerrar Sesion</p>  
                </button>
            </section>
        </div>
    )
}

export default Sidebar