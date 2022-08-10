import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    botaozinho: true,
    caractere: '',
    loading: false,
    mensagem: '',
    album: [],
  }

  musica = (event) => {
    this.setState({
      caractere: event.target.value,
    });

    if (event.target.value.length >= 2) {
      this.setState({
        botaozinho: false,
      });
    } else {
      this.setState({
        botaozinho: true,
      });
    }
  }

  pesquisa = async () => {
    const { caractere } = this.state;
    this.setState({
      loading: true,
    });
    const music = await searchAlbumsAPI(caractere);
    this.setState({
      loading: false,
      mensagem: `Resultado de álbuns de: ${caractere}`,
      album: music,
      caractere: '',
    });
    console.log(music);
  }

  render() {
    const { botaozinho, caractere, loading, mensagem, album } = this.state;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          value={ caractere }
          onChange={ this.musica }
        />
        <p>{mensagem}</p>

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ botaozinho }
          onClick={ this.pesquisa }
        >
          Pesquisar
        </button>

        <div>
          { album.length === 0 ? (
            <p>Nenhum álbum foi encontrado</p>
          ) : (
            album.map((music) => (
              <Link
                key={ music.collectionName }
                data-testid={ `link-to-album-${music.collectionId}` }
                to={ `/album/${music.collectionId}` }
              >
                <div>
                  <h3>{music.collectionName}</h3>
                  <img src={ music.artworkUrl100 } alt={ music.collectionName } />
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    );
  }
}
export default Search;
