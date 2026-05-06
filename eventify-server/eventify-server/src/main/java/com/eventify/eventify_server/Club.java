package com.eventify.eventify_server;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Club {

    @Id
    @Pattern(regexp = "CLB-\\d{3}", message = "Club ID must follow this format: CLB-101")
    private String id;

    @NotBlank
    @Size(min = 3)
    private String name;

    @NotBlank
    @Size(min = 3)
    private String category;

    @NotBlank
    @Size(min = 3)
    private String president;

    @NotBlank
    @Email
    private String email;

    @Min(1)
    private int membersCount;

    public Club() {
    }

    public Club(String id, String name, String category, String president, String email, int membersCount) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.president = president;
        this.email = email;
        this.membersCount = membersCount;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPresident() {
        return president;
    }

    public void setPresident(String president) {
        this.president = president;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public int getMembersCount() {
        return membersCount;
    }

    public void setMembersCount(int membersCount) {
        this.membersCount = membersCount;
    }
}