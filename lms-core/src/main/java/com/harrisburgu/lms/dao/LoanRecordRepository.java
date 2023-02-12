package com.harrisburgu.lms.dao;

import com.harrisburgu.lms.entity.LoanRecord;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface LoanRecordRepository extends JpaRepository<LoanRecord, Long> {
}
