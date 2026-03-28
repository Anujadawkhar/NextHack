package com.meetaccount.controller;

import com.meetaccount.model.Meeting;
import com.meetaccount.model.ActionItem;
import com.meetaccount.repository.MeetingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/meetings")
@CrossOrigin(origins = "*")
public class MeetingController {

    @Autowired
    private MeetingRepository repo;

    // Create meeting
    @PostMapping
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        return repo.save(meeting);
    }

    // Get all meetings
    @GetMapping
    public List<Meeting> getAll() {
        return repo.findAll();
    }

    // Add decision
    @PostMapping("/{id}/decision")
    public Meeting addDecision(@PathVariable String id, @RequestBody String decision) {
        Meeting m = repo.findById(id).orElseThrow();

        if (m.getDecisions() == null)
            m.setDecisions(new ArrayList<>());

        m.getDecisions().add(decision);

        return repo.save(m);
    }

    // Add action item
    @PostMapping("/{id}/action")
    public Meeting addAction(@PathVariable String id, @RequestBody ActionItem action) {
        Meeting m = repo.findById(id).orElseThrow();

        if (m.getActionItems() == null)
            m.setActionItems(new ArrayList<>());

        m.getActionItems().add(action);

        return repo.save(m);
    }
}