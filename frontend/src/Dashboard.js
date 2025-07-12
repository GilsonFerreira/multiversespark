import React from 'react';
import TableSubdominios from './TableSubdominios';
import ModalSubdominio from './ModalSubdominio';

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Subdomínios</h2>
      <TableSubdominios />
      <ModalSubdominio />
    </div>
  );
}
