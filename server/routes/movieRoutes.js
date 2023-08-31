const express = require("express");
const router = express.Router();

router.get("/movies", async (req, res) => {
  const { page } = req.query;
  try {
    const movies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjQ3OTg5N2Q3YjJmYzI0MzM2OTM2ZjY0ZmIyNjBiOSIsInN1YiI6IjY0ZWU5MzBhZTBjYTdmMDE0ZjY5NTIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UcOpUWk7D5k3OcmQ1GbUgdViKlNK5Ehm-AVieez7StM",
        },
      }
    );
    const data = await movies.json();
    res.status(200).json(data);
  } catch (error) {}
});

router.get("/markFavorite", async (req, res) => {
  const { movieId } = req.query;
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/account/20371636/favorite",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjQ3OTg5N2Q3YjJmYzI0MzM2OTM2ZjY0ZmIyNjBiOSIsInN1YiI6IjY0ZWU5MzBhZTBjYTdmMDE0ZjY5NTIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UcOpUWk7D5k3OcmQ1GbUgdViKlNK5Ehm-AVieez7StM",
        },
        body: JSON.stringify({
          media_type: "movie",
          id: 615656,
          favorite: true,
        }),
      }
    );
    const data1 = await data.json();
    res.status(200).json(data1);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
