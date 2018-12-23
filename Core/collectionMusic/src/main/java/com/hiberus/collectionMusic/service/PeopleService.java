package com.hiberus.collectionMusic.service;

import java.util.List;

import com.hiberus.collectionMusic.entity.People;

/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */
public interface PeopleService {
 public List<People> retrievePeoples();
 
 public List<People> findPeoplesByArtistIdIsNull();
 
 public People getPeople(Long peopleId);
 
 public void savePeople(People people);
 
 public void deletePeople(Long peopleId);
 
 public void updatePeople(People people);
 
}
