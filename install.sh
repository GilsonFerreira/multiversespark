#!/bin/bash
echo "[$(date)] ⏳ Instalando Multiversespark V2..." | tee install.log
cd backend && npm install | tee -a ../install.log
cd ../frontend && npm install && npm run build | tee -a ../install.log
cp backend/.env.example backend/.env
echo "[$(date)] ✅ Painel instalado com sucesso!" | tee -a install.log
