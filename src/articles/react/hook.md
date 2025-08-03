# Title

## Purpose

React employs hooks for state and lifecycle management in functional components, enabling developers to reuse logic and enhance maintainability. Commonly used hooks, such as useState and useEffect, facilitate efficient state handling and lifecycle events.

## Concept

* useState: Allows functional components to manage state
  * Example
    ```jsx
    import React, { useState } from 'react';

    const YourComponent = () => {
      const [components, setComponents] = useState([]);
    
      // Function to add a new component to the array
      const addComponent = (newComponent) => {
        setComponents((prevComponents) => [...prevComponents, newComponent]);
      };
    
      // Example of using the addComponent function
      const handleAddComponent = () => {
        const newComponent = // Your new component or value here;
        addComponent(newComponent);
      };
    
      return (
        <div>
          {/* Render your existing components here */}
          
          {/* Button to add a new component */}
          <button onClick={handleAddComponent}>Add Component</button>
        </div>
      );
    };
    
    export default YourComponent;
    ```
* useEffect: Enables performing side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
  * Example
    ```javascript
    import React, { useState, useEffect } from 'react';
    
    function MyComponent() {
      const [data, setData] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
    
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.example.com/data');
          const responseData = await response.json();
          setData(responseData);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        // Call the fetchData function when the component mounts
        fetchData();
    
        // Clean-up function to cancel any pending requests or subscriptions
        return () => {
          // Any clean-up code goes here
        };
      }, []); // Empty dependency array ensures the effect runs only once when the component mounts and not re-run on subsequent renders.
    
      return (
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h1>Data from API:</h1>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </div>
      );
    }
    
    export default MyComponent;
    ```
  * The array is not empty: On subsequent renders, React compares each value in the dependencies array to its value from the previous render. If any of the values in the dependencies array have changed since the last render, React considers the effect to be "dirty" and re-runs the effect's callback function.
    ```jsx
    import React, { useState, useEffect } from 'react';

    function MyComponent() {
      const [count, setCount] = useState(0);
    
      useEffect(() => {
        // This effect will re-run whenever `count` changes
        console.log('Effect ran!');
    
        // Clean-up function
        return () => {
          console.log('Clean-up function ran!');
        };
      }, [count]); // Dependency array contains `count`. Whenever the count state variable changes (e.g., when the user clicks the "Increment" button), the effect will re-run.
    
      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }
    
    export default MyComponent;
    ```
* useContext: Provides a way to pass data through the component tree without having to pass props down manually at every level.
  * Example
    ```jsx
    import React, { createContext, useContext } from 'react';
    
    // Step 1: Create a context object
    const ThemeContext = createContext();
    
    // Step 2: Provide a value for the context
    function App() {
      const theme = 'light';
    
      return (
        <ThemeContext.Provider value={theme}>
          <MyComponent />
        </ThemeContext.Provider>
      );
    }
    
    // Step 3: Consume the context value
    function MyComponent() {
      const theme = useContext(ThemeContext);
    
      return <p>Current theme: {theme}</p>;
    }
    
    export default App;
    ```
* useReducer: An alternative to useState, often used for more complex state logic.
  * Example
    ```jsx
    import React, { useReducer } from 'react';
    
    // Step 1: Define a reducer function
    const initialState = { count: 0 };
    
    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return { count: state.count + 1 };
        case 'decrement':
          return { count: state.count - 1 };
        case 'reset':
          return initialState;
        default:
          throw new Error('Invalid action type');
      }
    }
    
    // Step 2: Use the useReducer hook to manage state
    function Counter() {
      // Call useReducer with the reducer function and initial state
      const [state, dispatch] = useReducer(reducer, initialState);
    
      return (
        <div>
          <p>Count: {state.count}</p>
          <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
          <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
          <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
      );
    }
    
    export default Counter;
    ```
* useCallback: Memoizes functions to **prevent unnecessary re-renders in child components**.
  * Example
    ```jsx
    import React, { useState, useCallback } from 'react';

    function ParentComponent() {
      const [count, setCount] = useState(0);
    
      // Define a callback function using useCallback
      const handleClick = useCallback(() => {
        setCount(count + 1);
      }, [count]); // Dependency array contains 'count'
    
      return (
        <div>
          <p>Count: {count}</p>
          {/* Pass the callback function to a child component */}
          <ChildComponent onClick={handleClick} />
        </div>
      );
    }
    
    // ChildComponent receives the callback function as a prop
    function ChildComponent({ onClick }) {
      return (
        <button onClick={onClick}>
          Click me to increment count
        </button>
      );
    }
    
    export default ParentComponent;
        ```
* useMemo: Memoizes the result of a function to avoid re-computation on every render.
* useRef: Provides a way to access a mutable reference to a DOM element or a value that persists across renders without causing a re-render.
* useLayoutEffect: Similar to useEffect, but fires synchronously after all DOM mutations. It's typically used for DOM measurements or operations that need to occur before the browser paints.
* useImperativeHandle: Customizes the instance value that is exposed when using ref with forwardRef.
* useDebugValue: Adds debug information to custom hooks that can be inspected using React DevTools.

### Ajax

combined with `useEffect` and `useState`

```JSX
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div>
      {data ? (
        <p>Data loaded: {data}</p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default MyComponent;
```

## Example

Let's use clock as example,

```jsx
import React, { useState, useEffect, useContext } from 'react';

// Create a context for managing the theme
const ThemeContext = React.createContext();

function Clock() {
  const [date, setDate] = useState(new Date()); // the states of the date and setDate method defined by useState
  const theme = useContext(ThemeContext); // add theme component through ThemeContext
  const inputRef = useRef(null); // useRef to hold a reference to the input element

  useEffect(() => { // when render Clock, call this method
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Focus on the input element when the component mounts (with useRef, it can find this component)
    inputRef.current.focus();

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div style={{ color: theme.textColor, background: theme.backgroundColor }}>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
      <input ref={inputRef} type="text" placeholder="Type something..." />
    </div>
  );
}

export default Clock;
```

### Wait until Data Prepared

* purpose: Explain the purpose of waiting for data and how conditional rendering ensures a seamless user experience.
* concept

We can use conditional rendering to wait until data fetched

```javascript
const Article = () => {
  ...
  const [markdownContent, setMarkdownContent] = useState('');
  const [rawTitles, setRawTitles] = useState([]);

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then(text => {
        const parsedHTML = marked.parse(text)
        const container = document.createElement('div')
        container.innerHTML = parsedHTML
        const tags = Array.from(container.querySelectorAll('h2, h3, h4, h5, h6')).map((tag) => tag.textContent)
        setRawTitles(tags)
        setMarkdownContent(text)
      })
  }, []);

  return (
    <div className='bg-gray-400 px-2 py-2 lg:px-8 lg:py-4 xl:px-72 xl:py-6 2xl:px-96 2xl:py-8'>
      {rawTitles.length > 0 ? (
        <div>
          <SidebarLayout rawTitles={rawTitles} />
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
```


useState: Allows functional components to manage local state.
useEffect: Performs side effects in functional components (e.g., data fetching, subscriptions, or manually changing the DOM).
useContext: Provides access to the context object created by the React.createContext function.
useReducer: Alternative to useState. Used for more complex state logic that involves multiple sub-values or when the next state depends on the previous one.
useCallback: Memoizes functions, preventing unnecessary re-renders in child components.
useMemo: Memoizes values, preventing expensive calculations on every render.
useRef: Returns a mutable ref object whose .current property is initialized to the passed argument (useful for accessing the DOM or persisting values between renders without causing re-renders).
useImperativeHandle: Customizes the instance value that is exposed when using ref on a functional component.
useLayoutEffect: Similar to useEffect, but fires synchronously after all DOM mutations (good for measuring DOM nodes or performing animations).
useDebugValue: Provides a custom label for custom hooks in React DevTools.

## Reference

[10 React Hooks Explained // Plus Build your own from Scratch](https://www.youtube.com/watch?v=TNhaISOUy6Q)

[useRoute](https://blog.logrocket.com/how-react-hooks-can-replace-react-router/)

[life cycle methods in React Hooks?](https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks)

[Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)

[how to share state across react components with context](https://www.digitalocean.com/community/tutorials/how-to-share-state-across-react-components-with-context)

[What is the equivalent of document.querySelector in React](https://bobbyhadz.com/blog/react-document-queryselector)
