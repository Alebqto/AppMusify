package com.hiberus.collectionMusic.service;

import java.util.List;

import com.hiberus.collectionMusic.entity.Style;

/**
 * @author AlejandroDavidSalazar@gmail.com
 *
 */
public interface StyleService {
 public List<Style> retrieveStyles();
 
 public Style getStyle(Long styleId);
 
 public void saveStyle(Style styles);
 
 public void deleteStyle(Long styleId);
 
 public void updateStyle(Style styles);
 
}
