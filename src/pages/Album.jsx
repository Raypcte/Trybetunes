import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
state = {
  sons: [],
}

async componentDidMount() {
  const { match } = this.props;
  const { params } = match;
  const { id } = params;
  const musica = await getMusics(id);
  this.setState({
    sons: musica,
  });

  console.log(musica);
}

render() {
  const { sons } = this.state;

  if (sons.length) {
    return (
      <div data-testid="page-album">

        <Header />
        <p data-testid="artist-name">{sons[0].artistName}</p>
        <p data-testid="album-name">{sons[0].collectionName}</p>

        {
          sons.filter((som) => som.kind === 'song')
            .map((som) => (
              <MusicCard
                key={ som.trackName }
                trackName={ som.trackName }
                previewUrl={ som.previewUrl }
                trackId={ som.trackId }
                som={ som }
              />
            ))
        }
      </div>

    );
  }

  return <Loading />;
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

};

export default Album;
