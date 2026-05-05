package com.eventify.eventify_server;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Event {

    @Id
    @Pattern(regexp = "EVT-\\d{3}", message = "Event ID must follow this format: EVT-101")
    private String id;

    @NotBlank
    @Size(min = 3)
    private String title;

    @NotBlank
    @Size(min = 3)
    private String club;

    @NotBlank
    private String date;

    @NotBlank
    @Size(min = 3)
    private String venue;

    @Min(1)
    private int capacity;

    @NotBlank
    @Size(min = 15)
    private String description;

    public Event() {
    }

    public Event(String id, String title, String club, String date, String venue, int capacity, String description) {
        this.id = id;
        this.title = title;
        this.club = club;
        this.date = date;
        this.venue = venue;
        this.capacity = capacity;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getClub() {
        return club;
    }

    public void setClub(String club) {
        this.club = club;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}