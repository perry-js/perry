const fetchSetupListeners = async () => {
  const { default: setupListeners } =
    await import(/* webpackChunkName: "perry-setup-listeners" */ "@/packages/setup-listeners");

  return setupListeners;
};

export default fetchSetupListeners;
