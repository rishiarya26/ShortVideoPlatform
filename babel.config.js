module.exports = function (api) {
  api.cache(true);

  const presets = ['next/babel'];

  const plugins = [
    'inline-dotenv',
    "@babel/plugin-proposal-logical-assignment-operators",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-optional-chaining",
    ['module-resolver', {
      root: ['./src']
    }]
  ];

  // no way for removing core js from next budle as of now - https://github.com/zeit/next.js/issues/8883

  const env = {
    test: {
      presets: [
        ['next/babel']
      ]
    },
    production: {
      presets: [
        ['next/babel', {
          'preset-env': {
            modules: false,
            useBuiltIns: 'entry',
            corejs: { version: 3, proposals: true },
            targets: {
              esmodules: true
            },
          }
        }]
      ]
    }
  };
  return {
    presets,
    plugins,
    env
  };
};
