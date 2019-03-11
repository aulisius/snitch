# Snitch

_I open and close_

- [Snitch](#snitch)
  - [The Problem](#the-problem)
  - [Installation](#installation)
  - [Basic code snippet](#basic-code-snippet)
  - [Examples](#examples)
  - [License](#license)
  - [TODO](#todo)
  - [Contributing](#contributing)

Redux `connect`ed React component to toggle visibility of your views.

## The Problem

You have a view or a modal. You need to control its visibility. You maintain a value, lets say `showModal` either in your component state or in your redux store. It's cool. It works as intended.

After awhile, requirements come in. You now have more modals. Lots of them. `showModal` isn't going to cut it. In comes this library, taking care of that problem. `Snitch` listens to `redux` actions and maintains the `showModal` state internally and lets you focus on rendering the necessary views.

## Installation

```bash
npm install prop-types react react-dom react-redux redux @faizaanceg/snitch --save
```

## Basic code snippet

```js
<Snitch
  opensOn={actionTypes.AUTH_SUCCESS}
  closesOn={actionTypes.AUTH_FAILURE}
  render={({ show }) => (show ? <Dashboard /> : <AccessDenied />)}
/>
```

## Examples

You can check out the `examples` directory to see how you can use this library. Below is a list of similar examples but available interactively in `CodeSandbox`.

- [Basic Example](https://codesandbox.io/s/4w374z5wmw)
- [Example with react-bootstrap](https://codesandbox.io/s/qvxxyny3jw)

## License

MIT

## TODO

- [ ] Add complete documentation
- [ ] Add Typescript and Flow definitions
- [ ] Add more non-trivial examples
- [ ] Write tests (and achieve optimum coverage)

## Contributing

PRs are welcome!
