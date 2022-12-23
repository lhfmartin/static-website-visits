const API_URL = ""; //TODO

async function recordPageVisit() {
  let record = {
    type: "PAGE_VISIT",
    host: window.location.host,
    path: window.location.pathname,
  };
  fetch(API_URL, {
    method: "post",
    mode: "cors",
    body: JSON.stringify(record),
  });
}

async function recordExternalSiteVisit(event, url) {
  if (!url) {
    url = event.currentTarget.getAttribute("href");
  }
  let record = {
    type: "EXTERNAL_SITE_VISIT",
    host: window.location.host,
    path: window.location.pathname,
    externalUrl: url,
  };
  fetch(API_URL, {
    method: "post",
    mode: "cors",
    body: JSON.stringify(record),
  });
}

async function recordErrorPage(statusCode) {
  let record = {
    type: "ERROR_PAGE",
    host: window.location.host,
    path: window.location.pathname,
    statusCode: statusCode,
  };
  fetch(API_URL, {
    method: "post",
    mode: "cors",
    body: JSON.stringify(record),
  });
}

if (typeof module == "undefined") {
  recordPageVisit();
}

// Comment the following line if this script is imported in HTML files
export { recordPageVisit, recordExternalSiteVisit, recordErrorPage };
