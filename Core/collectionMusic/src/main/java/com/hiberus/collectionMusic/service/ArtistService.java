package com.hiberus.collectionMusic.service;

import java.util.List;

import com.hiberus.collectionMusic.entity.Artist;

/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */
public interface ArtistService {
 
 public List<Artist> retrieveArtists();
 
 public Artist getArtist(Long artistId);
 
 public void saveArtist(Artist artist);
 
 public void deleteArtist(Long artistId);
 
 public void updateArtist(Artist artist);
 
}
