# static-website-visits

This repo contains the code that records visitors' visits to **static** websites. It contains the Javascript code in [/js](/js) that is embedded in frontend pages, as well as the Python code in [/lambda](/lambda) which is deployed to AWS lambda. MongoDB is used to store the data for the visits.

It support two type of visit records currently:

1. Page visits: Logging each page the user visited in the web site
2. External url visits: Logging the links to external web sites that the user has clicked
3. Error pages: Logging the page visits where the status code != 200

New functions planning to be added:
1. Logging which buttons the user clicked on
2. Logging the time user spent on each page

## Requirements

1. A static website
2. AWS account for creating Lambda function (1 million free requests / month)
3. MongoDB Atlas account (512 MB storage for free)

Since one record uses around 200 B storage space (depending on the lengths of the urls of the site), so around 2.5 million records can be saved into the DB.
