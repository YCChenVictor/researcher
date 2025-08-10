# Title

My own style of react setups.

## Init

* Create react app with following command

  ```bash
  npx create-react-app@latest your-project-name
  cd your-project-name
  yarn start
  ```

* Add typescript
  * Install TypeScript dependencies

    ```bash
    yarn add --dev typescript
    ```

  * Init typescript
  
    ```bash
    npx tsc --init
    ```

  * Update tsconfig.json
  
    ```json
    {
      "compilerOptions": {
        "target": "esnext",
        "lib": ["esnext", "dom"],
        "module": "esnext",
        "moduleResolution": "node",
        "outDir": "dist",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "strict": true,
        "jsx": "react",
      },
      "include": ["src"],
      "exclude": ["node_modules", "tests", "dist"]
    }
    ```

* Add linter

  ```bash
  yarn add --dev eslint @eslint/js @types/eslint__js typescript typescript-eslint
  ```

* Init linter (follow what you like, you can add the rules in the future)

  ```bash
  npx eslint --init
  ```

* `eslint.config.js`

  ```JS
  // @ts-check

  import eslint from '@eslint/js';
  import tseslint from 'typescript-eslint';
  import globals from "globals";
  
  export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project: true,
        },
        globals: {
          ...globals.node,
        }
      },
    },
     {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
      ...tseslint.configs.disableTypeChecked,
    },
  )
  ```

* Add command in `package.json`

  ```JSON
  "eslint": "eslint",
  "eslint:fix": "eslint --fix",
  ```

* Remove all the files in `/src` and add `index.ts` in it with following code:
  
  ```javascript
  import React from 'react';
  import { createRoot } from 'react-dom/client'
  
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error("No element with id 'root' found");
  }

  const element = <h1>Hello World</h1>;
  createRoot(rootElement).render(
    element
  )
  ```

* Environment: Use `process.env` to get environment variable; for example,

  ```javascript
  import React from 'react';
  
  function App() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;
  
    // Use the environment variables in your component logic
    // ...
  
    return (
      <div>
        {/* Render your component */}
      </div>
    );
  }
  
  export default App;
  ```

## Tests

Use Jest

* `package.json`

  ```JSON
  "scripts": {
    "test": "jest"
  }
  ```

* `babel.config.js`

  ```js
  module.exports = {
    presets: ['@babel/preset-react'],
  };
  ```

* config (`jest.config.js`)

  ```JS
  module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
  }
  ```

* Basic form: (`tests/index.test.tsx`)

  ```javascript
  import * as React from 'react';
  import TestRenderer from 'react-test-renderer';
  
  it('renders without crashing', () => {
    const testRenderer: TestRenderer.ReactTestRenderer = TestRenderer.create(<h1>Hello World</h1>);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
  ```

## Tailwind

* Install: `yarn add tailwind`
* And then follow [Official guide](https://tailwindcss.com/docs/guides/create-react-app)
* And import it in `index.js` or `index.tsx` with

  ```javascript
  import './index.css';
  ```

* For the basic css concept, please refer to [CSS]

## Deploy

### Netlify

* install

  ```bash
  npm install netlify-cli -g
  ```

* build

  ```bash
  npm run build
  ```

* deploy

  ```bash
  netlify deploy
  ```

* cd: Just setup it in netlify

## Examples

Refer to the example in open sources.

* Blog: Markdown (image, code block, mermaid, mathjax).

## Other

### Debug Source Code

* Clone
* Install
* Build on local
* Sym link: [Debugging React Source Code with a React Client App](https://dev.to/arnabchat90/debugging-react-source-code-with-a-react-client-app-1l7)

### Optimize

* Lazy Loading: Lazy loading involves loading components only when they're needed, reducing the initial bundle size and improving the initial load time of your application. Here's an example:

  ```jsx
  import React, { Suspense } from 'react';
  
  // Import a placeholder component to show while the LazyComponent is loading
  const LoadingPlaceholder = () => <div>Loading...</div>;
  
  // Lazy load LazyComponent using React.lazy()
  const LazyComponent = React.lazy(() => import('./LazyComponent'));
  
  // Main component
  const App = () => {
    return (
      <div>
        <h1>My App</h1>
        {/* Wrap the lazy loaded component with Suspense and provide a fallback */}
        <Suspense fallback={<LoadingPlaceholder />}>
          {/* Lazy load LazyComponent */}
          <LazyComponent />
        </Suspense>
      </div>
    );
  };
  
  export default App;
  ```

* Code Splitting: Code splitting divides your codebase into smaller chunks and loads them on demand, reducing the initial load time of your application. Here's an example using React.lazy():

  ```jsx
  import React, { Suspense } from 'react';
  
  // Import a placeholder component to show while the CodeSplitComponent is loading
  const LoadingPlaceholder = () => <div>Loading...</div>;
  
  // Lazy load CodeSplitComponent using React.lazy()
  const CodeSplitComponent = React.lazy(() => import('./CodeSplitComponent'));
  
  // Main component
  const App = () => {
    return (
      <div>
        <h1>My App</h1>
        {/* Wrap the lazy loaded component with Suspense and provide a fallback */}
        <Suspense fallback={<LoadingPlaceholder />}>
          {/* Lazy load CodeSplitComponent */}
          <CodeSplitComponent />
        </Suspense>
      </div>
    );
  };
  
  export default App;
  ```

* Asynchronous Rendering: Asynchronous rendering allows React to work on rendering multiple components concurrently, improving the perceived performance of your application. Here's an example using Concurrent Mode (experimental as of React 18):

  ```jsx
  import React, { Suspense, unstable_ConcurrentMode as ConcurrentMode } from 'react';
  
  // Import components
  import ComponentA from './ComponentA';
  import ComponentB from './ComponentB';
  
  // Main component
  const App = () => {
    return (
      <ConcurrentMode>
        <div>
          <h1>My App</h1>
          {/* Render components asynchronously */}
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentA />
            <ComponentB />
          </Suspense>
        </div>
      </ConcurrentMode>
    );
  };
  
  export default App;
  ```

### Package Management

* Update npm/yarn
* Remove unused package manually: walk through `package.json` and just remove the lines
* Detect bundle size of packages
  * Install `webpack-bundle-analyzer`

    ```bash
    npm install --save-dev webpack-bundle-analyzer
    # or
    yarn add --dev webpack-bundle-analyzer
    ```

  * Modify `webpack.config.js`

    ```javascript
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    module.exports = {
      // ...your existing webpack configuration...
      plugins: [
        new BundleAnalyzerPlugin(),
        // ...other plugins...
      ],
    };
    ```

* Use `depcheck`
  * Install

    ```bash
    npm install -g depcheck
    ```

  * Use it

    ```bash
    depcheck
    ```

  * Then you can upm uninstall the unused package it lists

### upload to npm

create a component

```jsx
import React from 'react';
const MyComponent=(props)=> {
  const {label} = props;
  return (
    <div>
      <button>{label}</button>
    </div>
  );
}
export default MyComponent;
```

use babel. In root, create babel.config.js

```JS
module.exports = {
    presets:[
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

package.json

```json
{
  "name": "test-npm-ycchenvictor",
  "version": "0.1.1",
  "main": "dist/index.js",
  "dependencies": {
    "@babel/cli": "^7.24.5",
    "@babel/preset-env": "^7.24.5",
    "@babel/preset-react": "^7.24.1",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1",
    "save-dev": "^0.0.1-security",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "build": "babel src -d dist",
    "prepublishOnly": "npm run build"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

run `npm run build` and it will create a `dist/` in the root

publish through `npm publish`

Then import it in another app as follow:

```bash
npm install my-react-package
```

import it

```JS
import { MyComponent } from 'my-react-package';

const App = () =>{
return(
  <div>
   <MyComponent label={'Submit'}/>
  </div>
 )
}
```

## Reference

[React JS - React Tutorial for Beginners](https://www.youtube.com/watch?v=Ke90Tje7VS0)

[Build a 3D World in React with ThreeJS and React Three Fiber](https://www.youtube.com/watch?v=9ZEjSxDRIik)

[【React教學】一個範例讓你搞懂useState, useRef, useEffect, 5分鐘快速教學](https://www.youtube.com/watch?v=q0C5g4WIrKU&t=132s)

[Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)

[React useRef Hook](https://www.w3schools.com/react/react_useref.asp)

[react-sidebar-menu-medium](https://codesandbox.io/s/78ize)

[AJAX and APIs](https://reactjs.org/docs/faq-ajax.html)

[markdown to jsx](https://www.google.com/search?q=how+to+load+markdown+file+inreact&oq=how+to+load+markdown+file+inreact&aqs=chrome..69i57j33i10i160l3j33i22i29i30.10981j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_rc-vZNq5B4bz-Qa_oorIAQ_31)

[Using Dynamic Anchor Links in React Markdown](https://spin.atomicobject.com/2022/11/17/dynamic-anchor-tags/)

[react-markdown的使用](https://www.cnblogs.com/mbbk/p/react-markdown.html)

[How to Integrate Next, React, Mermaid, and Markdown](https://www.andynanopoulos.com/blog/how-to-integrate-next-react-mermaid-markdown)

[Debugging React Source Code with a React Client App](https://dev.to/arnabchat90/debugging-react-source-code-with-a-react-client-app-1l7)

[A Step-by-Step Guide to Publishing Your Own React NPM Package](https://blog.nonstopio.com/a-step-by-step-guide-to-publishing-your-own-react-npm-package-fa2b7f1d149)
