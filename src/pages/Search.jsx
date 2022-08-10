import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    botaozinho: true,
    caractere: '',
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

  render() {
    const { botaozinho, caractere } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          value={ caractere }
          onChange={ this.musica }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ botaozinho }
        >
          Pesquisar
        </button>

      </div>
    );
  }
}
export default Search;
