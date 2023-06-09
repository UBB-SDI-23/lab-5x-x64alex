package payroll.Model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_confirmation")
public class UserConfirmation {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    private Long id;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private Date expirationDate;

    @Column(length = 2000)
    private String confirmationToken;

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
