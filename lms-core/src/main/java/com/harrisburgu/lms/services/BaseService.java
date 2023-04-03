package com.harrisburgu.lms.services;

import com.harrisburgu.lms.dao.AccessLevelRepository;
import com.harrisburgu.lms.dao.AuthorRepository;
import com.harrisburgu.lms.dao.BookAuthorRepository;
import com.harrisburgu.lms.dao.BookCopyRepository;
import com.harrisburgu.lms.dao.BookGenreRepository;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public abstract class BaseService {

	@Autowired
	protected AccessLevelRepository accessLevelRepo;
	@Autowired
	protected AuthorRepository authorRepo;
	@Autowired
	protected BookAuthorRepository bookAuthorRepo;
	@Autowired
	protected BookCopyRepository bookCopyRepo;
	@Autowired
	protected BookGenreRepository bookGenreRepo;
	@Autowired
	protected BookRepository bookRepo;
	@Autowired
	protected GenreRepository genreRepo;
	@Autowired
	protected LibrarianRepository librarianRepo;
	@Autowired
	protected LibraryBranchRepository libraryBranchRepo;
	@Autowired
	protected LoanRecordRepository loanRecordRepo;
	@Autowired
	protected PublisherRepository publisherRepo;
	@Autowired
	protected UserRepository userRepo;

	/**
	 * Get a declared {@link com.harrisburgu.lms.entity Entity} from {@link java.util.Optional}
	 * @param optional
	 * @return an {@link com.harrisburgu.lms.entity Entity}
	 */
	public Object getObjectFromOptional(Optional optional) {
		return optional.isPresent() ? optional.get() : null;
	}
}
