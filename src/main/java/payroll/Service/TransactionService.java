package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import payroll.Model.Client.Client;
import payroll.Model.Client.ClientDTO;
import payroll.Model.DTO.*;
import payroll.Model.Products.Product;
import payroll.Model.Transactions.Transaction;
import payroll.Model.Transactions.TransactionDTO;
import payroll.Model.Transactions.TransactionIdDTO;
import payroll.Repository.ClientRepository;
import payroll.Repository.ProductRepository;
import payroll.Repository.TransactionRepository;

import java.util.ArrayList;
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

    public List<TransactionIdDTO> getTransactionIdDTOList(){
        List<TransactionIdDTO> transactionIdDTOS = new ArrayList<>();
        for(Transaction transaction : this.transactionRepository.findAll()){
            TransactionIdDTO transactionIdDTO = new TransactionIdDTO();

            transactionIdDTO.setTransactionId(transaction.getTransactionId());
            transactionIdDTO.setTransactionDate(transaction.getTransactionDate());
            transactionIdDTO.setTransactionQuantity(transaction.getTransactionQuantity());

            transactionIdDTO.setClientId(transaction.getClient().getClientId());
            transactionIdDTO.setProductId(transaction.getProduct().getProductId());

            transactionIdDTOS.add(transactionIdDTO);
        }
        return transactionIdDTOS;
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
