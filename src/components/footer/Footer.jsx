import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="now-playing">
        <img src="podcast-cover.jpg" alt="Podcast Cover" className="podcast-cover" />
        <div className="podcast-info">
          <span className="podcast-title">Beautiful mindset in our life</span>
          <span className="podcast-author">Jonathan Hope</span>
        </div>
      </div>
      <div className="playback-controls">
        <button className="control-button"><FontAwesomeIcon icon={faStepBackward} /></button>
        <button className="control-button"><FontAwesomeIcon icon={faPlay} /></button>
        <button className="control-button"><FontAwesomeIcon icon={faStepForward} /></button>
        <input type="range" min="0" max="100" value="50" className="progress-bar" />
        <span className="time-info">18:29 / 58:32</span>
        <FontAwesomeIcon icon={faVolumeUp} className="volume-icon" />
      </div>
    </footer>
  );
};

export default Footer;
