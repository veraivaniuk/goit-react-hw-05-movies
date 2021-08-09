import { useState, useEffect } from 'react';
import { Route, useParams, useHistory, useLocation  } from "react-router-dom";
import { Link, useRouteMatch } from "react-router-dom";
import { fetchMovieById } from '../../services/themoviedb-api';
import { Cast } from '../Cast/Cast';
import { Review } from '../Review/Review'
import s from "./MoviePage.module.css";
//import PropTypes from "prop-types";

const MoviePage = () => {
  const history = useHistory();
  const location = useLocation();

  const {url} = useRouteMatch();
  const [infoMovie, setInfoMovie] = useState({});
  const { movieId } = useParams();
  console.log({ history }, { location }, { url });
  
  const historySearch = new URLSearchParams(location.search).get('query');
  console.log(historySearch);

  useEffect(() => {
    fetchMovieById(movieId).then(res => setInfoMovie(res.data))
  }, [movieId]);

  // const onGoBack = () => {
  //   history.push(location?.state?.from ?? "/movies")
  // }

  // const handleGoBack = () => {
  //   const { state } = location;
  //   if (state) {
  //     history.push(location.state.from);
  //     return;
  //   }
  //   history.push({
  //     pathname: '/movies',
  //   });
  // };

  //console.log(infoMovie?.genres?.map((el)=>el.name));

  return (
    <div className="MoviePage">
      {/* <button type='button' onClick= {handleGoBack}>Go back</button> */}
      <img
        src={`https://image.tmdb.org/t/p/w500${infoMovie.poster_path}`}
        alt={infoMovie.original_title}
        className={s.poster}
      />
        <h3>{infoMovie.original_title}</h3>
        <p>User Score: {infoMovie.vote_average*10} %</p>
        <h3>Overview</h3><p>{infoMovie.overview}</p>
        <h3>Genres</h3><p>{infoMovie?.genres?.map((genre) => (<span key={genre.id}> {genre.name} </span>))}</p>     
      <div>
        <h4>Additional information</h4>
        <ul>
          <li key={1}><Link to={`${url}/cast`}>Cast</Link></li>
          <li key={2}><Link to={`${url}/reviews`}>Reviews</Link></li>
        </ul>
      </div>
          <Route path={`/movies/:movieId/cast`} >
            <Cast />
          </Route>

          <Route path={`/movies/:movieId/reviews`}>
            <Review />
          </Route>
    </div>
  );
};

// ImageGalleryItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   webformatURL: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
//   tags: PropTypes.array.isRequired,
//   onClick: PropTypes.func.isRequired,
// };

export default MoviePage;