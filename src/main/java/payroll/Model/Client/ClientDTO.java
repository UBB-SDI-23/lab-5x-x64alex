package payroll.Model.Client;

import lombok.*;
import payroll.Model.Transaction;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
