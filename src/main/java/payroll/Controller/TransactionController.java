package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Transactions.TransactionAvgClientOrderQuantity;
import payroll.Model.Transactions.TransactionDTO;
import payroll.Model.Transactions.TransactionIdDTO;
import payroll.Model.Transactions.Transaction;
import payroll.Service.EntriesService;
import payroll.Service.TransactionService;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @Autowired
    EntriesService entriesService;

    @GetMapping()
    public List<TransactionAvgClientOrderQuantity> getTransactions(@RequestParam(defaultValue = "0") int pageNumber,
                                                                   @RequestParam(defaultValue = "100") int pageSize)
    {
        int entities = entriesService.getEntries();
        return this.transactionService.getTransactions(pageNumber, entities).stream().map(transaction -> transaction.getTransactionAvgClientOrderQuantity(this.transactionService.getClientAvgOrderQuantity(transaction.getClient().getClientId()))).toList();
    }
    @GetMapping("/{transactionId}")
    public TransactionDTO getOneTransaction(@PathVariable("transactionId") Long transactionId){
        return this.transactionService.getOneTransaction(transactionId);
    }
    @PostMapping()
    @PreAuthorize("hasRole('ROLE_REGULAR') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Transaction saveTransaction(@RequestBody TransactionIdDTO transactionIdDTO){
        return this.transactionService.saveTransaction(transactionIdDTO);
    }

    @PutMapping("/{transactionId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @transactionService.hasCurrentUserAccess(#transactionId)) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Transaction updateTransaction(@RequestBody TransactionIdDTO transactionIdDTO, @PathVariable("transactionId") Long transactionId){
        return this.transactionService.updateTransaction(transactionIdDTO, transactionId);
    }

    @DeleteMapping("/{transactionId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @transactionService.hasCurrentUserAccess(#transactionId)) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public String deleteTransaction(@PathVariable("transactionId") Long transactionId){
        this.transactionService.deleteTransaction(transactionId);
        return "Transaction deleted";
    }
}
