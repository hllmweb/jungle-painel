import { useState, useContext } from 'react';

import { AuthContext } from '../../contexts/auth'
import './signin.css';

function SignIn() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);


    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(login !== '' && password !== ''){
        signIn(login, password);
      }

    }

    return (
      <div className="container-center">
        <div className="login">
          <div className="logo-area"></div>
          
          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}/>
            <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
          </form>


        </div>
      </div>
    );
  }
  
  export default SignIn;