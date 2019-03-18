const fetchScreenRecorder = async () => {
  const { default: ScreenRecorder } =
    await import(/* webpackChunkName: "perry-screen-recorder" */ "@/packages/screen-recorder");

  return ScreenRecorder;
};

export default fetchScreenRecorder;
