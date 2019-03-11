import path from 'path';

export default (config, env, helpers) => {
  config.module.loaders.push({
    enforce: 'pre',
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader'
  })

  delete config.entry.polyfills;
  config.output.filename = "[name].js";

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;

  if (env.production) {
    config.output.library = "perry";
    config.output.libraryTarget = "umd";
    config.output.umdNamedDefine = true;
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    'preact-cli-entrypoint': path.resolve(process.cwd(), 'src', 'index'),
    '@': path.resolve(__dirname, 'src/')
  };
};
