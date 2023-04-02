package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Client;
import payroll.Model.DTO.ProductDTO;
import payroll.Model.DTO.ProductIdDTO;
import payroll.Model.DTO.TransactionDTO;
import payroll.Model.DTO.TransactionIdDTO;
import payroll.Model.Transaction;
import payroll.Service.TransactionService;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @GetMapping()
    public List<TransactionIdDTO> getTransactions(){
        return this.transactionService.getTransactionIdDTOList();
    }
    @GetMapping("/{transactionId}")
    public TransactionDTO getOneTransaction(@PathVariable("transactionId") Long transactionId){
        return this.transactionService.getOneTransaction(transactionId);
    }
    @PostMapping()
    public Transaction saveTransaction(@RequestBody TransactionIdDTO transactionIdDTO){
        return this.transactionService.saveTransaction(transactionIdDTO);
    }

    @PutMapping("/{transactionId}")
    public Transaction updateTransaction(@RequestBody TransactionIdDTO transactionIdDTO, @PathVariable("transactionId") Long transactionId){
        return this.transactionService.updateTransaction(transactionIdDTO, transactionId);
    }

    @DeleteMapping("/{transactionId}")
    public String deleteTransaction(@PathVariable("transactionId") Long transactionId){
        this.transactionService.deleteTransaction(transactionId);
        return "Transaction deleted";
    }
}
