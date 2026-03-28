// 🔹 Get user
let user = localStorage.getItem("user");

if (!user) window.location.href = "login.html";

document.getElementById("userDisplay").innerText = "Welcome " + user;

// 🔥 Get meetingId from storage
let meetingId = localStorage.getItem("meetingId");

// 🔥 Create Meeting
async function createMeeting() {

  let title = document.getElementById("mTitle").value;
  let date = document.getElementById("mDate").value;
  let desc = document.getElementById("mDesc").value;

  if (!title || !date || !desc) {
    alert("Fill all fields!");
    return;
  }

  let res = await fetch("http://localhost:8080/meetings", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      title: title,
      date: date,
      description: desc,
      attendees: ["Anuja", "Pratham"]
    })
  });

  let data = await res.json();

  meetingId = data.id;

  // 🔥 SAVE ID (VERY IMPORTANT)
  localStorage.setItem("meetingId", meetingId);

  // 🔥 SHOW MEETING
  document.getElementById("meetingDisplay").innerHTML = `
    <strong>${data.title}</strong><br>
    📅 ${data.date}<br>
    📝 ${data.description}
  `;

  alert("Meeting Created ✅");

  loadDecisions();
}

// 🔹 Add Decision
async function addDecision() {

  if (!meetingId) {
    alert("Create meeting first!");
    return;
  }

  let d = document.getElementById("decision").value;

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

  loadDecisions();
}

// 🔹 Add Task
async function addTask() {

  if (!meetingId) {
    alert("⚠️ Please create a meeting first!");
    return;
  }

  let task = document.getElementById("task").value;
  let assignee = document.getElementById("assignee").value;
  let deadline = document.getElementById("deadline").value;
  let status = document.getElementById("status").value;

  if (!task || !deadline) {
    alert("Fill all fields");
    return;
  }

  let action = {
    title: task,
    assignedTo: assignee,
    deadline: deadline,
    status: status
  };

  await fetch(`http://localhost:8080/meetings/${meetingId}/action`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(action)
  });

  document.getElementById("task").value = "";
  document.getElementById("deadline").value = "";

  loadTasks();
}

// 🔹 Load Tasks
async function loadTasks() {

  let res = await fetch(`http://localhost:8080/users/${user}/tasks`);
  let data = await res.json();

  let list = document.getElementById("taskList");
  list.innerHTML = "";

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

// 🔹 Load Decisions
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

// 🔹 Load meeting on refresh
async function loadMeetingOnRefresh() {

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

// 🔹 Logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// 🔥 INIT
loadMeetingOnRefresh();
loadTasks();
loadDecisions();