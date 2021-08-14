# State Ref Hook

Do you have a token that changes but you need to know when it's unset?
Do some states need to update effects only some times?
Do you need something between useRef and useState?

Try useStateRef in React!

## Installation

`npm i react-state-ref`

## Methods

### useStateRef

Like `useState` but the setState function can take a swap boolean.

```js
const [ref, setState] = useStateRef('state1');

useEffect(() => {
	setTimeout(() => {
		setState('state2');
	}, 100);

	setTimeout(() => {
		setState('state3', true);
	}, 200);
}, []);

useEffect(() => {
	console.log(ref.current);
	// Outputs: 'state1', 'state3'
}, [ref])
```

## License

Copyright (c) 2021, Michael Szmadzinski. (MIT License)
