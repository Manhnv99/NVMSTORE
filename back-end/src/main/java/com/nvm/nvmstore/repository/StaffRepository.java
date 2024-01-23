package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Staff;
import com.nvm.nvmstore.response.staff.StaffResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Long> {

    @Query(value="""
            select new com.nvm.nvmstore.response.staff.StaffResponse(s.id,s.name,s.cccd,s.image_url,s.phone,s.birthday,s.gender,s.status)
            from Staff s order by s.id desc
            """)
    List<StaffResponse> getAll(Pageable pageable);

    @Query("""
           select s from Staff s where s.id=:id
            """)
    Staff getStaffById(Long id);


    @Query(value = """
            select count(*) from staff
            """,nativeQuery = true)
    Integer getTotalPageStaff();


    @Query("""
            select new com.nvm.nvmstore.response.staff.StaffResponse(s.id,s.name,s.cccd,s.image_url,s.phone,s.birthday,s.gender,s.status)
            from Staff s where
            (
            (:input is null or s.name like %:input%) or
            (:input is null or s.cccd like %:input%) or
            (:input is null or s.phone like %:input%) )and
            (:status is null or s.status=:status)
            """)
    List<StaffResponse> searchStaff(String input,Boolean status,Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.response.staff.StaffResponse(s.id,s.name,s.cccd,s.image_url,s.phone,s.birthday,s.gender,s.status)
            from Staff s where
            (
            (:input is null or s.name like %:input%) or
            (:input is null or s.cccd like %:input%) or
            (:input is null or s.phone like %:input%) )and
            (:status is null or s.status=:status)
            order by s.id desc
            """)
    List<StaffResponse> getTotalPageSearch(String input,Boolean status);


    @Query(value = """
            select * from staff order by staff.id desc limit 1
            """,nativeQuery = true)
    Staff getNewest();


    @Query(value = """
            select * from staff where staff.cccd=:cccd limit 1
            """,nativeQuery = true)
    Staff getByCCCD(String cccd);

    @Query(value = """
            select * from staff where staff.phone=:phone limit 1
            """,nativeQuery = true)
    Staff getByPhone(String phone);

    @Query(value = """
            select * from staff where staff.email=:email limit 1
            """,nativeQuery = true)
    Staff getByEmail(String email);


}
