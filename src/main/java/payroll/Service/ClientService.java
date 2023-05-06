package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import payroll.Model.Client.Client;
import payroll.Model.Client.ClientGetOneDTO;
import payroll.Model.Client.ClientNameDTO;
import payroll.Model.Client.ClientUpdateDTO;
import payroll.Model.Products.ProductTransactionDTO;
import payroll.Model.Products.Product;
import payroll.Model.Transactions.Transaction;
import payroll.Repository.ClientRepository;
import payroll.Repository.ProductRepository;
import payroll.Repository.TransactionRepository;
import payroll.Repository.UserRepository;
import payroll.Security.Services.UserDetailsImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ClientService{
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;


    public Client saveClient(Client client) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = ((UserDetailsImpl) principal).getId();
        client.setUser(userRepository.getById(userId));

        return this.clientRepository.save(client);
    }

    public Boolean hasCurrentUserAccess(long clientId){
        Long categoryUserId = this.clientRepository.getById(clientId).getUser().getId();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            if (authentication.getPrincipal() instanceof UserDetailsImpl userDetails) {
                Long currentUserId = userDetails.getId();
                return Objects.equals(categoryUserId, currentUserId);
            }
        }
        return false;
    }

    public List<ClientNameDTO> getClientNames(String givenString){
        Pageable page = PageRequest.of(0, 10);
        return this.clientRepository.findClientLastNames(givenString, page);
    }

    public Client saveProductsTransactions(Long clientId, ArrayList<ProductTransactionDTO> productTransactionDTOS) {
        Client client = this.clientRepository.findById(clientId).get();
        for(ProductTransactionDTO productTransactionDTO: productTransactionDTOS){
            Product product = productRepository.findById(productTransactionDTO.getProductId()).get();
            Transaction transaction = new Transaction();

            transaction.setTransactionDate(productTransactionDTO.getTransactionDate());
            transaction.setTransactionQuantity(productTransactionDTO.getTransactionQuantity());

            transaction.setProduct(product);
            transaction.setClient(client);

            productRepository.save(product);
            transactionRepository.save(transaction);

        }

        return client;
    }

    public List<Client> getClients(int pageNumber,int pageSize) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        return clientRepository.findAll(page).stream().toList();
    }

    public int getTransactionsCount(Long clientId) {
        return clientRepository.getTransactionsCount(clientId);
    }

    public ClientGetOneDTO getOne(Long clientId) {
        return this.clientRepository.findById(clientId).get().getClientGetOneDTO();
    }

    public Client updateClient(ClientUpdateDTO client, Long clientId) {
        Client foundClient = this.clientRepository.findById(clientId).get();

        // Do not update id
        foundClient.setClientFirstName(client.getClientFirstName());
        foundClient.setClientLastName(client.getClientLastName());
        foundClient.setClientEmail(client.getClientEmail());
        foundClient.setClientAddress(client.getClientAddress());
        foundClient.setClientPhoneNumber(client.getClientPhoneNumber());

        return this.clientRepository.save(foundClient);
    }

    public void deleteClients(Long clientId) {
        this.clientRepository.deleteById(clientId);
    }
}
