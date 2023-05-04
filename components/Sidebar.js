import Image from 'next/image'
import React from 'react'
import {
    ChartBarIcon,
    ClockIcon,
    DotsHorizontalIcon,
    HomeIcon,
} from "@heroicons/react/solid";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";
import styles from '../styles/sidebar.module.css';

function Sidebar() {
    return (
        <section className={styles.sidebar}>
            <Image className={styles.image} src="/assets/spotifyLogo.png" alt="Logo de Spotify" width={56} height={56} />
            <div className={styles.icons}>
                <HomeIcon className={styles.home} />
                <RiCompassFill className={styles.riCompassFill} />
                <FaMicrophoneAlt className={styles.faMicrophoneAlt} />
                <ChartBarIcon className={styles.sidebarIcon} />
                <ClockIcon className={styles.sidebarIcon} />
                <DotsHorizontalIcon className={styles.sidebarIcon} />
            </div>
        </section>
    )
}

export default Sidebar