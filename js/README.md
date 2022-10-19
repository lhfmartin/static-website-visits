# JavaScipt script

This folder contains the JavaScript code that could be used on frontend web applications to send visit records to the API.

## Using the js to record page visits

1. Put the url into the `const`:
``` js
const API_URL = ""; //TODO
```
2. Include the script in the web application (examples below)

### Embedding the script in HTML files

Comment out the line with `export` in this part of the code
``` js
// Comment the following line if this script is imported in HTML files
export { recordPageVisit, recordExternalSiteVisit }
```
Then the script should be embedded in each HTML that the page visit should be recorded
``` html
<script src="record-visit.js" async></script>  
```

### Importing the script in React

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

### Importing the script in Next.js

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

## Using the js to record external url visits

Replace the `{url}` with a valid URL
``` html
<a href={url} onClick="recordExternalSiteVisit(event)"></a>
```
