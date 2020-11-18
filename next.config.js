const TypeScriptPluginCssModules = require("typescript-plugin-css-modules");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(TypeScriptPluginCssModules);

    // Important: return the modified config
    return config;
  },
};
