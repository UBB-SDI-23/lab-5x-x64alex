package payroll.Service;

import org.springframework.stereotype.Service;
import payroll.Exception.UserNotFoundException;
import payroll.Exception.UserProfileNotFoundException;
import payroll.Model.User.User;
import payroll.Model.User.UserProfile;
import payroll.Repository.UserProfileRepository;
import payroll.Repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;


    private final UserProfileRepository userProfileRepository;

    public UserService(UserRepository userRepository, UserProfileRepository userProfileRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
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

    public UserProfile updateUserProfile(UserProfile newUserProfile, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return userProfileRepository.findById(user.getUserProfile().getId())
                .map(userProfile -> {
                    userProfile.setBio(newUserProfile.getBio());
                    userProfile.setLocation(newUserProfile.getLocation());
                    userProfile.setGender(newUserProfile.getGender());
                    userProfile.setMaritalStatus(newUserProfile.getMaritalStatus());
                    userProfile.setBirthdate(newUserProfile.getBirthdate());
                    return userProfileRepository.save(userProfile);
                })
                .orElseThrow(() -> new UserProfileNotFoundException(id));
    }
}
