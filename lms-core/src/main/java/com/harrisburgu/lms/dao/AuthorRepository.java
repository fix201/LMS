package com.harrisburgu.lms.dao;

import com.harrisburgu.lms.entity.Author;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface AuthorRepository extends JpaRepository<Author, Long> {
	
	@Query("select a from Author a where a.name like %:name%")
	List<Author> findAuthorByName(@Param("name") String name);
}
