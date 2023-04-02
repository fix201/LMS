package com.harrisburgu.lms.services;

import com.harrisburgu.lms.entity.Author;
import com.harrisburgu.lms.entity.Book;
import com.harrisburgu.lms.entity.BookCopy;
import com.harrisburgu.lms.entity.Genre;
import com.harrisburgu.lms.entity.Librarian;
import com.harrisburgu.lms.entity.LibraryBranch;
import com.harrisburgu.lms.entity.LoanRecord;
import com.harrisburgu.lms.entity.Publisher;
import com.harrisburgu.lms.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReadService extends BaseService {

	private final Logger logger = LoggerFactory.getLogger(ReadService.class);

	/**
	 * Get author by the author id
	 * @param authorId author id of {@link Author} object
	 * @return {@link Author} object
	 */
	public Author getAuthorById(Long authorId) {
		Author author = (Author) getObjectFromOptional(authorRepo.findById(authorId));
		logger.info("Author with id {}: {}", authorId, author);
		return author;
	}

	/**
	 * Get authors by the author name
	 * @param authorName name of the author
	 * @return {@link List} of {@link Author} objects with same or similar name
	 */
	public List<Author> getAuthorsByName(String authorName) {
		List<Author> authors = authorRepo.findAuthorByName(authorName);
		logger.info("Authors with name {}: {}", authorName, authors);
		return authors;
	}

	/**
	 * Get all authors
	 * @return {@link List} of all {@link Author} objects
	 */
	public List<Author> getAllAuthors() {
		List<Author> authors = authorRepo.findAll();
		logger.info("Authors: {}", authors);
		return authors;
	}

	/**
	 * Get book by the author id
	 * @param authorId author id of {@link Author} object
	 * @return {@link List} of {@link Book} objects
	 */
	public List<Book> getBooksByAuthorId(Long authorId) {
		List<Book> books =  bookRepo.findBookByAuthorId(authorId);
		logger.info("Books: {}", books);
		return books;
	}

	/**
	 * Get book by the genre id
	 * @param genreId genre id of {@link Genre} object
	 * @return {@link List} of {@link Book} objects
	 */
	public List<Book> getBooksByGenreId(Long genreId) {
		List<Book> books =  bookRepo.findBookByGenreId(genreId);
		logger.info("Books: {}", books);
		return books;
	}

	/**
	 * Get book by the book id
	 * @param bookId book id of the {@link Book} object
	 * @return {@link Book} object
	 */
	public Book getBookById(Long bookId) {
		Book book = (Book) getObjectFromOptional(bookRepo.findById(bookId));
		logger.info("Book with id {}: {}", bookId, book);
		return book;
	}

	/**
	 * Get book by the book title
	 * @param title title/name of the book
	 * @return {@link List} of {@link Book} objects with same or similar title
	 */
	public Book getBooksByTitle(String title) {
		Book book = bookRepo.findBookByTitle(title);
		logger.info("Books with name {}: {}", title, book);
		return book;
	}

	/**
	 * Get all books
	 * @return {@link List} of {@link Book} objects
	 */
	public List<Book> getAllBooks() {
		List<Book> books = bookRepo.findAll();
		logger.info("Books: {}", books);
		return books;
	}

	/**
	 * Get genre by the genre id
	 * @param genreId genre id of the {@link Genre} object
	 * @return {@link Genre} object
	 */
	public Genre getGenreById(Long genreId) {
		Genre genre = (Genre) getObjectFromOptional(bookRepo.findById(genreId));
		logger.info("Genre with id {}: {}", genreId, genre);
		return genre;
	}

	/**
	 * Get genre by the genre name
	 * @param genreName name of the {@link Genre} object
	 * @return {@link List} of {@link Genre} objects with same or similar name
	 */
	public List<Genre> getGenresByName(String genreName) {
		List<Genre> genres = genreRepo.findByGenreNameContaining(genreName);
		logger.info("Genres: {}", genres);
		return genres;
	}

	/**
	 * Get all genres
	 * @return {@link List} of {@link Genre} objects
	 */
	public List<Genre> getAllGenres() {
		List<Genre> genres = genreRepo.findAll();
		logger.info("Genres: {}", genres);
		return genres;
	}

	/**
	 * Get publisher by the publisher id
	 * @param publisherId publisher id
	 * @return {@link Publisher} object
	 */
	public Publisher getPublisherById(Long publisherId) {
		Publisher publisher = (Publisher) getObjectFromOptional(publisherRepo.findById(publisherId));
		logger.info("Publisher with id {}: {}", publisherId, publisher);
		return publisher;
	}

	/**
	 * Get publisher by the publisher name
	 * @param publisherName name of the publisher
	 * @return {@link List} of {@link Publisher} objects with same or similar name
	 */
	public List<Publisher> getPublishersByName(String publisherName) {
		List<Publisher> publishers = publisherRepo.findByNameContaining(publisherName);
		logger.info("Publishers: {}", publishers);
		return publishers;
	}

	/**
	 * Get all publishers
	 * @return {@link List} of {@link Publisher} objects
	 */
	public List<Publisher> getAllPublishers() {
		List<Publisher> publishers = publisherRepo.findAll();
		logger.info("Publisher: {}", publishers);
		return publishers;
	}

	/**
	 * Get user by the user id
	 * @param userId id of the user
	 * @return {@link User} object
	 */
	public User getUserById(Long userId) {
		User user = (User) getObjectFromOptional(userRepo.findById(userId));
		logger.info("User with id {}: {}", userId, user);
		return user;
	}

	/**
	 * Get user by the user's name
	 * @param userName name of the user
	 * @return {@link List} of {@link User} objects with same or similar name
	 */
	public User getUsersByName(String userName) {
		User user = userRepo.findByNameContaining(userName);
		logger.info("User: {}", user);
		return user;
	}

	/**
	 * Get all users
	 * @return {@link List} of {@link User} objects
	 */
	public List<User> getAllUsers() {
		List<User> users = userRepo.findAll();
		logger.info("Users: {}", users);
		return users;
	}

	/**
	 * Get librarian by the librarian id
	 * @param librarianId the library branch id
	 * @return {@link Librarian} object
	 */
	public Librarian getLibrarianById(Long librarianId) {
		Librarian librarian = (Librarian) getObjectFromOptional(librarianRepo.findById(librarianId));
		logger.info("Librarian with id {}: {}", librarianId, librarian);
		return librarian;
	}

	/**
	 * Get user by the user's name
	 * @param librarianName the library branch name
	 * @return {@link List} of {@link User} objects with same or similar name
	 */
	public List<Librarian> getLibrariansByName(String librarianName) {
		List<Librarian> librarians = librarianRepo.findByNameContaining(librarianName);
		logger.info("Librarians: {}", librarians);
		return librarians;
	}

	/**
	 * Get all librarians
	 * @return {@link List} of {@link Librarian} objects
	 */
	public List<Librarian> getAllLibrarians() {
		List<Librarian> librarians = librarianRepo.findAll();
		logger.info("Librarians: {}", librarians);
		return librarians;
	}

	/**
	 * Get all Library Branches
	 * @return {@link List} of {@link LibraryBranch} objects
	 */
	public List<LibraryBranch> getAllBranches(){
		List<LibraryBranch> branches = libraryBranchRepo.findAll();
		logger.info("Library Branches: {}", branches);
		return branches;
	}

	/**
	 * Get library branch by the library branch id
	 * @param branchId the library branch id
	 * @return {@link LibraryBranch} object
	 */
	public LibraryBranch getBranchById(Long branchId) {
		LibraryBranch libraryBranch = (LibraryBranch) getObjectFromOptional(libraryBranchRepo.findById(branchId));
		logger.info("Librarian with id {}: {}", branchId, libraryBranch);
		return libraryBranch;
	}

	/**
	 * Get library branch by the library branch name
	 * @param branchName the library branch name
	 * @return {@link LibraryBranch} object
	 */
	public LibraryBranch getBranchByName(String branchName) {
		LibraryBranch libraryBranch = libraryBranchRepo.findByNameContaining(branchName);
		logger.info("LibraryBranch with name {}: {}", branchName, libraryBranch);
		return libraryBranch;
	}

	/**
	 * Get user's loan records by their user id
	 * @param userId the user's id
	 * @return {@link List} of {@link LoanRecord} objects
	 */
	public List<LoanRecord> getLoanRecordsForUser(Long userId){
		List<LoanRecord> records = loanRecordRepo.findByUserId(userId);
		logger.info("Loan Records for user {}: {}", userId, records);
		return records;
	}

	/**
	 * Get user's loan records by the branch id
	 * @param branchId the library branch id
	 * @return {@link List} of {@link LoanRecord} objects
	 */
	public List<LoanRecord> getLoanRecordsForBranch(Long branchId){
		List<LoanRecord> records = loanRecordRepo.findByLibraryBranchId(branchId);
		logger.info("Loan Records for library branch {}: {}", branchId, records);
		return records;
	}

	/**
	 * Get all loan records
	 *
	 * @return List of {@link com.harrisburgu.lms.entity.LoanRecord} objects
	 */
	public List<LoanRecord> getAllLoanRecords() {
		List<LoanRecord> records = loanRecordRepo.findAll();
		logger.info("Loan Records: {}", records);
		return records;
	}
	
	/**
	 * Get number of copies of books a library has
	 * @param branchId the library branch id
	 * @param bookId the book id
	 * @return {@link Integer} number of books
	 */
	public Integer getBookCopiesForBranch(Long branchId, Long bookId){
		BookCopy records = bookCopyRepo.findByLibraryBranchIdAndBookId(branchId, bookId);
		logger.info("Library Branch with id {} has {} Copies of Book id {}", branchId, records.getNoOfCopies(), bookId);
		return records.getNoOfCopies();
	}

	public List<Book> getAllBooksForBranch(LibraryBranch branch) {
		return bookRepo.findAllBookForBranch(branch.getId());
	}

	public LoanRecord getloanRecord(LoanRecord loanRecord) {
		return loanRecordRepo.findByLoanRecordKeys(loanRecord.getUserId(), loanRecord.getLibraryBranchId(), 
				loanRecord.getBookId(), loanRecord.getLoanDate());
	}
}
