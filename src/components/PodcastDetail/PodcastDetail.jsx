// src/components/PodcastDetail/PodcastDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistManager from './PlaylistManager';
import './PodcastDetail.css';

const PodcastDetail = () => {
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        setLoading(true);

        // Headers
        const myHeaders = new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Accept": "*/*"
        });
        const body = JSON.stringify({ podcastId: id });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: body,
          redirect: "follow"
        };
        
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/podcasts/recently-played`, requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/podcasts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch podcast details');
        }
        const data = await response.json();
        console.log(data);
        setPodcast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastDetails();
  }, [id]);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (error) return <div className="error-container">{error}</div>;
  if (!podcast) return <div className="not-found">Podcast not found</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="podcast-detail-wrapper">
      <div className="podcast-detail-container">
        <div className="podcast-header">
          <div className="podcast-hero">
            <img 
              src={podcast.coverImage} 
              alt={podcast.name} 
              className="podcast-cover-image" 
            />
            <div className="podcast-header-content">
              <h1>{podcast.name}</h1>
              <h2>{podcast.title}</h2>
              <div className="podcast-meta">
                <span className="category">{podcast.category}</span>
                <span className="release-date">
                  Released: {formatDate(podcast.releaseDate)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="podcast-stats">
            {[
              { icon: 'headphones', value: podcast.statistics.totalListeningHours.toLocaleString(), label: 'Listening Hours' },
              { icon: 'thumbs-up', value: podcast.statistics.likes.toLocaleString(), label: 'Likes' },
              { icon: 'thumbs-down', value: podcast.statistics.dislikes.toLocaleString(), label: 'Dislikes' }
            ].map((stat, index) => (
              <div key={index} className="stat-item">
                <i className={`fas fa-${stat.icon}`}></i>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <PlaylistManager podcast_id={id} />

        <div className="podcast-content">
          <div className="main-content">
            <section className="description">
              <h3>About this Podcast</h3>
              <p>{podcast.description}</p>
            </section>

            <section className="audio-player">
              <h3>Listen Now</h3>
              <div className="audio-player-container">
                {/* <audio controls src={podcast.audioFile.url}> */}
                <audio controls src='/audio/resources_sample-calls.mp3'>
                  Your browser does not support the audio element.
                </audio>
                <div className="audio-info">
                  <span>Format: {podcast.audioFile.format}</span>
                  <span>Duration: {formatDuration(podcast.audioFile.duration)}</span>
                </div>
              </div>
            </section>

            <section className="hosts">
              <h3>Hosts</h3>
              <div className="hosts-grid">
                {podcast.hosts.map(host => (
                  <div key={host._id.$oid} className="host-card">
                    <img src={host.image} alt={host.name} className="host-image" />
                    <div className="host-details">
                      <h4>{host.name}</h4>
                      <p>{host.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="sidebar">
            {[
              { title: 'Topics', items: podcast.topics },
              { title: 'Genres', items: podcast.genres },
              { title: 'Keywords', items: podcast.keywords }
            ].map((section, index) => (
              <section key={index} className="tags-section">
                <h3>{section.title}</h3>
                <div className="tags">
                  {section.items.map(item => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </section>
            ))}

            <section className="target-demographic">
              <h3>Target Audience</h3>
              <div className="tags">
                {podcast.recommendationMetadata.targetDemographic.map(demo => (
                  <span key={demo} className="tag">{demo}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;