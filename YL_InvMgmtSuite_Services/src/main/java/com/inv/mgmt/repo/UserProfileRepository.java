package com.inv.mgmt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.inv.mgmt.model.UserProfile;


@Repository
public interface UserProfileRepository extends CrudRepository<UserProfile, Long> {

	Optional<UserProfile> findByEmail(String email);
	
}
