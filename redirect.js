document.addEventListener("DOMContentLoaded", () => {
  try {
    const { hash, search } = location;
    if (hash) {
      // Used at login: Extract the redirect URI from the hash and redirect to it.
      // Add the original hash to the redirect URI; it's needed to get the token.
      const parts = hash.split("&");
      const state = parts.find((part) => part.startsWith("state"));
      const redirectUriIndex = state.indexOf("%3d%7c");
      const redirectUriBase64 = state.substring(redirectUriIndex + 6);
      const redirectUriBase64Length = redirectUriBase64.indexOf("%") >= 0 ? redirectUriBase64.indexOf("%") : redirectUriBase64.length;
      const redirectUri = atob(redirectUriBase64.substring(0, redirectUriBase64Length));
      window.location.replace(redirectUri + hash);
      return;
    }
    if (search) {
      // Used at logout: Extract the logout redirect URI from the query string and redirect to it.
      // Do not add the original query string to the redirect URI.
      const parts = search.split("&");
      const redirectUri = parts.reduce((acc, part) => {
        if (acc) {
          return acc;
        }
        const matches = part.match(/^(?:\?)?(?:state=)(.+)$/i);
        if (!matches) {
          return null;
        }
        const state = decodeURIComponent(matches[1]);
        return atob(state);
      }, null);

      window.location.replace(redirectUri);
      return;
    }
  } catch {
    // Ignore any errors.
  }
  // In case of any error or not hash or search is present, just add a message to the page.
  app.append(document.createTextNode("Error redirecting..."));
});
