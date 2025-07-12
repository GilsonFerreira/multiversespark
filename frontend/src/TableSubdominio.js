import React, { useEffect, useState } from 'react';
import { buscarSubdominios, reiniciarTunel } from './api';

export default function TableSubdominios() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    buscarSubdominios().then(setDados);
  }, []);

  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>Hostname</th>
          <th>Serviço</th>
        </tr>
      </thead>
      <tbody>
        {dados?.ingress?.map((item, i) => (
          <tr key={i}>
            <td>{item.hostname}</td>
            <td>{item.service}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
