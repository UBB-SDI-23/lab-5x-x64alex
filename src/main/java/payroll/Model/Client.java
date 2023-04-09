package payroll.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import payroll.Model.DTO.ClientDTO;
import payroll.Model.DTO.ProductDTO;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Clients")
@SequenceGenerator(name="seq", initialValue=1000000, allocationSize=100)
public class Client {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
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
    public ClientDTO getClientDTO(){
        ClientDTO clientDTO = new ClientDTO();

        clientDTO.setClientId(clientId);
        clientDTO.setClientEmail(clientEmail);
        clientDTO.setClientAddress(clientAddress);
        clientDTO.setClientFirstName(clientFirstName);
        clientDTO.setClientLastName(clientLastName);
        clientDTO.setClientPhoneNumber(clientPhoneNumber);

        return clientDTO;
    }
}
