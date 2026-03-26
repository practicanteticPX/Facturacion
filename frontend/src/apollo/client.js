import { ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * Construye la URL del backend GraphQL de forma dinámica
 * Prioridad:
 * 1. Variable de entorno REACT_APP_GRAPHQL_URL (si está definida)
 * 2. Detectar automáticamente desde window.location
 *
 * IMPORTANTE: Por defecto usa HTTP para el backend, incluso si el frontend está en HTTPS
 * Para usar HTTPS en el backend, define REACT_APP_GRAPHQL_URL con https://
 */
const getGraphQLUrl = () => {
  // Si hay variable de entorno, usarla
  if (process.env.REACT_APP_GRAPHQL_URL) {
    return process.env.REACT_APP_GRAPHQL_URL;
  }

  // Detectar automáticamente basado en la URL actual del navegador
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname; // dominio o IP
    const backendPort = '4001'; // Puerto del backend

    // SIEMPRE usar HTTP para el backend (a menos que esté configurado con variable de entorno)
    // Esto evita errores de mixed content cuando el frontend está en HTTPS
    const protocol = 'http:';

    return `${protocol}//${hostname}:${backendPort}/graphql`;
  }

  // Fallback por defecto (solo si no hay window, por ejemplo en SSR)
  return 'http://localhost:4001/graphql';
};

const GRAPHQL_URL = getGraphQLUrl();

console.log('🔗 Apollo Client conectándose a:', GRAPHQL_URL);

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

/**
 * Helper para ejecutar mutaciones GraphQL con archivos adjuntos
 * Usa multipart/form-data en lugar de JSON para enviar archivos
 */
export const executeMutationWithFile = async (mutation, variables) => {
  const operations = {
    query: mutation.loc.source.body,
    variables: variables
  };

  const map = {};
  const files = [];

  // Extraer archivos de las variables
  Object.keys(variables).forEach((key) => {
    if (variables[key] instanceof File) {
      const fileIndex = files.length;
      files.push(variables[key]);
      map[fileIndex] = [`variables.${key}`];
      variables[key] = null; // Reemplazar con null en operations
    }
  });

  // Si no hay archivos, usar cliente normal
  if (files.length === 0) {
    return client.mutate({
      mutation,
      variables
    });
  }

  // Crear FormData para multipart/form-data
  const formData = new FormData();
  formData.append('operations', JSON.stringify(operations));
  formData.append('map', JSON.stringify(map));

  files.forEach((file, index) => {
    formData.append(index, file);
  });

  // Enviar request con fetch usando la misma URL dinámica
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'apollo-require-preflight': 'true',
    },
    body: formData,
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  // Actualizar cache de Apollo
  client.cache.reset();

  return { data: result.data };
};

export default client;
