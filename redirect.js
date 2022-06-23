document.addEventListener("DOMContentLoaded", () => {
  try {
    const hash = location.hash;
    const parts = hash.split("&");
    const state = parts.find((part) => part.startsWith("state"));
    const redirectUriIndex = state.indexOf("%3d%7c");
    const redirectUriBase64 = state.substring(redirectUriIndex + 6);
    const redirectUriBase64Length = redirectUriBase64.indexOf("%") >= 0 ? redirectUriBase64.indexOf("%") : redirectUriBase64.length;
    const redirectUri = atob(redirectUriBase64.substring(0, redirectUriBase64Length));
    window.location.replace(redirectUri + hash);
    return;
  } catch {
  }
  app.append(document.createTextNode("Error redirecting..."));
});
