package com.nvm.nvmstore.repository.voucher;

import com.nvm.nvmstore.entity.Voucher;
import com.nvm.nvmstore.response.voucher.GetAllVoucherResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher,Long> {

    @Query(value = """
            SELECT * FROM voucher v WHERE v.name=:name
            """,nativeQuery = true)
    Optional<Voucher> findVoucherByName(String name);

    @Query(value = """
            SELECT * FROM voucher v ORDER BY v.id desc limit 1
            """,nativeQuery = true)
    Optional<Voucher> getNewestVoucher();

    @Query(value = """
            SELECT 	v.id AS id,
                    v.code AS code,
                    v.name AS name,
                    v.quantity AS quantity,
                    v.value AS value,
                    v.minimum_order AS minimum_Oder,
                    v.date_start AS date_Start,
                    v.date_end AS date_End,
                    v.updated_at AS updated_At,
                    v.status AS status
            FROM voucher v ORDER BY v.id DESC LIMIT :limit OFFSET :index
            """,nativeQuery = true)
    List<GetAllVoucherResponse> getAllVoucherPaging(Integer limit,Integer index);

    @Query(value = """
            select count(*) from voucher
            """,nativeQuery = true)
    Double getToTalPageVoucher();

    @Query(value = """
            SELECT 	v.id AS id,
                    v.code AS code,
                    v.name AS name,
                    v.quantity AS quantity,
                    v.value AS value,
                    v.minimum_order AS minimum_Oder,
                    v.date_start AS date_Start,
                    v.date_end AS date_End,
                    v.updated_at AS updated_At,
                    v.status AS status
            FROM voucher v
            WHERE
            v.code LIKE CONCAT ("%", (IFNULL(NULLIF(:code,""),v.code)) ,"%") AND
            v.quantity = (IFNULL(NULLIF(:quantity,""),v.quantity)) AND
            v.value = (IFNULL(NULLIF(:value,""),v.value)) AND
            v.status = (IFNULL(NULLIF(:status,""),v.status)) AND
            CASE
                WHEN :date_start IS NULL AND :date_end IS NULL THEN (v.date_start =v.date_start AND v.date_end = v.date_end)
                WHEN :date_start IS NOT NULL AND :date_end IS NOT NULL THEN (:date_start <= v.date_start AND :date_end >= v.date_end) 
                WHEN :date_start IS NOT NULL AND :date_end IS NULL THEN (v.date_start >= :date_start)
                WHEN :date_start IS NULL AND :date_end IS NOT NULL THEN (v.date_end <= :date_end)
            END
            LIMIT :limit OFFSET :index
            """,nativeQuery = true)
    List<GetAllVoucherResponse> searchVoucherPaging(String code, Integer quantity, BigDecimal value, Integer status,
                                                    String date_start, String date_end, Integer limit,Integer index);


    @Query(value = """
            SELECT COUNT(*)
            FROM voucher v
            Where
            v.code LIKE CONCAT ("%", (IFNULL(NULLIF(:code,""),v.code)) ,"%") AND
            v.quantity = (IFNULL(NULLIF(:quantity,""),v.quantity)) AND
            v.value = (IFNULL(NULLIF(:value,""),v.value)) AND
            v.status = (IFNULL(NULLIF(:status,""),v.status)) AND
            CASE
                WHEN :date_start IS NULL AND :date_end IS NULL THEN (v.date_start =v.date_start AND v.date_end = v.date_end)
                WHEN :date_start IS NOT NULL AND :date_end IS NOT NULL THEN (:date_start <= v.date_start AND :date_end >= v.date_end) 
                WHEN :date_start IS NOT NULL AND :date_end IS NULL THEN (v.date_start >= :date_start)
                WHEN :date_start IS NULL AND :date_end IS NOT NULL THEN (v.date_end <= :date_end)
            END
            """,nativeQuery = true)
    Double getToTalPageSearchVoucher(String code, Integer quantity, BigDecimal value, Integer status,
                                     String date_start, String date_end);
}
