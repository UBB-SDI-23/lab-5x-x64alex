package payroll.Model.Client;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO {
    private Long clientId;
    private String clientFirstName;
    private String clientLastName;
    private String clientEmail;
    private String clientAddress;
    private String clientPhoneNumber;

    private int transactionsCount;
}
