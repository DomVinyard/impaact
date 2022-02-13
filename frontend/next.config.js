const withTM = require("next-transpile-modules")([
  "three",
  "react-three-fiber",
  "drei",
]);

module.exports = withTM({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
      },
    });
    config.module.rules.push({
      type: "javascript/auto",
      test: /\.mjs$/,
      include: /node_modules/,
    });

    return config;
  },
});
