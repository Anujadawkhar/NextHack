// 🔹 Get user
let user = localStorage.getItem("user");

if (!user) window.location.href = "login.html";

user = user.trim();

document.getElementById("userDisplay").innerText = "Welcome " + user;

// 🔹 Load meetingId
let meetingId = localStorage.getItem("meetingId");

// 🔥 CREATE MEETING
async function createMeeting() {

  let title = document.getElementById("mTitle").value;
  let date = document.getElementById("mDate").value;
  let desc = document.getElementById("mDesc").value;

  if (!title || !date || !desc) {
    alert("⚠️ Fill all fields!");
    return;
  }

  let res = await fetch("http://localhost:8080/meetings", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      title,
      date,
      description: desc,
      attendees: ["Anuja", "Pratham"]
    })
  });

  let data = await res.json();

  meetingId = data.id;
  localStorage.setItem("meetingId", meetingId);

  document.getElementById("meetingDisplay").innerHTML = `
    <strong>${data.title}</strong><br>
    📅 ${data.date}<br>
    📝 ${data.description}
  `;

  alert("✅ Meeting Created");

  loadDecisions();
}

// 🔥 ADD DECISION
async function addDecision() {

  if (!meetingId) {
    alert("❌ Create meeting first!");
    return;
  }

  let d = document.getElementById("decision").value.trim();

  if (!d) {
    alert("Enter decision");
    return;
  }

  await fetch(`http://localhost:8080/meetings/${meetingId}/decision`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(d)
  });

  document.getElementById("decision").value = "";

  alert("✅ Decision Added");

  loadDecisions();
}

// 🔥 ADD TASK
async function addTask() {

  if (!meetingId) {
    alert("Create meeting first!");
    return;
  }

  let task = document.getElementById("task").value;
  let deadline = document.getElementById("deadline").value;
  let status = document.getElementById("status").value;

  if (!task || !deadline) {
    alert("Fill all fields");
    return;
  }

  let action = {
    title: task,
    assignedTo: user, // 🔥 AUTO ASSIGN TO LOGGED USER
    deadline,
    status
  };

  await fetch(`http://localhost:8080/meetings/${meetingId}/action`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(action)
  });

  alert("Task Added");

  document.getElementById("task").value = "";
  document.getElementById("deadline").value = "";

  loadTasks();
}
// 🔥 LOAD TASKS (PERSONAL FEED)
async function loadTasks() {

  let res = await fetch(`http://localhost:8080/users/${user}/tasks`);
  let data = await res.json();

  let list = document.getElementById("taskList");

  list.innerHTML = "";

  if (!data || data.length === 0) {
    list.innerHTML = "<li>No tasks found</li>";
    return;
  }

  data.forEach(t => {

    let li = document.createElement("li");

    if (t.overdue) li.classList.add("overdue");

    let color = "orange";
    if (t.status === "DONE") color = "green";
    if (t.status === "IN_PROGRESS") color = "blue";

    li.innerHTML = `
      <div>
        <strong>📌 ${t.meetingTitle}</strong><br>
        📝 ${t.title}<br>
        📅 ${t.deadline}
      </div>
      <span style="color:${color}; font-weight:bold;">
        ${t.status}
      </span>
    `;

    list.appendChild(li);
  });
}

// 🔥 LOAD DECISIONS
async function loadDecisions() {

  if (!meetingId) return;

  let res = await fetch("http://localhost:8080/meetings");
  let data = await res.json();

  let meeting = data.find(m => m.id === meetingId);

  let list = document.getElementById("decisionList");

  list.innerHTML = "";

  if (meeting && meeting.decisions) {
    meeting.decisions.forEach(d => {
      let li = document.createElement("li");
      li.innerText = "📌 " + d;
      list.appendChild(li);
    });
  }
}

// 🔥 LOAD MEETING ON REFRESH
async function loadMeeting() {

  if (!meetingId) return;

  let res = await fetch("http://localhost:8080/meetings");
  let data = await res.json();

  let meeting = data.find(m => m.id === meetingId);

  if (meeting) {
    document.getElementById("meetingDisplay").innerHTML = `
      <strong>${meeting.title}</strong><br>
      📅 ${meeting.date}<br>
      📝 ${meeting.description}
    `;
  }
}

// 🔹 LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// 🔥 INIT
loadMeeting();
loadTasks();
loadDecisions();