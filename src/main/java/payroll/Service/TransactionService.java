package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import payroll.Model.Client.Client;
import payroll.Model.Client.ClientDTO;
import payroll.Model.Products.Product;
import payroll.Model.Products.ProductDTO;
import payroll.Model.Transactions.Transaction;
import payroll.Model.Transactions.TransactionDTO;
import payroll.Model.Transactions.TransactionIdDTO;
import payroll.Repository.ClientRepository;
import payroll.Repository.ProductRepository;
import payroll.Repository.TransactionRepository;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction(TransactionIdDTO transactionIdDTO) {
        Client client = clientRepository.findById(transactionIdDTO.getClientId()).get();
        Product product = productRepository.findById(transactionIdDTO.getProductId()).get();

        Transaction transaction = new Transaction();

        transaction.setTransactionId(transactionIdDTO.getTransactionId());
        transaction.setTransactionDate(transactionIdDTO.getTransactionDate());
        transaction.setTransactionQuantity(transactionIdDTO.getTransactionQuantity());

        transaction.setProduct(product);
        transaction.setClient(client);

        return transactionRepository.save(transaction);
    }

    public int getClientAvgOrderQuantity(Long clientId){
        return transactionRepository.getClientAverageOrderQuantity(clientId);
    }

    public List<Transaction> getTransactions(int pageNumber,int pageSize) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        return transactionRepository.findAll(page).stream().toList();
    }
    public TransactionDTO getOneTransaction(Long transactionId){
        Transaction transaction = transactionRepository.findById(transactionId).get();

        // Get ProductDTO from product
        ProductDTO productDTO = productRepository.findById(transaction.getProduct().getProductId()).get().getProductDTO();

        // Construct ClientDTO from client
        ClientDTO clientDTO = clientRepository.findById(transaction.getClient().getClientId()).get().getClientDTO(clientRepository.getTransactionsCount(transaction.getClient().getClientId()));

        TransactionDTO transactionDTO = new TransactionDTO();

        transactionDTO.setTransactionId(transaction.getTransactionId());
        transactionDTO.setTransactionDate(transaction.getTransactionDate());
        transactionDTO.setTransactionQuantity(transaction.getTransactionQuantity());

        transactionDTO.setProductDTO(productDTO);
        transactionDTO.setClientDTO(clientDTO);

        return transactionDTO;
    }

    public void deleteTransaction(Long transactionId) {
        this.transactionRepository.deleteById(transactionId);
    }

    public Transaction updateTransaction(TransactionIdDTO transactionIdDTO, Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId).get();
        Product product = productRepository.findById(transactionIdDTO.getProductId()).get();
        Client client = clientRepository.findById(transactionIdDTO.getClientId()).get();

        transaction.setTransactionQuantity(transactionIdDTO.getTransactionQuantity());
        transaction.setTransactionDate(transactionIdDTO.getTransactionDate());

        transaction.setProduct(product);
        transaction.setClient(client);

        return transactionRepository.save(transaction);
    }
}
