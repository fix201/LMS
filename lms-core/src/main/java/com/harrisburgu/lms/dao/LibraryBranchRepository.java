package com.harrisburgu.lms.dao;

import com.harrisburgu.lms.entity.LibraryBranch;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface LibraryBranchRepository extends JpaRepository<LibraryBranch, Long> {
	LibraryBranch findByNameContaining(String branchName);
}
