package com.harrisburgu.lms.services;

import com.harrisburgu.lms.LmsApplication;
import com.harrisburgu.lms.dao.AuthorRepository;
import com.harrisburgu.lms.dao.BookCopyRepository;
import com.harrisburgu.lms.dao.BookRepository;
import com.harrisburgu.lms.dao.GenreRepository;
import com.harrisburgu.lms.dao.LibrarianRepository;
import com.harrisburgu.lms.dao.LibraryBranchRepository;
import com.harrisburgu.lms.dao.LoanRecordRepository;
import com.harrisburgu.lms.dao.PublisherRepository;
import com.harrisburgu.lms.dao.UserRepository;
import com.harrisburgu.lms.entity.Author;
import com.harrisburgu.lms.entity.Book;
import com.harrisburgu.lms.entity.BookCopy;
import com.harrisburgu.lms.entity.Genre;
import com.harrisburgu.lms.entity.Librarian;
import com.harrisburgu.lms.entity.LibraryBranch;
import com.harrisburgu.lms.entity.LoanRecord;
import com.harrisburgu.lms.entity.Publisher;
import com.harrisburgu.lms.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@TestPropertySource("/application.properties")
@SpringBootTest(classes= LmsApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CreateUpdateServiceTest {
    @Mock
    private BookRepository bookRepository;
    @Mock
    private AuthorRepository authorRepository;
    @Mock
    private GenreRepository genreRepository;
    @Mock
    private PublisherRepository publisherRepository;
    @Mock
    private LibrarianRepository librarianRepository;
    @Mock
    private LibraryBranchRepository libraryBranchRepository;
    @Mock
    private LoanRecordRepository loanRecordRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private BookCopyRepository bookCopyRepository;

    @InjectMocks
    private CreateUpdateService createUpdateService;


    private Book theBook;
    private Author theAuthor;
    private Genre theGenre;
     private Publisher thePublisher;
    private Librarian theLibrarian;
    private LibraryBranch theLibraryBranch;
    private User theUser;
    private BookCopy theBookCopy;
    private LoanRecord theLoanRecord;


    @BeforeEach
    public void setupDatabase(){
        LocalDate theDate = LocalDate.of(2020, 1, 8);
        LocalDate anotherDate = LocalDate.of(1946, 10, 16);
        LocalDate authorDOB = LocalDate.of(1968, 4, 25);
        LocalDate theDueDate = LocalDate.now().plusDays(7);
        LocalDateTime theLoanDateTime = LocalDateTime.of(LocalDate.now(),LocalTime.now());
        LocalDateTime theDueDateTime = LocalDateTime.of(theDueDate,LocalTime.now());


        thePublisher = new Publisher(1L,"Penguin Random House","1745 Broadway, New York, NY 10019",
                "18007932665", "penguin_random_house@facebook.com","traditional",anotherDate,
                "980", new ArrayList<>());
        theAuthor = Author.builder().name("Jackie Chan").gender('M').email("jackie@chan.com").dob(authorDOB).build();

        theGenre = Genre.builder().genreName("Shonen").books(null).build();

        theBook = Book.builder().id(69L).title("Let Me In").isbn("1012213546").edition(2).totalPages(265).format("pdf")
                .language("French").publicationDate(theDate).publisher(thePublisher).build();

        theLibraryBranch = LibraryBranch.builder().name("Colossal Branch").address("123 Kirby Rd, Little Rock AR 72123").hoursOfOperation("Wednesday - Sunday: 12pm - 8pm")
                .phoneNumber("326456974").capacity(184).email("colossalbrach@library.com").build();

        theLibrarian = Librarian.builder().name("Martha Khan").phone("235-646-6998").email("martha_khan@lirary.com")
                .address("2254 Donaghey Ave, Conway AR 72041").ssn("999-99-9999").emergencyContact("Mark Todo 645454154 marktodo06@yahoo.com")
                .libraryBranch(theLibraryBranch).build();

        theUser = User.builder().name("Logan Paul").occupation("YouTuber").gender("Male").phone("648-977-6894").email("loganpaul@youtube.org")
                .address("123 logan house dr").build();

        theBookCopy = BookCopy.builder().libraryBranchId(theLibraryBranch.getId()).bookId(theBook.getId()).noOfCopies(25).build();

        theLoanRecord = LoanRecord.builder().userId(theUser.getId()).libraryBranchId(theLibraryBranch.getId())
                .bookId(theBook.getId()).loanDate(theLoanDateTime).dueDate(theDueDateTime).build();
    }

    @Test
    @Order(1)
    @DisplayName("Saving Book")
    public void saveBookTest(){
        when(bookRepository.save(any(Book.class))).thenReturn(theBook);
        Book tempBook = createUpdateService.saveBook(theBook);
        assertEquals(theBook, tempBook, "Book saved");

    }

    @Test
    @Order(2)
    @DisplayName("Saving Author")
    public void saveAuthorTest() {
        when(authorRepository.save(any(Author.class))).thenReturn(theAuthor);
        Author tempAuthor = createUpdateService.saveAuthor(theAuthor);
        assertEquals(theAuthor, tempAuthor, "Author saved");
    }

    @Test
    @Order(3)
    @DisplayName("Saving Genre")
    void saveGenre() {
        when(genreRepository.save(any(Genre.class))).thenReturn(theGenre);
        Genre tempGenre = createUpdateService.saveGenre(theGenre);
        assertEquals(theGenre,tempGenre, "Genre Saved");
    }

    @Test
    @Order(4)
    @DisplayName("Saving Publisher")
    void savePublisher() {
        when(publisherRepository.save(any(Publisher.class))).thenReturn(thePublisher);
        Publisher tempPublisher = createUpdateService.savePublisher(thePublisher);

        assertEquals(thePublisher,tempPublisher, "Publisher Saved");
    }

    @Test
    @Order(5)
    @DisplayName("Saving Librarian")
    void saveLibrarian() {
        when(librarianRepository.save(any(Librarian.class))).thenReturn(theLibrarian);
        Librarian tempLibrarian = createUpdateService.saveLibrarian(theLibrarian);
        assertEquals(theLibrarian,tempLibrarian, "Librarian Saved");
    }

    @Test
    @Order(6)
    @DisplayName("Saving Library Branch")
    void saveLibraryBranch() {
        when(libraryBranchRepository.save(any(LibraryBranch.class))).thenReturn(theLibraryBranch);
        LibraryBranch tempBranch = createUpdateService.saveLibraryBranch(theLibraryBranch);
        assertEquals(theLibraryBranch,tempBranch, "Library Branch Saved");
    }

    @Test
    @Order(7)
    @DisplayName("Saving User")
    void saveUser() {
        when(userRepository.save(any(User.class))).thenReturn(theUser);
        User tempUser = createUpdateService.saveUser(theUser);
        assertEquals(theUser,tempUser, "User Saved");
    }

    @Test
    @Order(8)
    @DisplayName("Adding Book To Branch")
    void addBookToBranch() {
        when(bookCopyRepository.save(any(BookCopy.class))).thenReturn(theBookCopy);
        BookCopy tempBookCopy = createUpdateService.addBookToBranch(theBookCopy);
        assertEquals(theBookCopy, tempBookCopy, "Book Added To Branch");

    }

    @Test
    @Order(9)
    @DisplayName("Overriding Loan Record")
    void overrideLoanRecord() {
        when(loanRecordRepository.save(any(LoanRecord.class))).thenReturn(theLoanRecord);
        LoanRecord tempLoanRecord = createUpdateService.overrideLoanRecord(theLoanRecord);
        assertEquals(theLoanRecord, tempLoanRecord, "Loan Record Overrode");
    }

}