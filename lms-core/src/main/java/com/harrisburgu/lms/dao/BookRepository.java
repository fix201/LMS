package com.harrisburgu.lms.dao;

import com.harrisburgu.lms.entity.Book;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface BookRepository extends JpaRepository<Book, Long> {
	
	static String SELECT_BOOK_IN = "select b from Book b where b.id in ";
	
	@Query(SELECT_BOOK_IN + "(select ba.bookId from BookAuthor ba where ba.authorId = :authorId)")
	public List<Book> findBookByAuthorId(@Param("authorId") Long authorId);

	@Query(SELECT_BOOK_IN + "(select ba.bookId from BookAuthor ba where ba.authorId = :publisherId)")
	public List<Book> findBookByPublisherId(@Param("publisherId") Long publisherId);

	@Query(SELECT_BOOK_IN + "(select bg.bookId from BookGenre bg where bg.genreId = :genreId)")
	List<Book> findBookByGenreId(@Param("genreId") Long genreId);

	@Query("select b from Book b where b.title like %:title%")
	Book findBookByTitle(@Param("title") String title);

	@Query(SELECT_BOOK_IN + "(select bc.bookId from BookCopy bc where bc.libraryBranchId = :branchId)")
	List<Book> findAllBookForBranch(@Param("branchId") Long branchId);
}
