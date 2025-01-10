// PlaylistManager.jsx
import React, { useState, useEffect } from 'react';
import './PlaylistManager.css';

const PlaylistManager = ({ podcast_id }) => {
  const [playlists, setPlaylists] = useState([]);
  const [showNewPlaylistDialog, setShowNewPlaylistDialog] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    // Fetch user's playlists
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlists`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPlaylists(data);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    // Check if podcast is in favorites
    const checkFavorite = async () => {
      try {
        console.log(podcast_id);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/favorites/check/${podcast_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.isFavorite);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    fetchPlaylists();
    checkFavorite();
  }, [podcast_id]);

  const handleCreatePlaylist = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: newPlaylistName,
          podcasts: [podcast_id],
        }),
      });

      if (response.ok) {
        const newPlaylist = await response.json();
        setPlaylists([...playlists, newPlaylist]);
        setShowNewPlaylistDialog(false);
        setNewPlaylistName('');
        showAlertMessage('Playlist created successfully!', 'success');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      showAlertMessage('Failed to create playlist. Please try again.', 'danger');
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlists/${playlistId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          podcastId: podcast_id,
        }),
      });

      if (response.ok) {
        showAlertMessage('Added to playlist successfully!', 'success');
      }
    } catch (error) {
      console.error('Error adding to playlist:', error);
      showAlertMessage('Failed to add to playlist. Please try again.', 'danger');
    }
  };

  const toggleFavorite = async () => {
    try {
      const method = isFavorite ? 'DELETE' : 'POST';
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/favorites/${podcast_id}`, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        showAlertMessage(
          isFavorite ? 'Removed from favorites' : 'Added to favorites!',
          'success'
        );
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showAlertMessage('Failed to update favorites. Please try again.', 'danger');
    }
  };

  const showAlertMessage = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleShare = async () => {
    // try {
    //   await navigator.share({
    //     title: podcast.name,
    //     text: `Check out this podcast: ${podcast.name}`,
    //     url: window.location.href,
    //   });
    // } catch (error) {
    //   console.error('Error sharing:', error);
    //   showAlertMessage('Failed to share. Try copying the link instead.', 'warning');
    // }
  };

  return (
    <div className="playlist-manager">
      <div className="d-flex align-items-center gap-3 mb-3">
        <button
          className={`btn btn-outline-${isFavorite ? 'danger' : 'secondary'} favorite-btn`}
          onClick={toggleFavorite}
        >
          <i className={`bi bi-heart${isFavorite ? '-fill' : ''}`}></i>
        </button>

        <div className="dropdown">
          <button
            className="btn btn-outline-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-music-note-list me-2"></i>
            Add to Playlist
          </button>
          <ul className="dropdown-menu">
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <button
                  className="dropdown-item"
                  onClick={() => handleAddToPlaylist(playlist.id)}
                >
                  {playlist.name}
                </button>
              </li>
            ))}
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button
                className="dropdown-item text-primary"
                onClick={() => setShowNewPlaylistDialog(true)}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Create New Playlist
              </button>
            </li>
          </ul>
        </div>

        <button className="btn btn-outline-secondary" onClick={handleShare}>
          <i className="bi bi-share"></i>
        </button>
      </div>

      {/* Create Playlist Modal */}
      <div
        className={`modal fade ${showNewPlaylistDialog ? 'show' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showNewPlaylistDialog ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New Playlist</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowNewPlaylistDialog(false)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowNewPlaylistDialog(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreatePlaylist}
              >
                Create Playlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Message */}
      {alert.show && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show position-fixed bottom-0 end-0 m-3`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert({ show: false, message: '', type: '' })}
          ></button>
        </div>
      )}

      {/* Modal Backdrop */}
      {showNewPlaylistDialog && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
};

export default PlaylistManager;