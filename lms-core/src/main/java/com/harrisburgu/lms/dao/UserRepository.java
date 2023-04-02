package com.harrisburgu.lms.dao;

import com.harrisburgu.lms.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
	User findByNameContaining(String userName);
}
