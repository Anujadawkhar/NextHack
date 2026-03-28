package com.meetaccount.model;

import lombok.Data;

@Data
public class ActionItem {

    private String title;
    private String assignedTo;
    private String deadline;
    private String status;
}