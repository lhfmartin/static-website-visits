# static-website-visits

This repo contains the code that records visitors' visits to **static** websites. It contains the Javascript code in [/js](/js) that is embedded in frontend pages, as well as the Python code in [/lambda](/lambda) which is deployed to AWS lambda. MongoDB is used to store the data for the visits.

It support two type of visit records currently:

1. Page visits: Logging each page the user visited in the web site
2. External url visits: Logging the links to external web sites that the user has clicked

New functions planning to be added:
1. Logging which buttons the user clicked on
2. Logging the time user spent on each page
