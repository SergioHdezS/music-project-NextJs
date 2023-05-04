import React, { useEffect, useState } from 'react'
import Search from './Search'
import { useSession } from 'next-auth/react';
import Poster from './Poster';
import Track from './Track';
import styles from '../styles/body.module.css';

function Body({ chooseTrack, spotifyApi }) {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Searching...
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  console.log(searchResults);

  // New Releases...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  console.log(newReleases);

  return (
    <section className={styles.bodyTopSection}>
      <Search search={search} setSearch={setSearch} />
      <div className={styles.firstResults}>
        {searchResults.length === 0
          ? newReleases
            .slice(0, 4)
            .map((track) => (
              <Poster
                key={track.id}
                track={track}
                chooseTrack={chooseTrack}
              />
            ))
          : searchResults
            .slice(0, 4)
            .map((track) => (
              <Poster
                key={track.id}
                track={track}
                chooseTrack={chooseTrack}
              />
            ))}
      </div>

      <div className={styles.bodyBottomSection}>
        {/* Tracks */}
        <div className={styles.trackListContainer}>
          <h2 className={styles.h2}>
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className={styles.trackList}>
            {searchResults.length === 0
              ? newReleases
                  .slice(4, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  .slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Body