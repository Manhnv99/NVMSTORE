package com.nvm.nvmstore.core.customer.repository;

import com.nvm.nvmstore.core.customer.model.response.ListCustomerResponse;
import com.nvm.nvmstore.entity.Customer;
import com.nvm.nvmstore.repository.CustomerRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBCustomerRepository extends CustomerRepository {

    @Query(value = """
            SELECT * FROM customer c ORDER BY c.id DESC LIMIT 1
            """,nativeQuery = true)
    Customer getNewest();

    @Query(value = """
            SELECT * FROM customer c WHERE c.phone = :phone
            """,nativeQuery = true)
    Customer getByPhone(String phone);

    @Query(value = """
            SELECT * FROM customer c WHERE c.email = :email
            """,nativeQuery = true)
    Customer getByEmail(String email);


    @Query(value = """
            SELECT  c.id AS id,
                    c.name AS name,
                    c.phone AS phone,
                    c.email AS email,
                    c.point AS point,
                    c.status AS status
            FROM customer c WHERE c.id = :id
            """,nativeQuery = true)
    ListCustomerResponse getCustomerById(Long id);

    @Query(value = """
            SELECT
            c.id AS id,
            c.name AS name,
            c.phone AS phone,
            c.email AS email,
            c.point AS point,
            c.status AS status
            FROM customer c WHERE BINARY name != "Khách Lẻ" ORDER BY c.id desc
            """,nativeQuery = true)
    List<ListCustomerResponse> listCustomerPaging(Pageable pageable);


    @Query(value = """
            SELECT COUNT(*)
            FROM customer c WHERE BINARY name != "Khách Lẻ"
            """,nativeQuery = true)
    Double totalPageListCustomerPaging();


    @Query(value = """
            SELECT  c.id AS id,
                    c.name AS name,
            	    c.phone AS phone,
            	    c.email AS email,
            	    c.point AS point,
            	    c.status AS status
            	    FROM customer c WHERE BINARY name != "Khách Lẻ" AND
            	    (c.name LIKE CONCAT("%",IFNULL(NULLIF(:input,""),c.name),"%") OR
                    c.phone LIKE CONCAT("%",IFNULL(NULLIF(:input,""),c.phone),"%") OR
                    c.email LIKE CONCAT("%",IFNULL(NULLIF(:input,""),c.email),"%"))
            """,nativeQuery = true)
    List<ListCustomerResponse> listSearchCustomerPaging(String input,Pageable pageable);


    @Query(value = """
            SELECT  COUNT(*)
                    FROM customer c WHERE BINARY name != "Khách Lẻ" AND
                    (c.name LIKE CONCAT("%",IFNULL(NULLIF(:input,""),c.name),"%") OR
                    c.phone LIKE CONCAT("%",IFNULL(NULLIF(:input,""),c.phone),"%") OR
                    c.email LIKE CONCAT("%",IFNULL(NULLIF(:input,""),c.email),"%"))
            """,nativeQuery = true)
    Double totalPageSearchListCustomerPaging(String input);
}
