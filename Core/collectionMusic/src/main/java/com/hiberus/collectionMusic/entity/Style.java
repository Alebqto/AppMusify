package com.hiberus.collectionMusic.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */
@Entity
@Table(name="STYLE")
public class Style {
 
	
 @Id
 @GeneratedValue(strategy= GenerationType.IDENTITY)
 private Long id;
 @Column(name="STYLE_NAME")
 private String name;
 
 @ManyToMany(targetEntity=Artist.class,mappedBy = "styles", cascade = CascadeType.ALL)
 @JsonBackReference
 private List<Artist> artists;

 public Style(){}
	
 public Style(String name){
     this.name = name;  
 }
 
 public Long getId() {
  return id;
 }

 public void setId(Long id) {
  this.id = id;
 }

 public String getName() {
  return name;
 }

 public void setName(String name) {
  this.name = name;
 }

 
 public List<Artist> getArtists() {
     return artists;
 }

 public void setArtists(List<Artist> artists) {
     this.artists = artists;
 }
 
}
