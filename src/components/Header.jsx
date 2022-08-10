import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    nome: '',
    loading: false,
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const { name } = await getUser();
    this.setState({
      loading: false,
    });
    console.log(name);
    this.setState({
      nome: name,
    });
  }

  render() {
    const { nome, loading } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    return (

      <header data-testid="header-component">
        <p data-testid="header-user-name">{nome}</p>
        <Link data-testid="link-to-search" to="/search">
          Pagina de pesquisa
        </Link>

        <Link data-testid="link-to-favorites" to="/favorites">
          Músicas favoritas
        </Link>

        <Link data-testid="link-to-profile" to="/profile">
          Perfil
        </Link>

      </header>

    );
  }
}

export default Header;
