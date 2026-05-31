const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5500',
    video: true,
    setupNodeEvents(on, config) {},
  },
});
