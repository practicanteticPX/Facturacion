#!/bin/bash

echo "🧪 Probando endpoint GraphQL del backend..."
echo ""

# Test 1: Próximo número de control
echo "1️⃣ Query: proximoNumeroControl"
curl -X POST http://192.168.0.30:4001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ proximoNumeroControl }"}' 2>/dev/null | jq
echo ""

# Test 2: Compañías
echo "2️⃣ Query: companias"
curl -X POST http://192.168.0.30:4001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ companias }"}' 2>/dev/null | jq
echo ""

echo "✅ Pruebas completadas"
