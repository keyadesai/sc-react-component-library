# generator-react-component-library [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generate ~~Isomorphic~~ Universal React Component Library

## Installation

First, install [Yeoman], and generator-react-component-library using [npm] (we assume you have pre-installed [node.js] (> 4.2.x required)).

```bash
$ npm install -g yo gulp generator-electrode
```

> Note: You may need add `sudo` to the command.

Then generate your new project:

```bash
$ mkdir your-project-name
$ cd your-project-name
$ yo react-component-library
```

## Running the app

Once the application is generated and `npm install` is completed, you are ready to try it out.

```bash
$ npm install
```

```bash
$ npm run storybook
```

Wait for webpack to be ready and navigate to `http://localhost:9010` with your browser.
You will see storybook UI with your components listed.


Some common tasks:

  - `npm run test` - run test
  - `npm run lint` - run linting
  - `npm run build` - build production `dist` files

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).


[npm-image]: https://badge.fury.io/js/generator-electrode.svg
[npm-url]: https://npmjs.org/package/generator-electrode
[Yeoman]: http://yeoman.io
[npm]: https://www.npmjs.com/
[node.js]: https://nodejs.org/