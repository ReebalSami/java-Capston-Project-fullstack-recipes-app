package de.neuefische.backend.repository;

import de.neuefische.backend.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends MongoRepository<User, String> {
}
