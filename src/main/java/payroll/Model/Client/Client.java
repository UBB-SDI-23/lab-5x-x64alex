package payroll.Model.Client;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import payroll.Model.Transactions.Transaction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Clients")
public class Client {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long clientId;

    @NotBlank(message = "Please enter clientFirstName")
    @NotNull(message = "Please enter clientFirstName")
    @Column(name = "ClientFirstName")
    private String clientFirstName;
    @NotBlank(message = "Please enter clientLastName")
    @NotNull(message = "Please enter clientLastName")
    @Column(name = "ClientLastName")
    private String clientLastName;

    @NotBlank(message = "Please enter clientEmail")
    @NotNull(message = "Please enter clientEmail")
    @Column(name = "ClientEmail")
    private String clientEmail;

    @Column(name = "ClientAddress")
    private String clientAddress;

    @Column(name = "ClientPhoneNumber")
    private String clientPhoneNumber;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Transaction> transactions = new ArrayList<>();

    @JsonIgnore
    public ClientDTO getClientDTO(int transactionsCount ){
        ClientDTO clientDTO = new ClientDTO();

        clientDTO.setClientId(clientId);
        clientDTO.setClientEmail(clientEmail);
        clientDTO.setClientAddress(clientAddress);
        clientDTO.setClientFirstName(clientFirstName);
        clientDTO.setClientLastName(clientLastName);
        clientDTO.setClientPhoneNumber(clientPhoneNumber);

        clientDTO.setTransactionsCount(transactionsCount);
        return clientDTO;
    }
}
