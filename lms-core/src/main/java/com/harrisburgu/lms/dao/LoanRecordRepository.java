package com.harrisburgu.lms.dao;

import com.harrisburgu.lms.entity.LoanRecord;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@Transactional
public interface LoanRecordRepository extends JpaRepository<LoanRecord, Long> {
	
	List<LoanRecord> findByUserId(Long userId);
	List<LoanRecord> findByLibraryBranchId(Long branchId);
	
	@Query("select lr from LoanRecord lr where lr.userId = :userId and " +
			"lr.libraryBranchId = :libraryBranchId and lr.bookId = :bookId and " +
			"lr.loanDate = :loanDate")
	LoanRecord findByLoanRecordKeys(@Param("userId") Long userId, 
								 @Param("libraryBranchId") Long libraryBranch, 
								 @Param("bookId") Long bookId,
								 @Param("loanDate") LocalDateTime loanDate);

}
