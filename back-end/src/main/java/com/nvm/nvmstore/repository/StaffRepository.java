package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Staff;
import com.nvm.nvmstore.response.staff.StaffResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Long> {

    @Query(value="""
            select new com.nvm.nvmstore.response.staff.StaffResponse(s.name,s.cccd,s.image_url,s.phone,s.birthday,s.gender,s.status)
            from Staff s
            """)
    List<StaffResponse> getAll();

    @Query(value = """
            select * from staff order by staff.id desc limit 1
            """,nativeQuery = true)
    Staff getNewest();
}
