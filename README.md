<div align="center">
  <strong>Perry is a spy. His job is to help finding bugs in your application.</strong>
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
- [Options](#options)
- [Contributing](#contributing)
  - [Getting started](#getting-started-1)
  - [Pull Requests](#pull-requests)
- [Collaborators](#collaborators)
- [License](#license)

## Description

Perry.js is an Agnostic Bug Reporter tool that you can just plug in any website.

It allows you to record bug reports in web applications regardless of how they're built. It supports a programmatic API but also comes with a Preact Widget that can be loaded on the fly (thanks to Webpack Code Splitting).

You can learn more about it's capabilities at https://perry-js.netlify.com/

Perry.js is still in active development and can be experimented in internal environments.

We still do not recommend Perry for log transporting, but we do recommend giving it a try for QA bug reporting.

You can find some implementation examples in these repo's:

 - React _(using CDN)_: https://github.com/perry-js/perry-react-cdn-example
 - Vanilla _(using CDN)_: https://github.com/perry-js/perry-vanilla-parcel-example
 - Vue _(using CDN)_: https://github.com/perry-js/perry-vue-cdn-example

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
    /* Enables click recording */
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
  /* Enables click recording */
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

## Options

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

See the CONTRIBUTING.md file.

## Collaborators

 - [Armando Magalhaes](https://github.com/armand1m) (armando.mag95@gmail.com)
 - [Guilherme Lima](https://github.com/guilhermelimak) (guilhermelimak@gmail.com)
 - [Vitor Margis](https://github.com/vitormargis) (vitor@margis.com.br)
 - [Jean Baudin](https://github.com/jackTheRipper) (baudin.jean@gmail.com)
 - [Nayara Alves](https://github.com/diemoritat)
 - [Iago Angelim Cavalcante](https://github.com/iagocavalcante) (iagoangelimc@gmail.com)

## License

Perry is licensed under MIT.
