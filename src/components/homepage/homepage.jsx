import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const ListenerDashboard = () => {
  // State declarations
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [subscribedPodcasts, setSubscribedPodcasts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [trending, setTrending] = useState([]);

  const navigate = useNavigate();

  // Fetch data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        const [
          recentlyPlayedRes,
          subscribedRes,
          recommendationsRes,
          trendingRes
        ] = await Promise.all([
          fetch(`${process.env.REACT_APP_BASE_URL}/api/user/recently-played`, requestOptions),
          fetch(`${process.env.REACT_APP_BASE_URL}/api/user/subscribed`, requestOptions),
          fetch(`${process.env.REACT_APP_BASE_URL}/api/user/recommendations`, requestOptions),
          fetch(`${process.env.REACT_APP_BASE_URL}/api/user/trending`, requestOptions)
        ]);

        console.log(recentlyPlayedRes);

        const recentlyPlayedData = await recentlyPlayedRes.json();
        const subscribedData = await subscribedRes.json();
        const recommendationsData = await recommendationsRes.json();
        const trendingData = await trendingRes.json();

        console.log(recentlyPlayedData);
        console.log(subscribedData);
        console.log(recommendationsData);
        console.log(trendingData);

        setRecentlyPlayed(recentlyPlayedData);
        setSubscribedPodcasts(subscribedData);
        setRecommendations(recommendationsData);
        setTrending(trendingData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // You might want to add error handling UI here
        navigate('/login');
      }
    };

    fetchDashboardData();
  }, []);

  // Event handlers
  const handlePlayEpisode = (podcast) => {
    console.log(`Playing episode: ${podcast.title}`);
    // Add your audio playing logic here
    // For example: audioPlayer.play(episode.audioUrl);
    navigate(`/podcast/${podcast.id}`);
  };

  const handlePodcastClick = (podcast) => {
    console.log(`Navigating to podcast: ${podcast.name}`);
    // Add navigation logic here
    // For example: history.push(`/podcast/${podcast.id}`);
    navigate(`/podcast/${podcast.id}`);
  };

  const handleRecommendationClick = (podcast) => {
    console.log(`Opening recommendation: ${podcast.title}`);
    // Add navigation logic here
    navigate(`/podcast/${podcast.id}`);
  };

  const handleTrendingClick = (podcast) => {
    console.log(`Opening trending podcast: ${podcast.title}`);
    // console.log(trending);
    // console.log(podcast.id);

    // Add navigation logic here
    navigate(`/podcast/${podcast.id}`);
  };

  return (
    <div className="dashboard-container container py-4">
      <h1 className="dashboard-header mb-4">Welcome Back!</h1>
  
      <div className="row g-4">
        {/* Recently Played Section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-clock me-2"></i>
                Recently Played
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {recentlyPlayed.map(episode => (
                  <div
                    key={episode.id}
                    className="list-group-item d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() => handlePlayEpisode(episode)}
                    role="button"
                  >
                    <div>
                      <h6 className="mb-0">{episode.title}</h6>
                      <small className="text-muted">{episode.show}</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <small className="text-muted me-3">{episode.duration}</small>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handlePlayEpisode(episode)}
                        title="Play episode"
                      >
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Subscriptions Section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-headphones me-2"></i>
                Your Subscriptions
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {subscribedPodcasts.map(podcast => (
                  <div
                    key={podcast.id}
                    className="list-group-item d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() => handlePodcastClick(podcast)}
                    role="button"
                  >
                    <div>
                      <h6 className="mb-0">{podcast.name}</h6>
                      {podcast.newEpisodes > 0 && (
                        <span className="badge bg-primary rounded-pill">
                          {podcast.newEpisodes} new
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Recommendations Section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-star me-2"></i>
                Recommended For You
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {recommendations.map(podcast => (
                  <div
                    key={podcast.id}
                    className="list-group-item d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() => handleRecommendationClick(podcast)}
                    role="button"
                  >
                    <div>
                      <h6 className="mb-0">{podcast.title}</h6>
                      <small className="text-muted">{podcast.category}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Trending Section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-chart-line me-2"></i>
                Trending Now
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {trending.map(podcast => (
                  <div
                    key={podcast.id}
                    className="list-group-item d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() => handleTrendingClick(podcast)}
                    role="button"
                  >
                    <div>
                      <h6 className="mb-0">{podcast.title}</h6>
                      <small className="text-muted">{podcast.category}</small>
                    </div>
                    <small className="text-muted">{podcast.listeners} listeners</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListenerDashboard;