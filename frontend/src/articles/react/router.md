### Routes

React Router:

Discuss React Router as a library for handling navigation in React applications.
Provide examples of how to set up routing, define routes, and handle navigation events in React Router.

React does not have default route settings built in; routing is typically handled by third-party libraries like React Router; for example, let's create a navbar with react router

* Create a component, `Navbar` in `components/navbar.jsx`
* Install library
  ```bash
  yarn add react-router-dom
  ```
* Wrap `App` with `BrowserRouter`
  ```tsx
  import { BrowserRouter } from 'react-router-dom'

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  )
  ```
* Use BrowserRouter, Routes, Route, and Link components to render different components based on the current URL path.
  ```jsx
  import { Routes, Route, Link } from "react-router-dom";
  
  function Navbar() {
    return (
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/twitter_api">Twitter Api</Link></li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/twitter_api" element={<TwitterApi />}/>
        </Routes>
      </div>
    )
  }
  
  export default Navbar
  ```
* If you want to use anchor tag
  ```jsx
  import { HashLink as Link } from 'react-router-hash-link';
  <Link to="/pathLink#yourAnchorTag">Your link text</Link>
  ```

#### redirect

* Vanilla javascript
  ```javascript
  window.location.href = 'path'
  ```
* Hook, `useNavigate`
  ```JSX
  import React from 'react';
  import { useNavigate } from 'react-router-dom';
  
  function LoginLayout() {
    const navigate = useNavigate();
  
    const routeChange = () => {
      let path = '/newPath'; // Correct path format with a leading '/'
      navigate(path);
    }
  
    return (
      <div className="app flex-row align-items-center">
        <Container>
          {/* ... */}
          <Button
            color="primary"
            className="px-4"
            onClick={routeChange}
          >
            Login
          </Button>
          {/* ... */}
        </Container>
      </div>
    );
  }
  ```