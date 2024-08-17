package com.ecommerceportfolio.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerceportfolio.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStoreId(Long storeId);

    @Query("SELECT p FROM Product p WHERE " +
            "(:textfilter IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :textfilter,'%'))) AND " +
            "(:categories IS NULL OR p.category IN :categories)")
    Page<Product> findByTextFilterAndCategories(
            @Param("textfilter") String textfilter,
            @Param("categories") List<String> categories,
            Pageable pageable);
}
