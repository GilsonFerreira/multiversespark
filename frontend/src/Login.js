import React, { useState } from 'react';
import Dashboard from './Dashboard';

export default function Login() {
  const [logado, setLogado] = useState(false);
  const [senha, setSenha] = useState('');

  function autenticar() {
    if (senha === 'multiverse') setLogado(true);
    else alert('Senha incorreta');
  }

  return logado ? (
    <Dashboard />
  ) : (
    <div className="container mt-5">
      <h2>Login Painel</h2>
      <input
        type="password"
        className="form-control"
        placeholder="Digite a senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={autenticar}>
        Entrar
      </button>
    </div>
  );
}
