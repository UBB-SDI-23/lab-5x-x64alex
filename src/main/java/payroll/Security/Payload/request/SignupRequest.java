package payroll.Security.Payload.request;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {

    @NotBlank
    private String username;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;

    @Column
    private String name;

    @Column
    private String gender;

    @Column
    private String bio;

    @Column
    private String location;

    @Column
    private Date birthdate;

}
