package com.harrisburgu.lms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Entity
@IdClass(BookCopyId.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Builder
public class BookCopy {
    
    @Id
    private Long libraryBranchId;
    @Id
    private Long bookId;
    private Integer noOfCopies;
}

@EqualsAndHashCode
class BookCopyId implements Serializable {
    private Long libraryBranchId;
    private Long bookId;
}
