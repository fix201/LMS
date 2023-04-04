package com.harrisburgu.lms;

import com.harrisburgu.lms.entity.Book;
import com.harrisburgu.lms.entity.BookCopy;
import com.harrisburgu.lms.entity.Librarian;
import com.harrisburgu.lms.entity.LoanRecord;
import com.harrisburgu.lms.services.CreateUpdateService;
import com.harrisburgu.lms.services.DeleteService;
import com.harrisburgu.lms.services.ReadService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/librarian")
public class LibrarianController {

    private final ReadService readService;
    private final CreateUpdateService createUpdateService;
    private final DeleteService deleteService;

    public LibrarianController(ReadService readService,
                           CreateUpdateService createUpdateService,
                           DeleteService deleteService) {
        this.readService = readService;
        this.createUpdateService = createUpdateService;
        this.deleteService = deleteService;
    }

    @GetMapping("/{id}")
    public Librarian getLibrarian(@PathVariable Long id) {
        return readService.getLibrarianById(id);
    }

    @GetMapping("/{id}/books")
    public List<Book> getAllBooks(@PathVariable Long id) {
        Librarian librarian = readService.getLibrarianById(id);
        return readService.getAllBooksForBranch(librarian.getLibraryBranch());
    }

    @GetMapping("/{id}/books/{bookId}")
    public Book getBookById(@PathVariable Long id, @PathVariable Long bookId) {
        return readService.getBookById(bookId);
    }

    @PostMapping("/{id}/book")
    public Book addBook(@PathVariable Long id, @RequestBody Book book) {
        Librarian librarian = readService.getLibrarianById(id);
        book = createUpdateService.saveBook(book);
        createUpdateService.addBookToBranch(new BookCopy( librarian.getId(), book.getId(),1));
        return book;
    }

    @DeleteMapping("/{id}/book")
    public void removeBook(@PathVariable Long id, @RequestParam Long bookId) {
        Librarian librarian = readService.getLibrarianById(id);
        deleteService.removeBookFromBranch(librarian.getLibraryBranch().getId(), bookId);
    }

    @PostMapping("/{id}/loan")
    public LoanRecord overrideBookLoan(@PathVariable Long id, @RequestBody LoanRecord loanRecord) {
        Librarian librarian = readService.getLibrarianById(id);
        loanRecord.setLibraryBranchId(librarian.getId());
        return createUpdateService.overrideLoanRecord(loanRecord);
    }
}