import React, { useState } from 'react';
import SubdomainTable from './components/SubdomainTable';
import './styles/App.css';

const App = () => {
  const [logado, setLogado] = useState(false);
  const [senha, setSenha] = useState('');

  const autenticar = async () => {
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      });

      const data = await res.json();
      if (res.ok) setLogado(true);
      else alert(data.error);
    } catch (err) {
      alert('Erro ao conectar com o servidor');
      console.error(err);
    }
  };

  return logado ? (
    <div className="App">
      <h1>Painel do Túnel Automático</h1>
      <SubdomainTable />
    </div>
  ) : (
    <div className="App">
      <h2>Login</h2>
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button onClick={autenticar}>Entrar</button>
    </div>
  );
};

export default App;
