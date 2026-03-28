package com.meetaccount.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "meetings")
@Data
public class Meeting {

    @Id
    private String id;

    private String title;
    private String description;

    private List<String> attendees;
    private List<String> decisions;
    private List<ActionItem> actionItems;
}