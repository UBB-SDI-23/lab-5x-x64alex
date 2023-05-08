package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import payroll.Exception.UserNotFoundException;
import payroll.Exception.UserProfileNotFoundException;
import payroll.Model.User.User;
import payroll.Model.User.UserNameDTO;
import payroll.Model.User.UserProfile;
import payroll.Model.User.UserStatistics;
import payroll.Repository.EntriesRepository;
import payroll.Repository.UserProfileRepository;
import payroll.Repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private EntriesRepository entriesRepository;

    private final UserRepository userRepository;


    private final UserProfileRepository userProfileRepository;


    public List<UserNameDTO> getUserNames(String givenString){
        Pageable page = PageRequest.of(0, 10);
        return this.userRepository.findUserNames(givenString, page);
    }

    public UserService(UserRepository userRepository, UserProfileRepository userProfileRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
    }

    public void deleteAllEntities(){
        userRepository.deleteAllDataEntities();
    }
    public UserStatistics getUserStatistics(Long userId) {
        return new UserStatistics(userId,
                userRepository.getNumberCategory(userId),
                userRepository.getNumberProducts(userId),
                userRepository.getNumberClients(userId),
                userRepository.getNumberTransactions(userId)
        );
    }

    public UserProfile getUserProfileById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return user.getUserProfile();
    }

    public UserProfile getUserProfileByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
        return user.getUserProfile();
    }


    public User getUserByUsername(String username) {
        return this.userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
    }
    public User getUserById(Long userId) {
        return this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    public UserProfile updateUserProfile(UserProfile newUserProfile, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return userProfileRepository.findById(user.getUserProfile().getId())
                .map(userProfile -> {
                    userProfile.setBio(newUserProfile.getBio());
                    userProfile.setLocation(newUserProfile.getLocation());
                    userProfile.setGender(newUserProfile.getGender());
                    userProfile.setName(newUserProfile.getName());
                    userProfile.setBirthdate(newUserProfile.getBirthdate());
                    return userProfileRepository.save(userProfile);
                })
                .orElseThrow(() -> new UserProfileNotFoundException(id));
    }
}
