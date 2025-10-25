function handleCredentialResponse(response) {
  console.log("Google ID Token:", response.credential);

  // Decode the token payload
  const payload = JSON.parse(atob(response.credential.split('.')[1]));
  console.log("User Info:", payload);

  // Save user info locally
  localStorage.setItem("user", JSON.stringify({
    name: payload.name,
    email: payload.email,
    picture: payload.picture
  }));

  // Redirect after login
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Google Login script loaded successfully.");
});
