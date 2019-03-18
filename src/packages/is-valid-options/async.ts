const fetchIsValidOptions = async () => {
  const { default: isValidOptions } =
    await import(/* webpackChunkName: "perry-is-valid-options" */ "@/packages/is-valid-options");

  return isValidOptions;
};

export default fetchIsValidOptions;
