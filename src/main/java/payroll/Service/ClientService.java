package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import payroll.Model.Client.Client;
import payroll.Model.Client.ClientUpdateDTO;
import payroll.Model.DTO.ProductTransactionDTO;
import payroll.Model.Products.Product;
import payroll.Model.Transactions.Transaction;
import payroll.Repository.ClientRepository;
import payroll.Repository.ProductRepository;
import payroll.Repository.TransactionRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientService implements ClientInterface{
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TransactionRepository transactionRepository;


    @Override
    public Client saveClient(Client client) {
        return this.clientRepository.save(client);
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

    public Client getOne(Long clientId) {return  this.clientRepository.findById(clientId).get(); }

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
