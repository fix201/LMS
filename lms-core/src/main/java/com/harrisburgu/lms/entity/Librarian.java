package com.harrisburgu.lms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Builder
public class Librarian {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String  name;
    private String phone;
    private String email;
    private String address;
    private String ssn;
    private String emergencyContact;
    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private LibraryBranch libraryBranch;
    @ManyToOne
    @JoinColumn(name = "access_level")
    @EqualsAndHashCode.Exclude
    private AccessLevel accessLevel;
}
