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

import com.hiberus.collectionMusic.entity.Style;
import com.hiberus.collectionMusic.service.StyleService;


/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class StyleRestController {
 
 @Autowired
 private StyleService styleService;
 
 public void setStyleService(StyleService styleService) {
  this.styleService = styleService;
 }

 @GetMapping("/api/styles")
 public List<Style> getStyles() {
  List<Style> styles = styleService.retrieveStyles();
  
  return styles;
 }
 
 @GetMapping("/api/styles/{styletId}")
 public Style getArtist(@PathVariable(name="styletId")Long styletId) {
  return styleService.getStyle(styletId);
 }
 

 @PostMapping("/api/style")
 public void saveStyle(Style style){
	 styleService.saveStyle(style);
  System.out.println("style Saved Successfully");
 }
 
 @DeleteMapping("/api/style/{styleId}")
 public void deleteArtist(@PathVariable(name="style")Long style){
	 styleService.deleteStyle(style);
  System.out.println("artist Deleted Successfully");
 }
 
 @PutMapping("/api/style/{styleId}")
 public void updateStyle(@RequestBody Style style,
   @PathVariable(name="styleId")Long styleId){
	 Style sty = styleService.getStyle(styleId);
  if(sty != null){
	  styleService.updateStyle(style);
  }
  
 }
 


}
