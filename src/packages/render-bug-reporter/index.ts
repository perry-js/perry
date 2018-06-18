import habitat from "preact-habitat";
import HelloWorld from "../../components/hello-world/index";

const renderBugReporter = options => {
  const { render } = habitat(HelloWorld);

  render({
    selector: 'body',
    defaultProps: options,
    clean: false,
  });
};

export default renderBugReporter;