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

export default {
  webpack(config, _env, _helpers, _options) {
    delete config.entry.polyfills;

    config.output.filename = "[name].js";
    config.output.publicPath = getPublicPath();
    config.output.library = "perry";
    config.output.libraryTarget = "umd";
    config.output.umdNamedDefine = true;
  }
};
