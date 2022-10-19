const API_URL = ""; //TODO

let deviceInfo = {};

function parse_information(field, text) {
  const re = `${field}=(.*?)\n`;
  return text.match(re)[1];
}

async function setDeviceInfo() {
  let response = await fetch("https://1.1.1.1/cdn-cgi/trace", { mode: "cors" });
  let data = await response.text();

  deviceInfo = {
    ip: parse_information("ip", data),
    country: parse_information("loc", data),
  };
}

let setDeviceInfoPromise = setDeviceInfo();

async function recordPageVisit() {
  await setDeviceInfoPromise;
  let record = {
    type: "PAGE_VISIT",
    host: window.location.host,
    path: window.location.pathname,
    ...deviceInfo,
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
  await setDeviceInfoPromise;
  let record = {
    type: "EXTERNAL_SITE_VISIT",
    host: window.location.host,
    path: window.location.pathname,
    ...deviceInfo,
    externalUrl: url,
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
export { recordPageVisit, recordExternalSiteVisit };
