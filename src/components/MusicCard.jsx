import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
state ={
  loading: false,
  isChecked: false,
}

  favoritaMusica = async (event) => {
    const { som } = this.props;
    this.setState((anterior) => ({
      isChecked: !anterior.isChecked,
    }));
    console.log(event.target.checked);
    this.setState({
      loading: true,
    });
    await addSong(som);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isChecked } = this.state;
    if (loading === true) {
      return <Loading />;
    }
    return (

      <div>
        <label htmlFor="favorito">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="favorto"
            onChange={ this.favoritaMusica }
            checked={ isChecked }
          />
        </label>

        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>

    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  som: PropTypes.shape({}).isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
