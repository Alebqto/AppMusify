package com.hiberus.collectionMusic.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hiberus.collectionMusic.entity.People;
import com.hiberus.collectionMusic.repository.PeopleRepository;
import com.hiberus.collectionMusic.service.PeopleService;

/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */
@Service
public class PeopleServiceImpl implements PeopleService{

 @Autowired
 private PeopleRepository peopleRepository;

 public void setPeopleRepository(PeopleRepository peopleRepository) {
  this.peopleRepository = peopleRepository;
 }
 
 public List<People> retrievePeoples() {
  List<People> peoples = peopleRepository.findAll();
  return peoples;
 }
 
 public List<People> findPeoplesByArtistIdIsNull() {
	  List<People> peoplesNotRelated = peopleRepository.findPeoplesByArtistIdIsNull();
	  return peoplesNotRelated;
	 }
 
 public People getPeople(Long peopleId) {
  Optional<People> optPeople = peopleRepository.findById(peopleId);
  return optPeople.get();
 }
 
 public void savePeople(People people){
	peopleRepository.save(people);
 }
 
 public void deletePeople(Long peopleId){
	 peopleRepository.deleteById(peopleId);
 }
 
 public void updatePeople(People people) {
	 peopleRepository.save(people);
 }


 

}