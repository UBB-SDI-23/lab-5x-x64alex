package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import payroll.Model.Category;
import payroll.Model.Client;
import payroll.Model.DTO.CategoryDTO;
import payroll.Model.DTO.ClientDTO;
import payroll.Repository.ClientRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientService implements ClientInterface{
    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client saveClient(Client client) {
        return this.clientRepository.save(client);
    }

    public List<ClientDTO> getClientsDTOList() {
        List<ClientDTO> clientDTOS = new ArrayList<>();
        for(Client client : clientRepository.findAll()){
            ClientDTO clientDTO = new ClientDTO();

            clientDTO.setClientId(client.getClientId());
            clientDTO.setClientFirstName(client.getClientFirstName());
            clientDTO.setClientLastName(client.getClientLastName());
            clientDTO.setClientEmail(client.getClientEmail());
            clientDTO.setClientAddress(client.getClientAddress());
            clientDTO.setClientPhoneNumber(client.getClientPhoneNumber());

            clientDTOS.add(clientDTO);
        }
        return clientDTOS;
    }

    public Client getOne(Long clientId) {return  this.clientRepository.findById(clientId).get(); }

    public Client updateClient(Client client, Long clientId) {
        Client foundClient = this.clientRepository.findById(clientId).get();

        // Do not update id
        foundClient.setClientFirstName(client.getClientFirstName());
        foundClient.setClientLastName(client.getClientLastName());
        foundClient.setClientEmail(client.getClientEmail());
        foundClient.setClientAddress(client.getClientAddress());
        foundClient.setClientPhoneNumber(client.getClientPhoneNumber());

        // Many to one update
        foundClient.setTransactions(client.getTransactions());

        return this.clientRepository.save(foundClient);
    }

    public void deleteClients(Long clientId) {
        this.clientRepository.deleteById(clientId);
    }
}
