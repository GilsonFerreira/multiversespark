import React, { useState } from 'react';
import { adicionarSubdominio, reiniciarTunel } from './api';

export default function ModalSubdominio() {
  const [host, setHost] = useState('');
  const [servico, setServico] = useState('');

  async function adicionar() {
    await adicionarSubdominio({ hostname: host, service: servico });
    await reiniciarTunel();
    alert('Subdomínio adicionado!');
    window.location.reload();
  }

  return (
    <div className="mt-4">
      <h4>Novo Subdomínio</h4>
      <input
        className="form-control"
        placeholder="Hostname"
        value={host}
        onChange={(e) => setHost(e.target.value)}
      />
      <input
        className="form-control mt-2"
        placeholder="Serviço"
        value={servico}
        onChange={(e) => setServico(e.target.value)}
      />
      <button className="btn btn-success mt-3" onClick={adicionar}>
        Adicionar
      </button>
    </div>
  );
}
