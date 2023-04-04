package com.harrisburgu.lms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Entity
@IdClass(BookGenreId.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class BookGenre {

    @Id
    private Long bookId;
    @Id
    private Long genreId;
}

@EqualsAndHashCode
class BookGenreId implements Serializable {
    private Long bookId;
    private Long genreId;
}
