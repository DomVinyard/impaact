const withTM = require("next-transpile-modules")([
  "three",
  "react-three-fiber",
  "drei",
  "next-mui-helper",
  // "@mui/material/TextField",
  // "@mui/material/Autocomplete",
]);

module.exports = withTM({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
      },
    });

    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   "@mui/styled-engine": "@mui/styled-engine-sc",
    // };

    return config;
  },
});
