function login() {
  let username = document.getElementById("username").value;

  if (!username) {
    alert("Enter username!");
    return;
  }

  localStorage.setItem("user", username);
  window.location.href = "index.html";
}