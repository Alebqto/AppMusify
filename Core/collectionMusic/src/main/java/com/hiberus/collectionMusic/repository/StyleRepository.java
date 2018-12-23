package com.hiberus.collectionMusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hiberus.collectionMusic.entity.Style;

@Repository
public interface StyleRepository extends JpaRepository<Style,Long>{

}