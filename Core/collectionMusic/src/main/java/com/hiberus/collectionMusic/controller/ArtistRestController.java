package com.hiberus.collectionMusic.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hiberus.collectionMusic.entity.Artist;
import com.hiberus.collectionMusic.entity.People;
import com.hiberus.collectionMusic.entity.Style;
import com.hiberus.collectionMusic.service.ArtistService;
import com.hiberus.collectionMusic.service.StyleService;


/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class ArtistRestController {
 
 @Autowired
 private ArtistService artistService;
 @Autowired
 private StyleService styleService;
 
 public void setArtistService(ArtistService artistService) {
  this.artistService = artistService;
 }
 
 public void setStyleService(StyleService styleService) {
	  this.styleService = styleService;
	 }
 
 @GetMapping("/api/artists")
 public List<Artist> getArtists() {
  List<Artist> artists = artistService.retrieveArtists();
  
  return artists;
 }
 
 @GetMapping("/api/artists/{artistId}")
 public Artist getArtist(@PathVariable(name="artistId")Long artistId) {
  return artistService.getArtist(artistId);
 }
 
 @GetMapping("/api/artistRelated/{artistId}")
 public Set<Artist> getArtistRelated(@PathVariable(name="artistId")Long artistId) {
	Artist artist =  artistService.getArtist(artistId);
  return (Set<Artist>) artist.getArtistRelated();
 }
 
 @GetMapping("/api/artistByStyle/{styleId}")
 public List<Artist> artistByStyle(@PathVariable(name="styleId")Long styleId) {
	Style style =  styleService.getStyle(styleId);
	List<Artist> artists = artistService.retrieveArtists();
	List<Artist> artistsByStyle = new ArrayList<Artist>();
	 for (Artist artistAUX :   artists) {
		 if(artistAUX.getStyles().contains(style)){
			 artistsByStyle.add(artistAUX);
		 }
}
  return artistsByStyle;
 }
 
 @PostMapping("/api/artists")
 public void saveArtist(Artist artist){
	 artistService.saveArtist(artist);
  System.out.println("artist Saved Successfully");
 }
 
 @DeleteMapping("/api/artists/{artistId}")
 public void deleteArtist(@PathVariable(name="artistId")Long artistId){
artistService.deleteArtist(artistId);
  System.out.println("artist Deleted Successfully");
 }
 
 @PutMapping("/api/artists/{artistId}")
 public void updateArtist(@RequestBody Artist artist,
   @PathVariable(name="artistId")Long artistId){
	 Artist art = artistService.getArtist(artistId);
  if(art != null){
	  art.setName(artist.getName());
	  art.setYear(artist.getYear());
	  artistService.updateArtist(art);
  }
  
 }
 
 @PostMapping("/api/addPeoples/{artistId}")
 public void addPeoples(@PathVariable(name="artistId")Long artistId, @RequestBody List<People>  peoples) {
	 Artist artist =  artistService.getArtist(artistId);
	 for (People people :   peoples) {
        people.setArtist(artist);
}

	artist.getMembers().addAll(peoples);
	artistService.updateArtist(artist);	
 }
 
 @PostMapping("/api/addArtistRelated/{artistId}")
 public void addArtistRelated(@PathVariable(name="artistId")Long artistId, @RequestBody List<Artist>  artists) {
	 Artist artist =  artistService.getArtist(artistId);
	 for (Artist artistReated :   artists) {
		 Artist artistAUX =  artistService.getArtist(artistReated.getId());
        artist.getArtistRelated().add(artistAUX);
}
	artistService.updateArtist(artist);	
 }
 
 @PostMapping("/api/removeArtistRelated/{artistId}")
 public void removeArtistRelated(@PathVariable(name="artistId")Long artistId, @RequestBody List<Artist>  artists) {
	 Artist artist =  artistService.getArtist(artistId);
	 for (Artist artistReated :   artists) {
		 Artist artistAUX =  artistService.getArtist(artistReated.getId());
        artist.getArtistRelated().remove(artistAUX);
}
	artistService.updateArtist(artist);	
 }
 
 @PostMapping("/api/addStylesArtist/{artistId}")
 public void addStylesArtist(@PathVariable(name="artistId")Long artistId, @RequestBody List<Style>  styles) {
	 Artist artist =  artistService.getArtist(artistId);
	artist.getStyles().addAll(styles);
	artistService.updateArtist(artist);	
 }
 
 @PostMapping("/api/removeStylesArtist/{artistId}")
 public void removeStylesArtist(@PathVariable(name="artistId")Long artistId, @RequestBody List<Style>  styles) {
	 Artist artist =  artistService.getArtist(artistId);
	 for (Style styleArtist :   styles) {
		 Style styleAUX =  styleService.getStyle(styleArtist.getId());
        artist.getStyles().remove(styleAUX);
}
	artistService.updateArtist(artist);	
 }
 
 

}
