package com.hiberus.collectionMusic.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hiberus.collectionMusic.entity.Style;
import com.hiberus.collectionMusic.repository.StyleRepository;
import com.hiberus.collectionMusic.service.StyleService;

/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */
@Service
public class StyleServiceImpl implements StyleService{

 @Autowired
 private StyleRepository styleRepository;

 public void setArtistRepository(StyleRepository stylesRepository) {
  this.styleRepository = stylesRepository;
 }
 
 public List<Style> retrieveStyles() {
  List<Style> artists = styleRepository.findAll();
  return artists;
 }
 
 public Style getStyle(Long styleId) {
  Optional<Style> optProd = styleRepository.findById(styleId);
  return optProd.get();
 }
 
 public void saveStyle(Style style){
	 styleRepository.save(style);
 }
 
 public void deleteStyle(Long styleId){
	 styleRepository.deleteById(styleId);
 }
 
 public void updateStyle(Style style) {
	 styleRepository.save(style);
 }
 

}