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
@Table(name = "UserProfile")
public class UserProfile {
    @Id
    private Long userId;


    @Column(name = "accountActivated")
    private Boolean accountActivated;
}
