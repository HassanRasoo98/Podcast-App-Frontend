import React, { useState } from "react";
import "./UploadPodcast.css";

const UploadPodcast = () => {
  const [podcast, setPodcast] = useState({
    name: "",
    date: "",
    description: "",
    artist: "",
    genre: "",
    tags: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPodcast((prevPodcast) => ({
      ...prevPodcast,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setPodcast((prevPodcast) => ({
      ...prevPodcast,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Podcast uploaded:", podcast);

    // Form data for file upload (Optional)
    // const formData = new FormData();
    // formData.append("name", podcast.name);
    // formData.append("date", podcast.date);
    // formData.append("description", podcast.description);
    // formData.append("artist", podcast.artist);
    // formData.append("genre", podcast.genre);
    // formData.append("tags", podcast.tags);
    // formData.append("file", podcast.file);
  };

  return (
    <div className="upload-podcast">
      <h2>Upload Podcast</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Podcast Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={podcast.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={podcast.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={podcast.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={podcast.artist}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={podcast.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={podcast.tags}
            onChange={handleChange}
            placeholder="e.g.,sad, rock, love"
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            accept="audio/*"
            required
          />
        </div>

        <button type="submit">Upload Podcast</button>
      </form>
    </div>
  );
};

export default UploadPodcast;
