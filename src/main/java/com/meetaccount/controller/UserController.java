package com.meetaccount.controller;

import com.meetaccount.model.Meeting;
import com.meetaccount.model.ActionItem;
import com.meetaccount.repository.MeetingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private MeetingRepository repo;

    @GetMapping("/{user}/tasks")
    public List<Map<String, Object>> getUserTasks(@PathVariable String user) {

        System.out.println("USER API CALLED FOR: " + user);

        List<Map<String, Object>> result = new ArrayList<>();

        List<Meeting> meetings = repo.findAll();

        for (Meeting m : meetings) {

            if (m.getActionItems() != null) {

                for (ActionItem a : m.getActionItems()) {

                    // 🔥 SAFETY: avoid null crash
                    if (a.getAssignedTo() == null) continue;

                    System.out.println("Checking task for: " + a.getAssignedTo());

                    // 🔥 FIX: trim + ignore case
                    if (a.getAssignedTo().trim().equalsIgnoreCase(user.trim())) {

                        Map<String, Object> t = new HashMap<>();

                        t.put("title", a.getTitle());
                        t.put("deadline", a.getDeadline());
                        t.put("status", a.getStatus());
                        t.put("meetingTitle", m.getTitle());

                        // 🔴 Overdue logic (safe)
                        boolean overdue = false;

                        if (a.getDeadline() != null) {
                            overdue =
                                a.getDeadline().compareTo(LocalDate.now().toString()) < 0
                                && !("DONE".equalsIgnoreCase(a.getStatus()));
                        }

                        t.put("overdue", overdue);

                        result.add(t);
                    }
                }
            }
        }

        // 🔥 SORT safely
        result.sort(Comparator.comparing(t -> (String) t.get("deadline")));

        System.out.println("FINAL TASK COUNT: " + result.size());

        return result;
    }
}