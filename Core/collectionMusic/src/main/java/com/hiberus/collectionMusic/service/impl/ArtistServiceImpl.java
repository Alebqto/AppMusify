package com.hiberus.collectionMusic.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hiberus.collectionMusic.entity.Artist;
import com.hiberus.collectionMusic.repository.ArtistRepository;
import com.hiberus.collectionMusic.service.ArtistService;

/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */
@Service
public class ArtistServiceImpl implements ArtistService{

 @Autowired
 private ArtistRepository artistRepository;

 public void setArtistRepository(ArtistRepository artistRepository) {
  this.artistRepository = artistRepository;
 }
 
 public List<Artist> retrieveArtists() {
  List<Artist> artists = artistRepository.findAll();
  return artists;
 }
 
 public Artist getArtist(Long artistId) {
  Optional<Artist> optProd = artistRepository.findById(artistId);
  return optProd.get();
 }
 
 public void saveArtist(Artist artist){
	 artistRepository.save(artist);
 }
 
 public void deleteArtist(Long artistId){
	 artistRepository.deleteById(artistId);
 }
 
 public void updateArtist(Artist artist) {
	 artistRepository.save(artist);
 }
 

}