const getPublicPath = () => {
  const ROOT_SLASH = "/";
  const url = 
    process.env.PUBLIC_PATH
    || process.env.DEPLOY_PRIME_URL
    || process.env.URL;
  
  if (url)  {
    return url + ROOT_SLASH;
  }

  return ROOT_SLASH;
};

export default (config, env, helpers) => {
  delete config.entry.polyfills;
  config.output.filename = "[name].js";

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;

  config.output.publicPath = getPublicPath();

  config.output.library = "perry";
  config.output.libraryTarget = "umd";
  config.output.umdNamedDefine = true;
};
