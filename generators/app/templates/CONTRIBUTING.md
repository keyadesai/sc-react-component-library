Coding Standards to Follow While Contributing
=========================

## Table of Contents

1. [Scope](#scope)
1. [Basic Rules](#basic-rules)
1. [Atomic Design](#atomic-design)
1. Organization
1. [Component Organization](#component-organization)
1. [Formatting Props](#formatting-props)
1. Patterns
1. [Computed Props](#computed-props)
1. [Compound State](#compound-state)
1. [prefer-ternary-to-sub-render](#prefer-ternary-to-sub-render)
1. [View Components](#view-components)
1. [Container Components](#container-components)
1. [Components Defination](#component-definition)
1. [Keep Your Components Small](#keep-your-components-small)
1. Anti-patterns
1. [Compound Conditions](#compound-conditions)
1. [Cached State in render](#cached-state-in-render)
1. [Existence Checking](#existence-checking)
1. [Setting State from Props](#setting-state-from-props)
1. Practices
1. [Naming](#naming)
1. [Declaration](#declaration)
1. [Naming Handle Methods](#naming-handler-methods)
1. [Naming Events](#naming-events)
1. [Using PropTypes](#using-proptypes)
1. [Using Entities](#using-entities)
1. [Styling](#styling)
1. Gotchas
1. [Tables](#tables)
1. Libraries
1. [Unit Testing](#unit-testing)
1. [Functional Testing](#functional-testing)
1. [Axios](#axios)

---

## Scope
This is how we write [React.js](https://facebook.github.io/react/) components in 
Suncorp React Components and OSP-UI projects.

All examples written in ES2015 syntax.

**[⬆ back to top](#table-of-contents)**

---

## Basic Rules

- Only include one React component per file.
- Always use JSX syntax.
- Do not use `React.createElement` unless you're initializing the app from a file that is not JSX.
- Use ES2015 syntax.
- We are using eslint for linting and using airbnb config that can be extended.

**[⬆ back to top](#table-of-contents)**

## Atomic Design
For this project, we’ll be following the principles of atomic design. What is Atomic design? – Atomic design is a methodology used to construct web design systems. – http://patternlab.io/about.html

**[⬆ back to top](#table-of-contents)**

---

## Component Organization

* class definition
* constructor
* event handlers
* 'component' lifecycle events
* getters
* render
* defaultProps
* proptypes

```javascript
class Person extends React.Component {
constructor (props) {
super(props);

this.state = { smiling: false };

this.handleClick = () => {
this.setState({smiling: !this.state.smiling});
};
}

componentWillMount () {
// add event listeners (Flux Store, WebSocket, document, etc.)
}

componentDidMount () {
// React.getDOMNode()
}

componentWillUnmount () {
// remove event listeners (Flux Store, WebSocket, document, etc.)
}

get smilingMessage () {
return (this.state.smiling) ? "is smiling" : "";
}

render () {
return (
<div onClick={this.handleClick}>
  {this.props.name} {this.smilingMessage}
</div>
);
}
}

Person.defaultProps = {
name: 'Guest'
};

Person.propTypes = {
name: React.PropTypes.string
};
```

**[⬆ back to top](#table-of-contents)**

## Formatting Props

Wrap props on newlines for exactly 2 or more.

```html
// bad
<Person
firstName="Michael" />

// good
<Person firstName="Michael" />
```

```html
// bad
<Person firstName="Michael" lastName="Chan" occupation="Designer" favoriteFood="Drunken Noodles" />

// good
<Person
firstName="Michael"
lastName="Chan"
occupation="Designer"
favoriteFood="Drunken Noodles" />
```

**[⬆ back to top](#table-of-contents)**

---

## Computed Props

Use getters to name computed properties.

```javascript
// bad
firstAndLastName () {
return `${this.props.firstName} ${this.props.lastname}`;
}

// good
get fullName () {
return `${this.props.firstName} ${this.props.lastname}`;
}
```

**[⬆ back to top](#table-of-contents)**

---

## Compound State

Prefix compound state getters with a verb for readability.

```javascript
// bad
happyAndKnowsIt () {
return this.state.happy && this.state.knowsIt;
}
```

```javascript
// good
get isHappyAndKnowsIt () {
return this.state.happy && this.state.knowsIt;
}
```

These methods *MUST* return a `boolean` value.

**[⬆ back to top](#table-of-contents)**

## Prefer Ternary to Sub-render

Keep login inside the `render`.

```javascript
// bad
renderSmilingStatement () {
return <strong>{(this.state.isSmiling) ? " is smiling." : ""}</strong>;
},

render () {
return <div>{this.props.name}{this.renderSmilingStatement()}</div>;
}
```

```javascript
// good
render () {
return (
<div>
  {this.props.name}
  {(this.state.smiling)
  ? <span>is smiling</span>
  : null
}
</div>
);
}
```

**[⬆ back to top](#table-of-contents)**

## View Components

Compose components into views. Don't create one-off components that merge layout
and domain components.

```javascript
// bad
class PeopleWrappedInBSRow extends React.Component {
render () {
return (
<div className="row">
  <People people={this.state.people} />
</div>
);
}
}
```

```javascript
// good
class BSRow extends React.Component {
render () {
return <div className="row">{this.props.children}</div>;
}
}

class SomeView extends React.Component {
render () {
return (
<BSRow>
  <People people={this.state.people} />
</BSRow>
);
}
}
```

**[⬆ back to top](#table-of-contents)**

## Container Components

> A container does data fetching and then renders its corresponding
> sub-component.

#### Bad

```javascript
// CommentList.js

class CommentList extends React.Component {
getInitialState () {
return { comments: [] };
}

componentDidMount () {
$.ajax({
url: "/my-comments.json",
dataType: 'json',
success: function(comments) {
this.setState({comments: comments});
}.bind(this)
});
}

render () {
return (
<ul>
  {this.state.comments.map(({body, author}) => {
  return <li>{body}—{author}</li>;
})}
</ul>
);
}
}
```

#### Good

```javascript
// CommentList.js

class CommentList extends React.Component {
render() {
return (
<ul>
  {this.props.comments.map(({body, author}) => {
  return <li>{body}—{author}</li>;
})}
</ul>
);
}
}
```

```javascript
// CommentListContainer.js

class CommentListContainer extends React.Component {
getInitialState () {
return { comments: [] }
}

componentDidMount () {
$.ajax({
url: "/my-comments.json",
dataType: 'json',
success: function(comments) {
this.setState({comments: comments});
}.bind(this)
});
}

render () {
return <CommentList comments={this.state.comments} />;
}
}
```

**[⬆ back to top](#table-of-contents)**


## Components Definition

We will use React.Component method to create component classes for container components that allows for better use with ES6 modules. 
We will use simplified component API method of using simple ES6 arrow syntax for View(Stateless) Components.


```javascript
// View Component

const Alerts = ({name = 'test') => (
<div>
  Alerts Atom
  <h3>Hi {name}</h3>
</div>
);

Alerts.propTypes = {
store: React.PropTypes.object.isRequired
};
```


```javascript
// Container Component

class CommentListContainer extends React.Component {
getInitialState () {
return { comments: [] }
}

componentDidMount () {
$.ajax({
url: "/my-comments.json",
dataType: 'json',
success: function(comments) {
this.setState({comments: comments});
}.bind(this)
});
}

render () {
return <CommentList comments={this.state.comments} />;
}
}
```
Read: ["Reusable Components"](https://facebook.github.io/react/docs/reusable-components.html)


**[⬆ back to top](#table-of-contents)**

## Keep you components small

Small classes/modules/whatever are easier to understand, test, and maintain, and the same is true of React components. Of course, the exact size will depend upon many different factors, but in general, make your components significantly smaller than you think they need to be.
Use the single responsibility principle as the basis for deciding what gets to be its own component. 

**[⬆ back to top](#table-of-contents)**
---

## Cached State in `render`

Do not keep state in `render`

```javascript
// bad
render () {
let name = `Mrs. ${this.props.name}`;

return <div>{name}</div>;
}

// good
render () {
return <div>{`Mrs. ${this.props.name}`}</div>;
}
```

```javascript
// best
get fancyName () {
return `Mrs. ${this.props.name}`;
}

render () {
return <div>{this.fancyName}</div>;
}
```

**[⬆ back to top](#table-of-contents)**

## Compound Conditions

Don't put compound conditions in `render`.

```javascript
// bad
render () {
return <div>{if (this.state.happy && this.state.knowsIt) { return "Clapping hands" }</div>;
}
```

```javascript
// better
get isTotesHappy() {
return this.state.happy && this.state.knowsIt;
},

render() {
return <div>{(this.isTotesHappy) && "Clapping hands"}</div>;
}
```

The best solution for this would use a [container
component](#container-components) to manage state and
pass new state down as props.

**[⬆ back to top](#table-of-contents)**

## Existence Checking

Do not check existence of `prop` objects. Use `defaultProps`.

```javascript
// bad
render () {
if (this.props.person) {
return <div>{this.props.person.firstName}</div>;
} else {
return null;
}
}
```

```javascript
// good
class MyComponent extends React.Component {
render() {
return <div>{this.props.person.firstName}</div>;
}
}

MyComponent.defaultProps = {
person: {
firstName: 'Guest'
}
};
```

This is only where objects or arrays are used. Use PropTypes.shape to clarify
the types of nested data expected by the component.

**[⬆ back to top](#table-of-contents)**

## Setting State from Props

Do not set state from props without obvious intent.

```javascript
// bad
getInitialState () {
return {
items: this.props.items
};
}
```

```javascript
// good
getInitialState () {
return {
items: this.props.initialItems
};
}
```

Read: ["Props in getInitialState Is an Anti-Pattern"](http://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html)

**[⬆ back to top](#table-of-contents)**

---

## Naming

- **Extensions**: Use `.js` extension for React components.
- **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.jsx`.
- **Reference Naming**: Use PascalCase for React components and camelCase for their instances.

```javascript
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

- **Component Naming**: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.js` as the filename and use the directory name as the component name:

```javascript
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
```
- **Higher-order Component Naming**: Use a composite of the higher-order component's name and the passed-in component's name as the `displayName` on the generated component. For example, the higher-order component `withFoo()`, when passed a component `Bar` should produce a component with a `displayName` of `withFoo(Bar)`.

> Why? A component's `displayName` may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.

```javascript
// bad
export default function withFoo(WrappedComponent) {
return function WithFoo(props) {
return <WrappedComponent {...props} foo />;
}
}

// good
export default function withFoo(WrappedComponent) {
function WithFoo(props) {
return <WrappedComponent {...props} foo />;
}

const wrappedComponentName = WrappedComponent.displayName
|| WrappedComponent.name
|| 'Component';

WithFoo.displayName = `withFoo(${wrappedComponentName})`;
return WithFoo;
}
```

- **Props Naming**: Avoid using DOM component prop names for different purposes.

> Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

```javascript
// bad
<MyComponent style="fancy" />

// good
<MyComponent variant="fancy" />
```


**[⬆ back to top](#table-of-contents)**


## Declaration

- Do not use `displayName` for naming components. Instead, name the component by reference.

```javascript
// bad
export default React.createClass({
displayName: 'ReservationCard',
// stuff goes here
});

// good
export default class ReservationCard extends React.Component {
}
```


**[⬆ back to top](#table-of-contents)**

## Naming Handler Methods

Name the handler methods after their triggering event.

```javascript
// bad
punchABadger () { /*...*/ },

render () {
return <div onClick={this.punchABadger} />;
}
```

```javascript
// good
handleClick () { /*...*/ },

render () {
return <div onClick={this.handleClick} />;
}
```

Handler names should:

- begin with `handle`
- end with the name of the event they handle (eg, `Click`, `Change`)
- be present-tense

If you need to disambiguate handlers, add additional information between
`handle` and the event name. For example, you can distinguish between `onChange`
handlers: `handleNameChange` and `handleAgeChange`. When you do this, ask
yourself if you should be creating a new component.

**[⬆ back to top](#table-of-contents)**

## Naming Events

Use custom event names for ownee events.

```javascript
class Owner extends React.Component {
handleDelete () {
// handle Ownee's onDelete event
}

render () {
return <Ownee onDelete={this.handleDelete} />;
}
}

class Ownee extends React.Component {
render () {
return <div onChange={this.props.onDelete} />;
}
}

Ownee.propTypes = {
onDelete: React.PropTypes.func.isRequired
};
```

**[⬆ back to top](#table-of-contents)**

## Using PropTypes

Use PropTypes to communicate expectations and log meaningful warnings.

```javascript
MyValidatedComponent.propTypes = {
name: React.PropTypes.string
};
```
`MyValidatedComponent` will log a warning if it receives `name` of a type other than `string`.


```html
<Person name=1337 />
// Warning: Invalid prop `name` of type `number` supplied to `MyValidatedComponent`, expected `string`.
```

Components may also require `props`.

```javascript
MyValidatedComponent.propTypes = {
name: React.PropTypes.string.isRequired
}
```

This component will now validate the presence of name.

```html
<Person />
// Warning: Required prop `name` was not specified in `Person`
```

Read: [Prop Validation](http://facebook.github.io/react/docs/reusable-components.html#prop-validation)

**[⬆ back to top](#table-of-contents)**

## Using Entities

Use React's `String.fromCharCode()` for special characters.

```javascript
// bad
<div>PiCO · Mascot</div>

// nope
<div>PiCO &middot; Mascot</div>

// good
<div>{'PiCO ' + String.fromCharCode(183) + ' Mascot'}</div>

// better
<div>{`PiCO ${String.fromCharCode(183)} Mascot`}</div>
```

Read: [JSX Gotchas](http://facebook.github.io/react/docs/jsx-gotchas.html#html-entities)

**[⬆ back to top](#table-of-contents)**

## Styling

We are Eliminating CSS in favor of inline styles that are computed on the fly for individual components.
And for the things that inline styling dosn't cover like, media queries, browser states (:hover, :focus, :active) and modifiers (no more .btn-primary!), we are using radium to provide that.

Read: [Radium](https://github.com/FormidableLabs/radium)

**[⬆ back to top](#table-of-contents)**

## Tables

The browser thinks you're dumb. But React doesn't. Always use `tbody` in
`table` components.

```javascript
// bad
render () {
return (
<table>
  <tr>...</tr>
</table>
);
}

// good
render () {
return (
<table>
  <tbody>
    <tr>...</tr>
  </tbody>
</table>
);
}
```

The browser is going to insert `tbody` if you forget. React will continue to
insert new `tr`s into the `table` and confuse the heck out of you. Always use
`tbody`.

**[⬆ back to top](#table-of-contents)**

---
## Unit Testing

We are using Mocha for unit testing. Chai for assertions and Enzyme for shallow rendering.

**[⬆ back to top](#table-of-contents)**


## Functional Testing

We are using Nighwatch for creating and running functional test.

**[⬆ back to top](#table-of-contents)**

## Axios

We are using axios for wrapping all our HTTP requests.

**[⬆ back to top](#table-of-contents)**


