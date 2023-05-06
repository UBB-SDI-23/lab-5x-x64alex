package payroll.Model.Client;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientGetOneDTO {
    private Long clientId;
    private String clientFirstName;
    private String clientLastName;
    private String clientEmail;
    private String clientAddress;
    private String clientPhoneNumber;
    private String userName;
}
