package com.eventify.eventify_server;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceRecordController {

    private final AttendanceRecordRepository attendanceRecordRepository;

    public AttendanceRecordController(AttendanceRecordRepository attendanceRecordRepository) {
        this.attendanceRecordRepository = attendanceRecordRepository;
    }

    @GetMapping
    public List<AttendanceRecord> getAllAttendanceRecords() {
        return attendanceRecordRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceRecord> getAttendanceRecordById(@PathVariable String id) {
        return attendanceRecordRepository.findById(id.toUpperCase())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AttendanceRecord> addAttendanceRecord(@Valid @RequestBody AttendanceRecord attendanceRecord) {
        attendanceRecord.setId(attendanceRecord.getId().trim().toUpperCase());

        AttendanceRecord savedRecord = attendanceRecordRepository.save(attendanceRecord);
        return ResponseEntity.ok(savedRecord);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceRecord> updateAttendanceRecord(
            @PathVariable String id,
            @Valid @RequestBody AttendanceRecord attendanceRecord
    ) {
        return attendanceRecordRepository.findById(id.toUpperCase())
                .map(existingRecord -> {
                    attendanceRecord.setId(id.toUpperCase());

                    AttendanceRecord updatedRecord = attendanceRecordRepository.save(attendanceRecord);
                    return ResponseEntity.ok(updatedRecord);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendanceRecord(@PathVariable String id) {
        if (!attendanceRecordRepository.existsById(id.toUpperCase())) {
            return ResponseEntity.notFound().build();
        }

        attendanceRecordRepository.deleteById(id.toUpperCase());
        return ResponseEntity.noContent().build();
    }
}