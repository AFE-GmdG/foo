document.addEventListener("DOMContentLoaded", () => {
  try {
    const { hash, search } = location;
    if (hash) {
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
      window.location.replace(redirectUri + search);
    }
  } catch {
  }
  app.append(document.createTextNode("Error redirecting..."));
});
