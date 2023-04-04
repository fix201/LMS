package com.harrisburgu.lms;

import com.harrisburgu.lms.entity.Book;
import com.harrisburgu.lms.entity.LoanRecord;
import com.harrisburgu.lms.services.CreateUpdateService;
import com.harrisburgu.lms.services.ReadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController {

	private final ReadService readService;
	private final CreateUpdateService createUpdateService;

	public UserController(ReadService readService,
						  CreateUpdateService createUpdateService) {
		this.readService = readService;
		this.createUpdateService = createUpdateService;
	}
	
	@GetMapping("/books")
	public List<Book> getAllBooks() {
		return readService.getAllBooks();
	}

	@GetMapping("/books/{id}")
	public Book getBook(@PathVariable("id") Long id) {
		return readService.getBookById(id);
	}

	@GetMapping("{id}/loans")
	public List<LoanRecord> getLoanRecordsByUser(@PathVariable("id") Long id){
		return readService.getLoanRecordsForUser(id);
	}
	
	@PostMapping("{id}/checkout")
	public LoanRecord checkOut(@PathVariable("id") Long id, @RequestBody LoanRecord loanRecord) {
		loanRecord.setUserId(id);
		LoanRecord record = readService.getloanRecord(loanRecord);
		if(record == null){
			record = createUpdateService.overrideLoanRecord(loanRecord);
		}
		return record;
	}

	@PostMapping("{id}/checkin")
	public ResponseEntity<LoanRecord> checkIn(@PathVariable("id") Long id, @RequestBody LoanRecord loanRecord) {
		loanRecord.setUserId(id);
		LoanRecord record = readService.getloanRecord(loanRecord);
		if(record == null){
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok(createUpdateService.overrideLoanRecord(loanRecord));
	}
}
