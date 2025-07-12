import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export async function buscarSubdominios() {
  const res = await axios.get(`${API}/subdominios`);
  return res.data;
}

export async function adicionarSubdominio(data) {
  await axios.post(`${API}/subdominios`, data);
}

export async function reiniciarTunel() {
  await axios.post(`${API}/reiniciar`);
}
