# JavaScipt script

This folder contains the JavaScript code that could be used on frontend web applications to send visit records to the API.

It support two type of visit records:

1. Page visits: Logging each page the user visited in the web site
2. External url visits: Logging the links to external web sites that the user has clicked

## Using the js to record page visits

1. Put the url into the `const`:
``` js
const API_URL = ""; //TODO
```
2. Include the script in the web application (examples below)

### Embedding the script in HTML files

Uncommenting the line `// recordPageVisit()` in this part of the code
``` js
// Uncomment the following line if this script is imported in HTML files
// recordPageVisit()
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

  return (
    // ...
  );
}
```

## Using the js to record external url visits

``` html
<a href={href} onClick={(e) => onClickHandler(e, href)} onAuxClick={(e) => onClickHandler(e, href)}>
```
Make sure the `href` variable is defined and is a valid url
