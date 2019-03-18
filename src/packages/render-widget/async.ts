const fetchRenderWidget = async () => {
  const { default: renderWidget } =
    await import(/* webpackChunkName: "perry-render-widget" */ "@/packages/render-widget");

  return renderWidget;
};

export default fetchRenderWidget;
