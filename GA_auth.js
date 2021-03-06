var clientId = '949191282940-ks2catvto36n4gl5ml88o7m0g8ifm00a.apps.googleusercontent.com';
var apiKey = 'AIzaSyCxJvzEbKklGPpE9qRT7EX2NIUfR3KN8IQ';
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

// This function is called after the Client Library has finished loading
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}


function checkAuth() {
  console.log("Checking Auth...");
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}


function handleAuthResult(authResult) {
  console.log("Auth result = ");
  console.dir(authResult);
  if (authResult.status.signed_in) {
    // The user has authorized access
    // Load the Analytics Client. This function is defined in the next section.
    loadAnalyticsClient();
  } else {
    // User has not Authenticated and Authorized
    handleUnAuthorized();
  }
}


// Authorized user
function handleAuthorized() {
  var authorizeButton = document.getElementById('btn-authorize');
  var makeApiCallButton = document.getElementById('btn-get-data');

  makeApiCallButton.style.display = 'inline';
  authorizeButton.style.display = 'none';
  makeApiCallButton.onclick = makeApiCall;
}


// Unauthorized user
function handleUnAuthorized() {
  var authorizeButton = document.getElementById('btn-authorize');
  var makeApiCallButton = document.getElementById('btn-get-data');

  makeApiCallButton.style.display = 'none';
  authorizeButton.style.display = 'inline';
  authorizeButton.onclick = handleAuthClick;
}


function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}


function loadAnalyticsClient() {
  // Load the Analytics client and set handleAuthorized as the callback function
  gapi.client.load('analytics', 'v3', handleAuthorized);
}