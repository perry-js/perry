# Contributing

First of all, thank you for wanting to contribute back to the project.
Contributions are welcome into Perry.

Feel free to offer suggestions to make this onboarding easier as well.

## Project Structure

Perry is a monorepo managed by Lerna.

The root folder has Lerna as it's only dependency, and every package has it's own dependencies.

Make sure you have the following binaries installed:

 - `git`
 - `node`
 - `yarn`

## Getting started

Clone this repository:

```sh
git clone https://github.com/perry-js/perry.git
```

Enter the project repository and install dependencies using `yarn`.

```sh
cd ./perry
yarn
```

Bootstrap Lerna packages:

```sh
yarn bootstrap
```

Build all packages:

```sh
yarn build
```

Run unit tests for all packages:

```sh
yarn test
```

If everything is successful, we can proceed to prepare the playground.

The playground is the documentation and example page for perry.


Go to https://localhost:8080 and you'll see Perry's Test Page.

At this point you can change the src code and it Perry will get rebuilt on each code change.

The test page will reload as well when code changes.

### Watch Mode for All Packages

Use the following command from the root repository to run a watcher in parallel for all packages.

```sh
yarn build -- --parallel -- --build --watch
```

### Pull Requests

Pull requests go through unit tests and also have their own deployment in Netlify using Deploy Previews.

Just open it and you'll have your very own deployment of Perry's test page to play around.

We'll review it as soon as possible as well =)