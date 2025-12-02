import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL || 'http://192.168.0.93:4000/graphql',
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

  // Enviar request con fetch
  const response = await fetch(client.link.options.uri || process.env.REACT_APP_GRAPHQL_URL || 'http://192.168.0.93:4000/graphql', {
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
