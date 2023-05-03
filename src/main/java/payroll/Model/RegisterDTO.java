package payroll.Model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterDTO {

    String username;

    String confirmationToken;

}
