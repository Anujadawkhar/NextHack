package com.meetaccount.controller;

import com.meetaccount.model.ActionItem;
import com.meetaccount.model.Meeting;
import com.meetaccount.repository.MeetingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private MeetingRepository repo;

    // 🔥 MAIN FEATURE
    @GetMapping("/{user}/tasks")
    public List<ActionItem> getUserTasks(@PathVariable String user) {

        List<ActionItem> result = new ArrayList<>();

        List<Meeting> meetings = repo.findAll();

        for (Meeting m : meetings) {
            if (m.getActionItems() != null) {
                for (ActionItem a : m.getActionItems()) {
                    if (a.getAssignedTo().equals(user)) {
                        result.add(a);
                    }
                }
            }
        }

        return result;
    }
}