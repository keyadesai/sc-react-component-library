# <%= name %> Component

<%= description %>

## Development Setup

This component library design is based on Atomic Design Principles.

Visit that directory and install the NPM dependencies:

```
cd <dir>
npm install
```

## Developing Your Component

Your component lives under the src directory. Based on the level of component e.g Atom, Molecule or Organisms.

We can use Storybook to see what we are building:

```
npm run storybook
```

The above command starts the Storybook console on [http://localhost:9010](http://localhost:9010/).

> You can see changes you make while you are editing your component.

You can write your component in ES2015+ syntax. It supports `react` and `babel-stage2` presets.

## Testing

You can write your tests inside the `src/tests` directory. By default, the project comes with two test cases demonstrating how to write tests. Project configures your component with Mocha, [Enzyme](https://github.com/airbnb/enzyme), jsdom, and other essential JS testing tools.


You can run tests with the following commands:

* `npm run testonly` (run tests once)
* `npm run test-watch` (run tests and watch for changes)
* `npm test` (run tests and apply lint rules)

## Documenting Components

You will usually write your stories while you are developing your component. That allows you to use your storybook as a living document. You could show what your component looks like and different ways to use it in various stories.
These stories can be eventually publish wherever you want.

## Lint Rules

Project is configured with ESLint based on the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript) with some minor changes.

You can apply lint rules with the following commands:

* `npm run lint` (apply lint rules)
* `npm run lintfix` (apply lint rules and fix some common issues)


## CSS and Styles

It’s common to include CSS and Styles with your component. There are many ways to do this. Some prefer to write CSS in JS, while some provide a CSS file that lives inside the repo.

### CSS in JS

With this approach, you don’t need to configure anything. You can just use it. However, you can make your component accept some external styles if needed, which can allows the end user to change the look and feel of your component.

### Plain old CSS files

If you are following this approach, make sure to place your CSS files inside the root of your component and not inside the src directory. Then, your end users can import it like this:

```js
import 'my-comp/style.css'
```

You may also need to load this style sheet inside your stories. Simply import the above style sheet into src/stories/index.js with the following command:

```
import '../../style.css'
```


### Customize Storybook

Sometimes you may need to customize your React Storybook. If you do, you’ll usually customize the `.storybook/webpack.config.js` file. We don’t allow changes to that file directly in Library.
Instead, you can edit the `.storybook/user/modify_webpack_config.js` file.

### Add some pre-publish code

Library already uses the NPM `pre-publish` hook, so you won’t be able to use it directly. Instead, you can use `.scripts/user/prepublish.sh` to add your own code.

### Configure test utilities

We have included JSDOM(to support enzyme's [full DOM rendering](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md)) and Babel configurations before running Mocha tests. If you want to add more stuff, simply use the `.scripts/user/pretest.js` file.


### Publishing to NPM
* `npm version patch` (this will update the package patch version, for minor and major version replace patch with respoective value)
postversion task will push this version to git with assoicated git tag and pipeline will trigger the npm publish


###

