package com.harrisburgu.lms.services;

import com.harrisburgu.lms.LmsApplication;
import com.harrisburgu.lms.dao.*;
import com.harrisburgu.lms.entity.*;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@TestPropertySource("/application.properties")
@SpringBootTest(classes= LmsApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ReadServiceTest {
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
    private ReadService readService;


    private Book theBook;
    private Author theAuthor;
    private Genre theGenre;
    private Publisher thePublisher;
    private Librarian theLibrarian;
    private LibraryBranch theLibraryBranch;
    private User theUser;
    private BookCopy theBookCopy;
    private LoanRecord theLoanRecord;

    List<Author> theAuthors = new ArrayList<>();
    List<Book> theBooks = new ArrayList<>();

    @BeforeEach
    public void setupDatabase(){
        LocalDate theDate = LocalDate.of(2020, 1, 8);
        LocalDate anotherDate = LocalDate.of(1946, 10, 16);
        LocalDate authorDOB = LocalDate.of(1968, 4, 25);
        LocalDate theDueDate = LocalDate.now().plusDays(7);
        LocalDateTime theLoanDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.now());
        LocalDateTime theDueDateTime = LocalDateTime.of(theDueDate,LocalTime.now());


        thePublisher = new Publisher(1L,"Penguin Random House","1745 Broadway, New York, NY 10019",
                "18007932665", "penguin_random_house@facebook.com","traditional",anotherDate,
                "980", new ArrayList<>());
        theAuthor = Author.builder().id(95L).name("Jackie Chan").gender('M').email("jackie@chan.com").dob(authorDOB).build();

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

        theAuthors.add(theAuthor);
        theBooks.add(theBook);
    }

    @Test
    @Order(1)
    @DisplayName("Finding Author By ID")
    void getAuthorById() {
        when(authorRepository.findById(anyLong())).thenReturn(Optional.of(theAuthor));
        Author tempAuthor = readService.getAuthorById(theAuthor.getId());
        assertEquals(tempAuthor, theAuthor, "Author Found By ID");
    }

    @Test
    @Order(2)
    @DisplayName("Finding Author By Name")
    void getAuthorsByName() {
        when(authorRepository.findAuthorByName(anyString())).thenReturn(theAuthors);
        List<Author> tempAuthors = readService.getAuthorsByName(theAuthor.getName());
        assertEquals(tempAuthors, theAuthors, "Authors Found By Name");
    }

    @Test
    @Order(3)
    @DisplayName("Finding All Authors")
    void getAllAuthors() {
        when(authorRepository.findAll()).thenReturn(theAuthors);
        List<Author> tempAuthors = readService.getAllAuthors();
        assertEquals(tempAuthors, theAuthors, "Authors Found By Name");
    }

    @Test
    @Order(4)
    @DisplayName("Finding Book By Author ID")
    void getBooksByAuthorId() {
        when(bookRepository.findBookByAuthorId(anyLong())).thenReturn(theBooks);
        List<Book> books = readService.getBooksByAuthorId(theAuthor.getId());
        assertEquals(books, theBooks, "Books Found By Author ID");
    }

//    @Test
//    void getBooksByGenreId() {
//    }
//
//    @Test
//    void getBookById() {
//    }
//
//    @Test
//    void getBooksByTitle() {
//    }
//
//    @Test
//    void getAllBooks() {
//    }
//
//    @Test
//    void getGenreById() {
//    }
//
//    @Test
//    void getGenresByName() {
//    }
//
//    @Test
//    void getAllGenres() {
//    }
//
//    @Test
//    void getPublisherById() {
//    }
//
//    @Test
//    void getPublishersByName() {
//    }
//
//    @Test
//    void getAllPublishers() {
//    }
//
//    @Test
//    void getUserById() {
//    }
//
//    @Test
//    void getUsersByName() {
//    }
//
//    @Test
//    void getAllUsers() {
//    }
//
//    @Test
//    void getLibrarianById() {
//    }
//
//    @Test
//    void getLibrariansByName() {
//    }

//    @Test
//    void getAllLibrarians() {
//    }

//    @Test
//    void getAllBranches() {
//    }
//
//    @Test
//    void getBranchById() {
//    }
//
//    @Test
//    void getBranchByName() {
//    }
//
//    @Test
//    void getLoanRecordsForUser() {
//    }
//
//    @Test
//    void getLoanRecordsForBranch() {
//    }
//
//    @Test
//    void getAllLoanRecords() {
//    }
//
//    @Test
//    void getBookCopiesForBranch() {
//    }
//
//    @Test
//    void getAllBooksForBranch() {
//    }
//
//    @Test
//    void getloanRecord() {
//    }
}