package payroll.Exception;

public class UserNotAuthorizedException extends RuntimeException {

    public UserNotAuthorizedException(String username) {
        super("The user with username " + username + " is not authorized.");
    }
}
