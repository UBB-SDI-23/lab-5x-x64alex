package payroll.Model.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    private Long userId;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;
}
