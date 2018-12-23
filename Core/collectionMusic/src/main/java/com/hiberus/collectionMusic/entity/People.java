package com.hiberus.collectionMusic.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */

@Entity
@Table(name="PEOPLE")
public class People {
 
	
 private Long id;
 private String name;
 private int years;
 private Artist artist;
 
 public People(){}
 
 public People(String name, int years, Artist artist){
     this.name = name;  
     this.years = years;
     this.artist = artist;
 }
 
 @Id
 @GeneratedValue(strategy= GenerationType.IDENTITY)
 public Long getId() {
  return id;
 }

 public void setId(Long id) {
  this.id = id;
 }
 
 @Column(name="PEOPLE_NAME")
 public String getName() {
  return name;
 }

 public void setName(String name) {
  this.name = name;
 }
 
 @Column(name="PEOPLE_YEARS")
 public int getYears() {
  return years;
 }

 public void setYears(int years) {
  this.years = years;
 }


 
 @ManyToOne(fetch = FetchType.LAZY, optional = true)
 @JoinColumn(name = "artist_id", nullable = true)
 @OnDelete(action = OnDeleteAction.CASCADE)
 @JsonBackReference
 public Artist getArtist() {
     return artist;
 }

 public void setArtist(Artist artist) {
     this.artist = artist;
 }
 
}
