import React from 'react';
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
      </header>

    );
  }
}

export default Header;
