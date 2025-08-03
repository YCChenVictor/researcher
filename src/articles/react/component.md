# Title

## Purpose

Components in React are used to modularize and organize the user interface into reusable, independent units of functionality.

* Reusability: Components allow you to break down your UI into reusable pieces, which can be used multiple times throughout your application.
* Abstraction and Encapsulation: Components encapsulate both the structure and behavior of a UI element, allowing you to abstract away the complexity and focus on building self-contained units of functionality.
* Composability: React components can be composed together to build complex UIs from simple building blocks. This composability enables you to create sophisticated user interfaces by combining smaller, more manageable components in a hierarchical manner.
* Separation of Concerns: React encourages a separation of concerns by promoting a clear separation between UI components and application logic. This separation makes your codebase easier to maintain and test, as it allows you to focus on specific aspects of your application independently.
* Performance Optimization: React's virtual DOM and reconciliation algorithm allow it to efficiently update the UI in response to changes in application state. By breaking your UI into smaller, granular components, React can minimize the number of DOM manipulations required, resulting in better performance.

## Concept

### Basic Structure

A really basic component: in `src`, create `components/counter.jsx` with

```javascript
import React from 'react';

const Counter = () => {
  return (
    <div>
      This is a Counter
    </div>
  );
};

export default Counter;
```

and import them

```jsx
import Counter from './components/counter.jsx'

<Counter />
```

### Render Process

React will always create virtual DOM first and then compare the actual DOM and do necessary change on the actual DOM.

* Initial Render
  * When you first load a React application, React creates a virtual DOM representation of your UI based on the component hierarchy you've defined in your code.
  * It traverses the component tree starting from the root component and generates corresponding virtual DOM nodes for each component.
  * Once the virtual DOM is constructed, React converts it into actual DOM elements and renders them to the browser.
* Updating the DOM
  * When the application state changes, either due to user interactions or other events, React re-renders the affected components.
  * React performs a process called reconciliation to determine which parts of the virtual DOM need to be updated.
  * It compares the new virtual DOM representation with the previous one and identifies the differences (referred to as "diffing").
  * Based on the differences, React computes the minimal set of DOM operations needed to update the actual DOM.
  * React then applies these changes to the real DOM, efficiently updating only the portions of the UI that have changed.
* Optimizations
  * React employs several optimizations to make the rendering process as efficient as possible.
  * It batches multiple updates together and performs them in a single pass to minimize DOM manipulations.
  * React also utilizes techniques like useMemo and useCallback to prevent unnecessary re-renders of components when their props or state haven't changed.
  * Additionally, React's virtual DOM allows it to perform optimizations such as key-based reconciliation and tree differencing to optimize the update process further.

### Conditional Rendering

In React, conditional rendering allows developers to show different parts of a component based on certain conditions.

```javascript
import React from 'react';

function MyComponent(props) {
  const isLoggedIn = props.isLoggedIn;
  
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please log in.</h1>
      )}
    </div>
  );
}

export default MyComponent;
```

In this example, we use the ternary operator (? :) to conditionally render different content inside the return statement based on the value of isLoggedIn. If isLoggedIn is true, the component will render a welcome message, and if it's false, the component will render a login prompt. The JSX syntax allows us to include JavaScript expressions inside curly braces {}, so we can evaluate the condition and render the appropriate content inline.

### Child Components

We can decompose big component into smaller one and import them to the parent component.

#### Decomposing

React supports decomposing big component to small components and we can use props to pass different variables to the small components to render the same framework with different data. For example, we can decompose the `Comment` with `AuthorInfo` and `CommentContent` as follow:

From

```javascript
import React from 'react';

const Comment = ({ author, content, timestamp }) => {
  return (
    <div className="comment">
      <h4>{author}</h4>
      <span>{timestamp}</span>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
```

To

```javascript
import React from 'react';
import AuthorInfo from './AuthorInfo';
import CommentContent from './CommentContent';

const Comment = ({ author, content, timestamp }) => {
  return (
    <div className="comment">
      <AuthorInfo author={author} timestamp={timestamp} />
      <CommentContent content={content} />
    </div>
  );
};

export default Comment;
```

Where

```javascript
import React from 'react';

const AuthorInfo = ({ author, timestamp }) => {
  return (
    <div className="author-info">
      <h4>{author}</h4>
      <span>{timestamp}</span>
    </div>
  );
};

export default AuthorInfo;
```

and

```javascript
import React from 'react';

const CommentContent = ({ content }) => {
  return (
    <div className="comment-content">
      <p>{content}</p>
    </div>
  );
};

export default CommentContent;
```

### insert components

React accept pass array of components into a component and render them; Take `sidebar` as example,

```jsx
function SidebarLayout() {
  const [menuItems, setMenuItems] = useState('testing')
  useEffect(() => {
    const queriedTitles = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const titles = queriedTitles.filter((item) => item.tagName !== 'H1').map(
      item => ({id: item.id, tag: item.tagName.match(/\d+/)[0], position: queriedTitles.indexOf(item)})
    )
    const menuItemsDesired = titles.map((title) => (<MenuItem>{title.id}</MenuItem>))
    setMenuItems(menuItemsDesired)
  }, []);
  return (
    <div style={{ display: 'flex', height: '100%' }} >
      <ProSidebarProvider>
        <BrowserRouter>
          <Sidebar>
            <Menu>
              {menuItems}
            </Menu>
          </Sidebar>
        </BrowserRouter>
      </ProSidebarProvider>
    </div>
  );
}
```

### Components interactions

This section will utilize react hooks, so please study hooks first.

#### Only one different level

Say if there is an operation in child component, then we want parent component to do actions accordingly.

* Parent: Pass the method to child component
  ```jsx
  // ParentComponent.js
  import React from 'react';
  import ChildComponent from './ChildComponent';
  
  const ParentComponent = () => {
    const handleDataFromChild = (data) => {
      console.log('Data received from child:', data);
      // Do whatever you want with the data received from the child
    };
  
    return (
      <div>
        <ChildComponent onEmitData={handleDataFromChild} />
      </div>
    );
  };
  
  export default ParentComponent;
  ```
* Child: Use the method passed from parent component
  ```jsx
  // ChildComponent.js
  import React from 'react';
  
  const ChildComponent = ({ onEmitData }) => {
    const handleEmit = () => {
      const dataToSend = 'Hello from child!';
      // Call the callback function with the data to emit it to the parent
      onEmitData(dataToSend);
    };
  
    return (
      <div>
        <button onClick={handleEmit}>Emit Data to Parent</button>
      </div>
    );
  };
  
  export default ChildComponent;
  ```

#### On the same level

Say we want the width of a component to listen to another component's width

```jsx
import React, { useEffect, useRef, useState } from 'react';

const ParentComponent = () => {
  const [componentAWidth, setComponentAWidth] = useState(0);

  const componentARef = useRef(null); // refer to the component A without trigger re-render

  useEffect(() => {
    // Get the width of ComponentA and call the updateComponentAWidth function
    if (componentARef.current) {
      const width = componentARef.current.clientWidth;
      setComponentAWidth(width);
    }
  }, []);

  const componentBStyle = {
    width: `${componentAWidth}px`, // Set the width of ComponentB based on ComponentA's width
    /* Add any other styles you desire */
  };

  return (
    <div>
      <div ref={componentARef}>
        {/* Your ComponentA content */}
      </div>
      <div style={componentBStyle}>
        {/* Your ComponentB content */}
      </div>
    </div>
  );
};

export default ParentComponent;
```

#### On far far away

Use React Context for managing global state or sharing data between components without having to pass props down manually through each level of the component tree.

```jsx
// Create a context
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

// Define a provider component
const MyProvider = ({ children }) => {
  const [data, setData] = useState('initial data');

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

// Use the context in child components
const ChildComponent = () => {
  const { data, setData } = useContext(MyContext);

  const handleClick = () => {
    setData('new data'); // you can set new data to the data variable with this method and all other components can access to this data
  };

  return (
    <div>
      <p>Data from context: {data}</p>
      <button onClick={handleClick}>Change Data</button>
    </div>
  );
};

// Wrap the components with the provider
const App = () => {
  return (
    <MyProvider>
      <ChildComponent />
    </MyProvider>
  );
};

export default App;
```

In this example, MyProvider wraps around the components that need access to the context, and MyContext.Provider provides the data to its children. useContext hook is used in ChildComponent to consume the context and access the data.

## Reference

GPT
