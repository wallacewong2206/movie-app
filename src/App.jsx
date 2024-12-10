import React, { useState } from "react";

function App() {
  const [movieTitle, setMovieTitle] = useState("Guardians of the Galaxy Vol. 2");
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState("");

  const movieList = [
    "Guardians of the Galaxy Vol. 2",
    "The Avengers",
    "Iron Man",
    "Black Panther",
  ];

  const fetchMovie = async (title) => {
    if (!title) return;

    const encodedTitle = encodeURIComponent(title);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodedTitle}&apikey=258a2345`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovieData(data);
        setError("");
      } else {
        setError(data.Error);
        setMovieData(null);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch movie data.");
      setMovieData(null);
    }
  };

  const handleMovieSelect = (event) => {
    setMovieTitle(event.target.value);
    fetchMovie(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", padding: "2px" }}>
      <h1>Movie App</h1>

      <select
        value={movieTitle}
        onChange={handleMovieSelect}
        style={{ padding: "3px", fontSize: "14px", margin: "3px 0" }}
      >
        <option value="" disabled>Select a Movie</option>
        {movieList.map((movie, index) => (
          <option key={index} value={movie}>
            {movie}
          </option>
        ))}
      </select>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display movie data */}
      {movieData && (
        <div style={{ marginTop: "3px" }}>
          <h2>{movieData.Title}</h2>
          <img src={movieData.Poster} alt={`${movieData.Title} Poster`} style={{ maxWidth: "300px" }} />

          {/* Plot text below the poster */}
          <p style={{ maxWidth: "300px", margin: "20px auto", textAlign: "center" }}>
            {movieData.Plot}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
