package com.harrisburgu.lms.services;

import com.harrisburgu.lms.entity.AccessLevel;
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

@Service
public class CreateUpdateService extends BaseService {

	private final Logger logger = LoggerFactory.getLogger(CreateUpdateService.class);

	/**
	 * Creates a new book if it doesn't exist or Updates existing book
	 * @param book {@link Book} object
	 * @return Newly created or updated {@link Book} object
	 */
	public Book saveBook(Book book) {
		Book tempBook;

		if (book.getId() != null && bookRepo.existsById(book.getId())) {
			tempBook = (Book) getObjectFromOptional(bookRepo.findById(book.getId()));
			CopyUtil.copyProperties(book, tempBook);
			logger.info("Updating Book: {} to {}", tempBook, book);
		} else {
			tempBook = book;
			logger.info("Adding Book: {}", tempBook);
		}
		
		return bookRepo.save(tempBook);
	}

	/**
	 * Creates a new author if it doesn't exist or Updates existing author
	 * @param author {@link Author} object
	 * @return Newly created or updated {@link Author} object
	 */
	public Author saveAuthor(Author author) {
		Author tempAuthor;

		if (author.getId() != null && authorRepo.existsById(author.getId())) {
			tempAuthor = (Author) getObjectFromOptional(authorRepo.findById(author.getId()));
			CopyUtil.copyProperties(author, tempAuthor);
			logger.info("Updating Author: {} to {}", tempAuthor, author);
		} else {
			tempAuthor = author;
			logger.info("Adding Author: {}", tempAuthor);
		}

		return authorRepo.save(tempAuthor);
	}

	/**
	 * Creates a new genre if it doesn't exist or Updates existing genre
	 * @param genre {@link Genre} object
	 * @return Newly created or updated {@link Genre} object
	 */
	public Genre saveGenre(Genre genre) {
		Genre tempGenre;

		if (genre.getGenreId() != null && genreRepo.existsById(genre.getGenreId())) {
			tempGenre = (Genre) getObjectFromOptional(genreRepo.findById(genre.getGenreId()));
			CopyUtil.copyProperties(genre, tempGenre);
			logger.info("Updating Genre: {} to {}", tempGenre, genre);
		} else {
			tempGenre = genre;
			logger.info("Adding Genre: {}", tempGenre);
		}

		return genreRepo.save(tempGenre);
	}

	/**
	 * Creates a new publisher if it doesn't exist or Updates existing publisher
	 * @param publisher {@link Publisher} object
	 * @return Newly created or updated {@link Publisher} object
	 */
	public Publisher savePublisher(Publisher publisher) {
		Publisher tempPublisher;

		if (publisher.getId() != null && publisherRepo.existsById(publisher.getId())) {
			tempPublisher = (Publisher) getObjectFromOptional(publisherRepo.findById(publisher.getId()));
			CopyUtil.copyProperties(publisher, tempPublisher);
			logger.info("Updating Publisher: {} to {}", tempPublisher, publisher);
		} else {
			tempPublisher = publisher;
			logger.info("Adding Publisher: {}", tempPublisher);
		}

		return publisherRepo.save(tempPublisher);
	}

	/**
	 * Creates a new librarian if it doesn't exist or Updates existing librarian
	 * @param librarian {@link Librarian} object
	 * @return Newly created or updated {@link Librarian} object
	 */
	public Librarian saveLibrarian(Librarian librarian) {
		Librarian tempLibrarian;
		
		// set librarian access level to default
		if(librarian.getAccessLevel() == null) {
			AccessLevel accessLevel = new AccessLevel();
			accessLevel.setId(1L);
			librarian.setAccessLevel(accessLevel);
		}
		
		if (librarian.getId() != null && librarianRepo.existsById(librarian.getId())) {
			tempLibrarian = (Librarian) getObjectFromOptional(librarianRepo.findById(librarian.getId()));
			CopyUtil.copyProperties(librarian, tempLibrarian);
			logger.info("Updating Librarian: {} to {}", tempLibrarian, librarian);
		} else {
			tempLibrarian = librarian;
			logger.info("Adding Librarian: {}", tempLibrarian);
		}

		return librarianRepo.save(tempLibrarian);
	}

	/**
	 * Creates a new libraryBranch if it doesn't exist or Updates existing libraryBranch
	 * @param libraryBranch {@link LibraryBranch} object
	 * @return Newly created or updated {@link LibraryBranch} object
	 */
	public LibraryBranch saveLibraryBranch(LibraryBranch libraryBranch) {
		LibraryBranch tempLibraryBranch;

		if (libraryBranch.getId() != null && libraryBranchRepo.existsById(libraryBranch.getId())) {
			tempLibraryBranch = (LibraryBranch) getObjectFromOptional(libraryBranchRepo.findById(libraryBranch.getId()));
			CopyUtil.copyProperties(libraryBranch, tempLibraryBranch);
			logger.info("Updating Library Branch: {} to {}", tempLibraryBranch, libraryBranch);
		} else {
			tempLibraryBranch = libraryBranch;
			logger.info("Adding Library Branch: {}", tempLibraryBranch);
		}

		return libraryBranchRepo.save(tempLibraryBranch);
	}

	/**
	 * Creates a new user if it doesn't exist or Updates existing user
	 * @param user {@link User} object
	 * @return Newly created or updated {@link User} object
	 */
	public User saveUser(User user) {
		User tempUser;

		if (user.getId() != null && userRepo.existsById(user.getId())) {
			tempUser = (User) getObjectFromOptional(userRepo.findById(user.getId()));
			CopyUtil.copyProperties(user, tempUser);
			logger.info("Updating User: {} to {}", tempUser, user);
		} else {
			tempUser = user;
			logger.info("Adding User: {}", tempUser);
		}

		return userRepo.save(tempUser);
	}

	/**
	 * Adds a book to a library branch or updates the branch's book copies
	 * @param bookCopy {@link BookCopy} object
	 * @return {@link BookCopy} object if operation completed successfully
	 */
	public BookCopy addBookToBranch(BookCopy bookCopy) {
		return bookCopyRepo.save(bookCopy);
	}
	
	/**
	 * Overrides an existing loan record with the provided loan record, 
	 * setting the due date to 8 days after the loan date if it is not already set.
	 *
	 * @param loanRecord the {@link LoanRecord} object to override the existing loan record with
	 * @return the updated {@link LoanRecord} object that has been saved to the database
	 */
	public LoanRecord overrideLoanRecord(LoanRecord loanRecord) {
		LoanRecord tempLoanRecord = null;
		
		if (loanRecord.getDueDate() == null) {
			loanRecord.setDueDate(loanRecord.getLoanDate().plusDays(8));
			logger.info("Setting Due Date: {}", loanRecord.getLoanDate());
		}
		
		tempLoanRecord = loanRecordRepo.findByLoanRecordKeys(loanRecord.getUserId(), loanRecord.getLibraryBranchId(), 
				loanRecord.getBookId(), loanRecord.getLoanDate());
		
		if(tempLoanRecord != null) {
			CopyUtil.copyProperties(loanRecord, tempLoanRecord);
		}
		
		tempLoanRecord = loanRecordRepo.save(loanRecord);
		
		return tempLoanRecord;
	}

}
