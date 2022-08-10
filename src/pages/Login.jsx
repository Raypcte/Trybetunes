import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    desabilitaBotao: true,
    caracteres: '',
    loading: false,
  }

  saveName = (event) => {
    this.setState({
      caracteres: event.target.value,
    }, () => {
      const { caracteres } = this.state;
      const tres = 3;
      if (caracteres.length >= tres) {
        this.setState({
          desabilitaBotao: false,
        });
      } else {
        this.setState({
          desabilitaBotao: true,
        });
      }
    });
  };

  cliqueBotao = async () => {
    const { caracteres } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    });
    await createUser({ name: caracteres });
    this.setState({
      loading: false,
    });
    history.push('/search');
  }

  render() {
    const { desabilitaBotao, caracteres, loading } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          onChange={ this.saveName }
          value={ caracteres }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          name="digiteSeuNome"
          disabled={ desabilitaBotao }
          onClick={ this.cliqueBotao }

        >
          Entrar
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

};

export default Login;
