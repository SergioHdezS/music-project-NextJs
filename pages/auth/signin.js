import Head from 'next/head'
import React, { useEffect } from 'react'
import Image from "next/image";
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import styles from './signIn.module.css';

function Signin({ providers }) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            // i wanna rout to my homepage if there is a session
            router.push("/");
        }
    }, [session]);

    if (session) return <Loader />;

    return (
        <div className={styles.page}>
            <Head>
                <title>Login - Spotify</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image
                src="/assets/spotify-complete-logo.jpg"
                height={250}
                width={600}
                objectFit="contain"
                className={styles.animation}
            />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className={styles.button}
                        onClick={() => signIn(provider.id)}
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Signin;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: { providers },
    };
}