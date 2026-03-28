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

        List<Map<String, Object>> result = new ArrayList<>();

        for (Meeting m : repo.findAll()) {
            if (m.getActionItems() != null) {
                for (ActionItem a : m.getActionItems()) {

                    if (a.getAssignedTo().equals(user)) {

                        Map<String, Object> t = new HashMap<>();

                        t.put("title", a.getTitle());
                        t.put("deadline", a.getDeadline());
                        t.put("status", a.getStatus());
                        t.put("meetingTitle", m.getTitle());

                        boolean overdue =
                                a.getDeadline().compareTo(LocalDate.now().toString()) < 0
                                && !a.getStatus().equals("DONE");

                        t.put("overdue", overdue);

                        result.add(t);
                    }
                }
            }
        }

        // Sort by deadline
        result.sort(Comparator.comparing(t -> (String) t.get("deadline")));

        return result;
    }
}