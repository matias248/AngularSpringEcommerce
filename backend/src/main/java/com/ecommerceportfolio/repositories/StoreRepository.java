package com.ecommerceportfolio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerceportfolio.entities.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    @Query("SELECT s FROM Store s WHERE :textfilter IS NULL OR " +
            "LOWER(s.name) LIKE LOWER(CONCAT('%', :textfilter, '%')) OR " +
            "LOWER(s.address.city) LIKE LOWER(CONCAT('%', :textfilter, '%')) OR " +
            "LOWER(s.address.zipCode) LIKE LOWER(CONCAT('%', :textfilter, '%'))")
    List<Store> findStoresByName(@Param("textfilter") String textfilter);

}