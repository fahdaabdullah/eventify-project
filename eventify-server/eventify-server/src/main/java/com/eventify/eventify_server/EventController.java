package com.eventify.eventify_server;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return eventRepository.findById(id.toUpperCase())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Event> addEvent(@Valid @RequestBody Event event) {
        event.setId(event.getId().trim().toUpperCase());
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.ok(savedEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @Valid @RequestBody Event event) {
        return eventRepository.findById(id.toUpperCase())
                .map(existingEvent -> {
                    event.setId(id.toUpperCase());
                    Event updatedEvent = eventRepository.save(event);
                    return ResponseEntity.ok(updatedEvent);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        if (!eventRepository.existsById(id.toUpperCase())) {
            return ResponseEntity.notFound().build();
        }

        eventRepository.deleteById(id.toUpperCase());
        return ResponseEntity.noContent().build();
    }
}
