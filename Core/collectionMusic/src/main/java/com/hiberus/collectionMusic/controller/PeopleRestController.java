package com.hiberus.collectionMusic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hiberus.collectionMusic.entity.People;
import com.hiberus.collectionMusic.service.PeopleService;


/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class PeopleRestController {
 
 @Autowired
 private PeopleService peopleService;
 
 public void setPeopleService(PeopleService peopleService) {
  this.peopleService = peopleService;
 }

 @GetMapping("/api/peoples")
 public List<People> getPeoples() {
  List<People> peoples = peopleService.retrievePeoples();
  return peoples;
 }
 
 @GetMapping("/api/peoplesAvailable")
 public List<People> getPeoplesByArtist() {
  return peopleService.findPeoplesByArtistIdIsNull();
 }
 
 @GetMapping("/api/peoples/{peopleId}")
 public People getPeople(@PathVariable(name="peopleId")Long peopleId) {
  return peopleService.getPeople(peopleId);
 }
 

 
 @PostMapping("/api/peoples")
 public void savePeople(People people){
	 peopleService.savePeople(people);
  System.out.println("people Saved Successfully");
 }
 
 @DeleteMapping("/api/peoples/{peopleId}")
 public void deletePeople(@PathVariable(name="peopleId")Long peopleId){
peopleService.deletePeople(peopleId);
  System.out.println("people Deleted Successfully");
 }
 
 @PutMapping("/api/peoples/{peopleId}")
 public void updatePeople(@RequestBody People people,
   @PathVariable(name="peopleId")Long peopleId){
	 People art = peopleService.getPeople(peopleId);
  if(art != null){
	  art.setName(people.getName());
	  art.setYears(people.getYears());
	  peopleService.updatePeople(art);
  }
  
 }
 
 @PostMapping("/api/removePeoplesRelated")
 public void removePeoples(@RequestBody List<People>  peoples) {
	 for (People people :   peoples) {
		 People peopleAux =  peopleService.getPeople(people.getId());
		 peopleAux.setArtist(null);
		 peopleService.updatePeople(peopleAux);
	
 }

 }


}
