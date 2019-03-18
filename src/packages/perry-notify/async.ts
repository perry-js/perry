const fetchNotify = async () => {
  const { default: notify } =
    await import(/* webpackChunkName: "perry-notify" */ "@/packages/perry-notify");

  return notify;
};

export default fetchNotify;
