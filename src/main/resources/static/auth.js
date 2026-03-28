async function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  try {
    let response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      let data = await response.json();

      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password!");
    }

  } catch (error) {
    alert("Server error!");
    console.error(error);
  }
}