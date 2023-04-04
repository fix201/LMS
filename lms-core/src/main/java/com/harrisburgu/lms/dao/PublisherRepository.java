package com.harrisburgu.lms.dao;

import com.harrisburgu.lms.entity.Publisher;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
	List<Publisher> findByNameContaining (String name);
}
