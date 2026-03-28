# 🚀 Meeting Accountability Tracker

## 📌 Overview

In many teams, meetings generate discussions but lack structured follow-ups, leading to missed tasks and poor accountability.
This project solves that problem by providing a simple system to track meetings, decisions, and action items — ensuring nothing gets lost.

---

## 🎯 Features

### 🟢 Meeting Log

* Create meetings with:

  * Title
  * Date
  * Agenda / context
  * Attendees

---

### 🟢 Decisions Log

* Capture key decisions made during meetings
* Focus on **what was decided**, not who said it
* Display decisions clearly in the meeting view

---

### 🟢 Action Items

* Add tasks with:

  * Title
  * Assigned owner (from attendees)
  * Deadline
  * Status (OPEN / IN_PROGRESS / DONE)

---

### 🟢 Personal Feed

* Each user sees only their assigned tasks
* Tasks are:

  * Sorted by deadline
  * Aggregated across all meetings

---

### 🔴 Staleness Indicator

* Overdue tasks (past deadline & not done) are:

  * Highlighted visually
  * Easily identifiable in the dashboard

---

## 🛠 Tech Stack

* **Backend:** Java + Spring Boot
* **Database:** MongoDB
* **Frontend:** HTML, CSS, JavaScript
* **API Testing:** Insomnia / Postman

---

## 🚀 How to Run

### 1️⃣ Start Backend

```bash
mvn spring-boot:run
```

---

### 2️⃣ Open Application

```
http://localhost:8080/login.html
```

---

### 3️⃣ Usage Flow

1. Login with username
2. Create a meeting
3. Add decisions
4. Add action items
5. View tasks in personal dashboard

---

## 📊 API Endpoints

* `POST /meetings` → Create meeting
* `POST /meetings/{id}/decision` → Add decision
* `POST /meetings/{id}/action` → Add task
* `GET /users/{user}/tasks` → Personal feed

---

## 💡 Future Improvements

* Weekly summary (digest)
* Notifications & reminders
* Analytics dashboard
* Multi-user authentication

---

## 🏁 Conclusion

This project ensures **accountability in meetings** by turning discussions into actionable, trackable outcomes — improving productivity and team coordination.

---

✨ Built for hackathon with focus on simplicity, clarity, and impact.
