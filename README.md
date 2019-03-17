<div align="center">
  <a href="https://github.com/perry-js">
    <img alt="perry-js" src="https://github.com/perry-js/perry/blob/master/.github/assets/logo.png?raw=true" height="150px" />
  </a>
</div>

<br />

<div align="center">
  <strong>Perry is a spy. His job is to help you and your mates to fight against bugs.</strong>
  <br />
  <br />
  <a href="#alternative-installation-methods"><img src="https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg" alt="module formats: umd, cjs, esm"></a>
  <a href="https://www.codefactor.io/repository/github/perry-js/perry"><img src="https://www.codefactor.io/repository/github/perry-js/perry/badge" alt="CodeFactor"></a>
  <a href="https://bettercodehub.com/"><img src="https://bettercodehub.com/edge/badge/perry-js/perry?branch=master" alt="BCH Compliance"></a>
  <a href="https://codeclimate.com/github/perry-js/perry/maintainability"><img src="https://api.codeclimate.com/v1/badges/e8785692722559904376/maintainability" /></a>
  <a href="https://codeclimate.com/github/perry-js/perry/test_coverage"><img src="https://api.codeclimate.com/v1/badges/e8785692722559904376/test_coverage" /></a>
</div>

<br />
<br />

## Summary

- [Description](#description)
- [Getting Started](#getting-started)
  - [Using a CDN](#using-a-cdn)
  - [Using NPM](#using-npm)
- [API](#api)
- [Contributing](#contributing)
  - [Getting started](#getting-started-1)
  - [Pull Requests](#pull-requests)
- [Collaborators](#collaborators)
- [License](#license)

## Description

Perry.js is a Bug Reporter tool that you can just plug in your website whenever you want. It allows your colleagues to record sessions in your website and submit them to a Firebase instance so you can inspect them later and work in further automation.

Perry.js is still in active development and shall not be used in Production.

You can find some implementation examples in these repo's:

 - React _(using CDN)_: https://github.com/armand1m/perry-react-cdn-example
 - Vanilla _(using CDN)_: https://github.com/armand1m/perry-vanilla-parcel-example
 - Vue _(using CDN)_: https://github.com/armand1m/perry-vue-cdn-example

More examples are being built currently too.

You can track these implementations here: [#52](https://github.com/perry-js/perry/issues/52)

## Getting started

### Using a CDN

**Disclaimer:** We still didn't deployed Perry into a CDN.

Meanwhile, you can experiment using the current netlify build.

```html
<script src="https://perry-js.netlify.com/bundle.js"></script>
<script>
  /* This is an example plugin for handling perry's report */
  function ConsoleLogPlugin(reportInfo) {
    console.log("[Perry Report Info]:", reportInfo);
    console.log("[Perry Report Info]:", [
      "",
      "This was printed by the ConsoleLogPlugin.",
      "It is implemented inline into this test page.",
      "To know more about how to implement a Perry Plugin:",
      "Checkout this page src code or the github repository."
    ].join("\n"));

    alert([
      "[Perry Report Info]: Please check your console logs to see the recording report.",
      "Sorry for the alert as well, we'll get rid of it soon! <3"
    ].join("\n"));
  }

  /* Initialize Perry.js */
  const perry = new window.Perry({
    /* Enables log recording */
    log: true,
    /* Enables clichttps://netlify.comk recording */
    clicks: true,
    /* Enables screen recording */
    enableScreenRecording: true,
    /* Plugins are ways to handle the bug reporting submission */
    plugins: [ConsoleLogPlugin]
  });

  (async () => {
    /* Starts Perry Recorder */
    await perry.start();

    /* Stops Perry Recorder */
    await perry.stop();

    /* Submit's Perry Report */
    await perry.submit({
      title: 'test-report',
      description: 'A test report'
    });

    /* You can aso render Perry Widget for UI Control */
    await perry.render();
  })();
</script>
```
### Using NPM

**Disclaimer:** We still didn't deployed Perry into NPM properly.

This documentation is stated here as a demonstration of how it will look like.

#### Installation

`npm install --save perryjs`

#### Usage

```js
import Perry from 'perryjs';

/* This is an example plugin for handling perry's report */
function ConsoleLogPlugin(reportInfo) {
  console.log("[Perry Report Info]:", reportInfo);
  console.log("[Perry Report Info]:", [
    "",
    "This was printed by the ConsoleLogPlugin.",
    "It is implemented inline into this test page.",
    "To know more about how to implement a Perry Plugin:",
    "Checkout this page src code or the github repository."
  ].join("\n"));

  alert([
    "[Perry Report Info]: Please check your console logs to see the recording report.",
    "Sorry for the alert as well, we'll get rid of it soon! <3"
  ].join("\n"));
}

/* Initialize Perry.js */
const perry = new Perry({
  /* Enables log recording */
  log: true,
  /* Enables clichttps://netlify.comk recording */
  clicks: true,
  /* Enables screen recording */
  enableScreenRecording: true,
  /* Plugins are ways to handle the bug reporting submission */
  plugins: [ConsoleLogPlugin]
});

(async () => {
  /* Starts Perry Recorder */
  await perry.start();Use it

  /* Stops Perry Recorder */
  await perry.stop();

  /* Submit's Perry Report */
  await perry.submit({
    title: 'test-report',
    description: 'A test report'
  });

  /* You can aso render Perry Widget for UI Control */
  await perry.render();
})();
```

## API
<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Signature</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>constructor</code></td>
      <td><code>new Perry(options: PerryOptions): Perry</code></td>
      <td>Returns an instance of Perry.</td>
    </tr>
    <tr>
      <td><code>notify</code></td>
      <td><code>perry.notify(error: Error): Promise&lt;void&gt;</code></td>
      <td>A programatic API so you can let perry know of errors without it having to catch them. Useful when handling errors.</td>
    </tr>
    <tr>
      <td><code>render</code></td>
      <td><code>perry.render(): Promise&lt;void&gt;</code></td>
      <td>Fetches the Perry Widget component, appends a <code>#perry-widget</code> element into the document body and renders Perry Widget inside of it.</td>
    </tr>
    <tr>
      <td><code>start</code></td>
      <td><code>perry.start(): Promise&lt;void&gt;</code></td>
      <td>Tries to start the perry watcher. If something goes wrong, it will stop it and throw an error.</td>
    </tr>
    <tr>
      <td><code>stop</code></td>
      <td><code>perry.stop(): Promise&lt;void&gt;</code></td>
      <td>Stops the perry watcher.</td>
    </tr>
    <tr>
      <td><code>submit</code></td>
      <td><code>perry.submit(reportInfo: IPerryReportInfo): Promise&lt;IPerryReport&gt;</code></td>
      <td>Aggregates the whole reporting session into the structure defined in the <code>IPerryReport</code> interface, invokes all plugins giving it as an argument and then returns it. Resolves after executing all the plugins configured.</td>
    </tr>
  </tbody>
</table>      

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>log</code></td>
      <td>Enables <code>console.log()</code> calls to be monitored</td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>warn</code></td>
      <td>Enabled <code>console.warn()</code> calls to be monitored</td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>error</code></td>
      <td>Enabled <code>console.error()</code> calls to be monitored</td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>clicks</code></td>
      <td>Enables a listener on <code>document.onclick</code> with screen and viewport information</td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>cookies</code></td>
      <td>Returns the customer browser cookies in the final report</td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>localStorage (WIP)</code></td>
      <td>Returns <code>localStorage</code> data in the final report</td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>sessionStorage (WIP)</code></td>
      <td>Returns <code>sessionStorage</code> data in the final report</td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>clearOnReload</code></td>
      <td>Will clear the perry store everytime you reload it's instance</td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>clearOnStart</code></td>
      <td>Will clear the perry store everytime you start a bug reporting session</td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>ignoreScriptErrors</code></td>
      <td>Ignore's external script error messages.</td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>enableScreenRecording</code></td>
      <td>Enables Screen Recording through the MediaDevices and MediaRecorder API's.</td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>plugins</code></td>
      <td>Allows you to inject handlers for the reports generated by Perry. (e.g.: You can send data to your API using it).</td>
      <td><code>ReadonlyArray&lt;(reportInfo: PerryReportInfo) => void&gt;</code></td>
      <td><code>[]</code></td>
    </tr>
  </tbody>
</table>

## Contributing

Contributions are welcome into Perry.

### Getting started

First clone this repository using Git:

```sh
git clone https://github.com/perry-js/perry.git
```

Enter the project repository, download the dependencies and init the development server:

```sh
cd ./perry
npm ci
npm start
```

Go to https://localhost:8080 and you'll see Perry's Test Page.

At this point you can change the src code and it Perry will get rebuilt on each code change.

The test page will reload as well when code changes.

### Pull Requests

Pull requests go through unit tests and also have their own deployment in Netlify using Deploy Previews.

Just open it and you'll have your very own deployment of Perry's test page to play around.

We'll review it as soon as possible as well =)

## Collaborators

 - Armando Magalhaes (armando.mag95@gmail.com)
 - Guilherme Lima (guilhermelimak@gmail.com)
 - Vitor Margis (vitor@margis.com.br)
 - Jean Baudin (baudin.jean@gmail.com)

## License

Perry is licensed under MIT.