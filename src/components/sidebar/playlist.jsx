import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card, Container, Row, Col, Dropdown } from 'react-bootstrap';
import './playlist.css';

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/playlists`);
      if (!response.ok) throw new Error('Failed to fetch playlists');
      const data = await response.json();
      setPlaylists(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load playlists');
      setLoading(false);
    }
  };

  const createPlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/playlists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newPlaylistName })
      });
      if (!response.ok) throw new Error('Failed to create playlist');
      const newPlaylist = await response.json();
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setShowModal(false);
    } catch (err) {
      setError('Failed to create playlist');
    }
  };

  const updatePlaylist = async (id) => {
    if (!editName.trim()) return;
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/playlists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName })
      });
      if (!response.ok) throw new Error('Failed to update playlist');
      const updatedPlaylist = await response.json();
      setPlaylists(playlists.map(p => p.id === id ? updatedPlaylist : p));
      setEditingId(null);
      setEditName('');
    } catch (err) {
      setError('Failed to update playlist');
    }
  };

  const deletePlaylist = async (id) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      try {
        const response = await fetch(`${REACT_APP_BASE_URL}/api/playlists/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete playlist');
        setPlaylists(playlists.filter(p => p.id !== id));
      } catch (err) {
        setError('Failed to delete playlist');
      }
    }
  };

  const addPodcastToPlaylist = async (playlistId, podcastId) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/playlists/${playlistId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ podcastId })
      });
      if (!response.ok) throw new Error('Failed to add podcast to playlist');
      await fetchPlaylists();
    } catch (err) {
      setError('Failed to add podcast to playlist');
    }
  };

  const removePodcastFromPlaylist = async (playlistId, podcastId) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/playlists/${playlistId}/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ podcastId })
      });
      if (!response.ok) throw new Error('Failed to remove podcast from playlist');
      await fetchPlaylists();
    } catch (err) {
      setError('Failed to remove podcast from playlist');
    }
  };

  if (loading) return <div className="loading-spinner">Loading playlists...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <Container className="playlist-manager">
      <div className="header-section">
        <h2 className="main-title">Your Playlists</h2>
        <Button variant="primary" onClick={() => setShowModal(true)} className="create-playlist-btn">
          Create New Playlist
        </Button>
      </div>

      {/* Create Playlist Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Enter playlist name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createPlaylist}>
            Create Playlist
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Playlists Grid */}
      <Row className="playlists-grid">
        {playlists.map(playlist => (
          <Col key={playlist.id} xs={12} md={6} lg={4} className="playlist-col">
            <Card className="playlist-card">
              <Card.Body>
                {editingId === playlist.id ? (
                  <div className="edit-playlist-form">
                    <Form.Control
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <div className="edit-buttons">
                      <Button variant="success" size="sm" onClick={() => updatePlaylist(playlist.id)}>
                        Save
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="playlist-header">
                    <h3 className="playlist-title">{playlist.name}</h3>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id={`dropdown-${playlist.id}`}>
                        •••
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                          setEditingId(playlist.id);
                          setEditName(playlist.name);
                        }}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => deletePlaylist(playlist.id)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
                
                <div className="playlist-content">
                  {playlist.podcasts?.length > 0 ? (
                    <ul className="podcast-list">
                      {playlist.podcasts.map(podcast => (
                        <li key={podcast.id} className="podcast-item">
                          <span>{podcast.title}</span>
                          <Button
                            variant="link"
                            className="remove-podcast-btn"
                            onClick={() => removePodcastFromPlaylist(playlist.id, podcast.id)}
                          >
                            ×
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-podcasts">No podcasts added yet</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Playlist;