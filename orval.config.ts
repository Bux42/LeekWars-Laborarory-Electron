module.exports = (async () => {
  const { defineConfig } = await import('orval');

  return defineConfig({
    api: {
      input: 'http://localhost:7000/openapi',
      output: {
        target: 'src/services',
        client: 'react-query',
        mode: 'tags-split',
        httpClient: 'axios',
        prettier: true,
        override: {
          mutator: {
            path: 'src/services/lib/api-client.ts',
            name: 'apiClient',
          },
        },
      },
    },
  });
})();
