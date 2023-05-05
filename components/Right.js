import React from 'react'
import { ViewGridIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RecentlyPlayed from "./RecentlyPlayed";
import styles from '../styles/right.module.css';

function Right({ chooseTrack, spotifyApi }) {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      setRecentlyPlayed(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  return (
    <section className={styles.rightSection}>

      {/* Recently Played Tracks */}
      <div className={styles.recentlyPlayed}>
        <div className={styles.recentlyPlayedTop}>
          <h4 className={styles.recentlyPlayedTitle}>Recently Played</h4>
          <ViewGridIcon className={styles.recentlyPlayedIcon} />
        </div>

        <div className={styles.recentlyPlayedList}>
          {recentlyPlayed.map((track, index) => (
            <RecentlyPlayed
              key={index}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Right;