package com.harrisburgu.lms;

import com.harrisburgu.lms.entity.Author;
import com.harrisburgu.lms.entity.Book;
import com.harrisburgu.lms.entity.BookCopy;
import com.harrisburgu.lms.entity.Genre;
import com.harrisburgu.lms.entity.Librarian;
import com.harrisburgu.lms.entity.LibraryBranch;
import com.harrisburgu.lms.entity.LoanRecord;
import com.harrisburgu.lms.entity.Publisher;
import com.harrisburgu.lms.entity.User;
import com.harrisburgu.lms.services.CreateUpdateService;
import com.harrisburgu.lms.services.DeleteService;
import com.harrisburgu.lms.services.ReadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/admin")
public class AdminController {

	private final Logger logger = LoggerFactory.getLogger(AdminController.class);
	private final ReadService readService;
	private final CreateUpdateService createUpdateService;
	private final DeleteService deleteService;

	public AdminController(ReadService readService,
						   CreateUpdateService createUpdateService,
						   DeleteService deleteService) {
		this.readService = readService;
		this.createUpdateService = createUpdateService;
		this.deleteService = deleteService;
	}

	@GetMapping("/authors")
	public List<Author> getAllAuthors() {
		return readService.getAllAuthors();
	}

	@GetMapping("/authors/{id}")
	public Author getAuthor(@PathVariable("id") Long id) {
		return readService.getAuthorById(id);
	}

	@GetMapping("/books/authors/{id}")
	public List<Book> getBooksByAuthorId(@PathVariable("id") Long id) {
		return readService.getBooksByAuthorId(id);
	}

	@GetMapping("/books")
	public List<Book> getAllBooks() {
		return readService.getAllBooks();
	}

	@GetMapping("/books/{id}")
	public Book getBook(@PathVariable("id") Long id) {
		return readService.getBookById(id);
	}

	@GetMapping("/genres")
	public List<Genre> getAllGenres() {
		return readService.getAllGenres();
	}

	@GetMapping("/genres/{id}")
	public Book getGenre(@PathVariable("id") Long id) {
		return readService.getBookById(id);
	}

	@GetMapping("/books/genres/{id}")
	public List<Book> getBooksByGenreId(@PathVariable("id") Long id) {
		return readService.getBooksByGenreId(id);
	}

	@GetMapping("/publishers")
	public List<Publisher> getAllPublishers() {
		return readService.getAllPublishers();
	}

	@GetMapping("/publishers/{id}")
	public Publisher getPublisher(@PathVariable("id") Long id) {
		return readService.getPublisherById(id);
	}

	@GetMapping("/librarians")
	public List<Librarian> getAllLibrarians() {
		return readService.getAllLibrarians();
	}

	@GetMapping("/librarians/{id}")
	public Librarian getLibrarian(@PathVariable("id") Long id) {
		return readService.getLibrarianById(id);
	}

	@GetMapping("/library/branches")
	public List<LibraryBranch> getAllBranches() {
		return readService.getAllBranches();
	}

	@GetMapping("/library/branches/{id}")
	public LibraryBranch getBranch(@PathVariable("id") Long id) {
		return readService.getBranchById(id);
	}

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return readService.getAllUsers();
	}

	@GetMapping("/users/{id}")
	public User getUser(@PathVariable("id") Long id) {
		return readService.getUserById(id);
	}

	@GetMapping("library/branches/loans")
	public List<Map<String, String>> getAllLoanRecords() {
		return readService.getAllLoanRecords().stream().map(lr ->
				Map.of("userName", readService.getUserById(lr.getUserId()).getName(),
						"branchName", readService.getBranchById(lr.getLibraryBranchId()).getName(),
						"bookTitle", readService.getBookById(lr.getBookId()).getTitle(),
						"loanDate", lr.getLoanDate().toString(),
						"dueDate", lr.getDueDate().toString(),
						"dateIn", lr.getDateIn() != null ? lr.getDateIn().toString() : ""
				)).collect(Collectors.toList());
	}

	@GetMapping("/users/{id}/loans")
	public List<LoanRecord> getLoanRecordsByUser(@PathVariable("id") Long id) {
		return readService.getLoanRecordsForUser(id);
	}

	@GetMapping("/library/branches/{id}/loans")
	public List<LoanRecord> getLoanRecordsByBranch(@PathVariable("id") Long id) {
		return readService.getLoanRecordsForBranch(id);
	}

	@GetMapping("/library/branches/{branchId}/books/{bookId}/amount")
	public Integer getBookCopiesForBranch(@PathVariable Long branchId, @PathVariable Long bookId) {
		return readService.getBookCopiesForBranch(branchId, bookId);
	}

	@PostMapping("/book")
	public Book addOrUpdateBook(@RequestBody Book book) {
		return createUpdateService.saveBook(book);
	}

	@PostMapping("/author")
	public Author addOrUpdateAuthor(@RequestBody Author author) {
		return createUpdateService.saveAuthor(author);
	}

	@PostMapping("/genre")
	public Genre addOrUpdateGenre(@RequestBody Genre genre) {
		return createUpdateService.saveGenre(genre);
	}

	@PostMapping("/publisher")
	public Publisher addOrUpdatePublisher(@RequestBody Publisher publisher) {
		return createUpdateService.savePublisher(publisher);
	}

	@PostMapping("/librarian")
	public Librarian addOrUpdateLibrarian(@RequestBody Librarian librarian) {
		return createUpdateService.saveLibrarian(librarian);
	}

	@PostMapping("/library/branch")
	public LibraryBranch addOrUpdateLibraryBranch(@RequestBody LibraryBranch libraryBranch) {
		return createUpdateService.saveLibraryBranch(libraryBranch);
	}

	@PostMapping("/user")
	public User addOrUpdateUser(@RequestBody User user) {
		return createUpdateService.saveUser(user);
	}

	@PostMapping("library/branch/book")
	public BookCopy updateBookForBranch(@RequestBody BookCopy bookCopy) {
		return createUpdateService.addBookToBranch(bookCopy);
	}

	@PostMapping("library/branch/loan")
	public LoanRecord overrideBookLoan(@RequestBody LoanRecord loanRecord) {
		return createUpdateService.overrideLoanRecord(loanRecord);
	}

	@PostMapping("library/branch/loan/checkin")
	public LoanRecord checkIn(@RequestBody Map<String, String> loanRecord) {
		Long userId = readService.getUsersByName(loanRecord.get("userName")).getId();
		Long branchId = readService.getBranchByName(loanRecord.get("branchName")).getId();
		Long bookId = readService.getBooksByTitle(loanRecord.get("bookTitle")).getId();
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime loanDate = LocalDateTime.parse(loanRecord.get("loanDate"), formatter);
		LocalDateTime dateIn = LocalDateTime.now();
		
		return createUpdateService.overrideLoanRecord(new LoanRecord(userId, branchId, bookId, loanDate, null, dateIn));
	}

	@DeleteMapping("/book")
	public void deleteBook(@RequestParam Long id) {
		deleteService.removeBook(id);
	}

	@DeleteMapping("/author")
	public void deleteAuthor(@RequestParam Long id) {
		deleteService.removeAuthor(id);
	}

	@DeleteMapping("/genre")
	public void deleteGenre(@RequestParam Long id) {
		deleteService.removeGenre(id);
	}

	@DeleteMapping("/publisher")
	public void deletePublisher(@RequestParam Long id) {
		deleteService.removePublisher(id);
	}

	@DeleteMapping("/librarian")
	public void deleteLibrarian(@RequestParam Long id) {
		deleteService.removeLibrarian(id);
	}

	@DeleteMapping("library/branch")
	public void deleteLibraryBranch(@RequestParam Long id) {
		deleteService.removeLibraryBranch(id);
	}

	@DeleteMapping("/user")
	public void deleteUser(@RequestParam Long id) {
		deleteService.removeUser(id);
	}

	@DeleteMapping("library/branch/book")
	public void deleteBookFromBranch(@RequestParam BookCopy bookCopy) {
		deleteService.removeBookFromBranch(bookCopy.getLibraryBranchId(), bookCopy.getBookId());
	}

}
