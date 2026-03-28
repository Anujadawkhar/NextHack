let user = localStorage.getItem("user");

if (!user) {
  window.location.href = "login.html";
}

function goBack() {
  window.location.href = "index.html";
}

async function loadPersonalTasks() {
  let res = await fetch(`http://localhost:8080/users/${user}/tasks`);
  let data = await res.json();

  let list = document.getElementById("personalList");
  list.innerHTML = "";

  data.forEach(t => {
    let li = document.createElement("li");

    let today = new Date().toISOString().split("T")[0];

    if (t.deadline < today && t.status !== "DONE") {
      li.classList.add("overdue"); // 🔴 overdue
    }

    li.innerText = `${t.title} | ${t.deadline} | ${t.status}`;
    list.appendChild(li);
  });
}

loadPersonalTasks();