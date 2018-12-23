package com.hiberus.collectionMusic.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */

@Entity
@Table(name="ARTIST")
public class Artist {
 

 private Long id;
 private String name;
 private int year;
 private  List<Style> styles;
 private  List<People> members = new ArrayList <People>();
 private  Set<Artist> artists = new HashSet<Artist>();
 private Set<Artist> artistRelated = new HashSet<Artist>();
 

 
 public Artist(){}
 
 public Artist(String name, int year, List<Style> styles, List<People> members, Set<Artist> artistRelated, Set<Artist> artists){
     this.name = name;  
     this.year = year;
     this.styles = styles;
     this.members = members;
     this.artistRelated = artistRelated;
     this.artists = artists;
 }
 

 @Id
 @GeneratedValue(strategy= GenerationType.IDENTITY)
 public Long getId() {
  return id;
 }

 public void setId(Long id) {
  this.id = id;
 }
 
 @Column(name="ARTIST_NAME")
 public String getName() {
  return name;
 }

 public void setName(String name) {
  this.name = name;
 }
 
 @Column(name="ARTIST_YEAR")
 public int getYear() {
  return year;
 }

 public void setYear(int year) {
  this.year = year;
 }
 
 
 @ManyToMany(fetch = FetchType.LAZY,
         cascade = {
             CascadeType.PERSIST,
             CascadeType.MERGE
         })
 @JoinTable(name = "artist_style",
         joinColumns = { @JoinColumn(name = "artist_id") },
         inverseJoinColumns = { @JoinColumn(name = "style_id") })
// @JsonManagedReference
 public List<Style> getStyles() {
  return styles;
 }

 public void setStyles(List<Style> styles) {
  this.styles = styles;
 }
 
 
 @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL)
 public List<People> getMembers() {
	  return members;
	 }

	 public void setMembers(List<People> members) {
	  this.members =  members;
	 }
	 
	 
	 @ManyToMany(cascade={CascadeType.ALL})
		@JoinTable(name="ARTIST_RELATED",
			joinColumns={@JoinColumn(name="ARTIST_ID")},
			inverseJoinColumns={@JoinColumn(name="ARTIST_RELATED_ID")})
	 @JsonIgnore
	 public Set<Artist> getArtistRelated() {
		  return artistRelated;
		 }
	
		 public void setArtistRelated(Set<Artist> artistRelated) {
		  this.artistRelated = artistRelated;
		 }
	 
	 
		@ManyToMany(mappedBy="artistRelated")
		@JsonIgnore
		public Set<Artist> getArtists() {
			  return artists;
			 }
		
			 public void setArtists(Set<Artist> artists) {
			  this.artists = artists;
			 }
	 

}