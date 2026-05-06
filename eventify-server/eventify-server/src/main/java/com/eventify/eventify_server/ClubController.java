package com.eventify.eventify_server;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
@CrossOrigin(origins = "http://localhost:5173")
public class ClubController {

    private final ClubRepository clubRepository;

    public ClubController(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    @GetMapping
    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Club> getClubById(@PathVariable String id) {
        return clubRepository.findById(id.toUpperCase())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Club> addClub(@Valid @RequestBody Club club) {
        club.setId(club.getId().trim().toUpperCase());
        club.setEmail(club.getEmail().trim().toLowerCase());

        Club savedClub = clubRepository.save(club);
        return ResponseEntity.ok(savedClub);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Club> updateClub(@PathVariable String id, @Valid @RequestBody Club club) {
        return clubRepository.findById(id.toUpperCase())
                .map(existingClub -> {
                    club.setId(id.toUpperCase());
                    club.setEmail(club.getEmail().trim().toLowerCase());

                    Club updatedClub = clubRepository.save(club);
                    return ResponseEntity.ok(updatedClub);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClub(@PathVariable String id) {
        if (!clubRepository.existsById(id.toUpperCase())) {
            return ResponseEntity.notFound().build();
        }

        clubRepository.deleteById(id.toUpperCase());
        return ResponseEntity.noContent().build();
    }
}