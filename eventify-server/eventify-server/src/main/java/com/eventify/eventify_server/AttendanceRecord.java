package com.eventify.eventify_server;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class AttendanceRecord {

    @Id
    @Pattern(regexp = "ATD-\\d{3}", message = "Record ID must follow this format: ATD-101")
    private String id;

    @NotBlank
    @Size(min = 3)
    private String name;

    @NotBlank
    @Pattern(regexp = "\\d{7}", message = "Student ID must contain exactly 7 digits")
    private String studentId;

    @NotBlank
    @Size(min = 3)
    private String event;

    @NotBlank
    private String rsvpStatus;

    @NotBlank
    private String attendanceStatus;

    public AttendanceRecord() {
    }

    public AttendanceRecord(String id, String name, String studentId, String event, String rsvpStatus, String attendanceStatus) {
        this.id = id;
        this.name = name;
        this.studentId = studentId;
        this.event = event;
        this.rsvpStatus = rsvpStatus;
        this.attendanceStatus = attendanceStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getRsvpStatus() {
        return rsvpStatus;
    }

    public void setRsvpStatus(String rsvpStatus) {
        this.rsvpStatus = rsvpStatus;
    }

    public String getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(String attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }
}