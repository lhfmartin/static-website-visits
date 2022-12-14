# JavaScipt script

This folder contains the JavaScript code that could be used on frontend web applications to send visit records to the API.

## Using the js

### Setting up

1. Download `record-visit.js` and move it inside the project directory
2. Put the Lambda function url into the `API_URL`:
``` js
const API_URL = ""; //TODO
```
3. Include the script in the web application (examples below)

    1. Embedding the script in HTML files

        Comment out the line with `export` in this part of the code
        ``` js
        // Comment the following line if this script is imported in HTML files
        export { recordPageVisit, recordExternalSiteVisit }
        ```
        Then the script should be embedded in each HTML that the page visit should be recorded
        ``` html
        <script src="record-visit.js" async></script>  
        ```

        Note: On every page where the script is embedded, visits to that page will be recorded automatically. To avoid this, delete / comment out the following code from the script (then, `recordPageVisit` has to be invoked manually on pages where visits should be recorded):
        ``` js
        if (typeof module == "undefined") {
          recordPageVisit();
        }
        ```

    2. Importing the script in JavaScipt modules

        ``` js
        import { recordPageVisit, recordExternalSiteVisit } from './record-visit'
        ```

### Recording page visits

#### HTML

No extra action required, page visits to each HTML file where the script is imported will be recorded automatically by default.

#### JavaScipt modules

Page visits will not be automatically recorded in a single page application. Refer to examples below to see how to record page visits for React and Next.js.

- React

  ``` js
  import { useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
  import { recordPageVisit } from './record-visit'

  function App() {
    let location = useLocation();

    useEffect(() => {
      recordPageVisit();
    }, [location]);
    
    // ...
  ```

- Next.js

  ``` js
  import { useEffect } from "react";
  import { useRouter } from "next/router";
  import { recordPageVisit } from "./record-visit";

  function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
      if (!router.isReady) return;

      recordPageVisit();
    }, [router.isReady, router.pathname]);
    
    // ...
  ```

### Recording external url visits

Replace the `${url}` with a valid URL
``` html
<a href=${url} onClick="recordExternalSiteVisit(event)"></a>
```

### Recording error pages

#### HTML

Replace the `${statusCode}` with the status code returned by the page
```html
<body onload="recordErrorPage(${statusCode})"></body>
```

#### JavaScipt modules

- Next.js

  ``` js
  import { useEffect } from "react";
  import { recordErrorPage } from "./record-visit";

  function MyApp({ Component, pageProps }) {
    useEffect(() => {
      if (pageProps.statusCode && pageProps.statusCode !== 200) {
        recordErrorPage(pageProps.statusCode);
      }
    }, [pageProps.statusCode]);
    
    // ...
  ```
