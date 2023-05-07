package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Client.*;
import payroll.Model.Products.ProductTransactionDTO;
import payroll.Service.ClientService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:8000", "https://main--payrollapp1.netlify.app"},
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE},
        allowedHeaders = {"Authorization", "Content-Type", "confirmation"},
        allowCredentials = "true")
@RequestMapping("/api/clients")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @GetMapping()
    public List<ClientDTO> getClients(@RequestParam(defaultValue = "0") int pageNumber,
                                      @RequestParam(defaultValue = "100") int pageSize){
        return this.clientService.getClients(pageNumber,pageSize).stream().map(client -> client.getClientDTO(clientService.getTransactionsCount(client.getClientId()))).toList();
    }

    @GetMapping("/names")
    public List<ClientNameDTO> getClientNames(@RequestParam(defaultValue = "") String searchString) {
        return this.clientService.getClientNames(searchString);
    }

    @GetMapping("/{clientId}")
    public ClientGetOneDTO getOne(@PathVariable("clientId") Long clientId){
        return this.clientService.getOne(clientId);
    }

    @PostMapping()
    @PreAuthorize("hasRole('ROLE_REGULAR') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Client saveClient(@RequestBody Client client){
        return this.clientService.saveClient(client);
    }

    @PostMapping("/{clientId}/products")
    @PreAuthorize("hasRole('ROLE_REGULAR') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Client saveClientProducts(@PathVariable("clientId") Long clientId, @RequestBody ArrayList<ProductTransactionDTO> client){
        return this.clientService.saveProductsTransactions(clientId, client);
    }

    @PutMapping("/{clientId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @clientService.hasCurrentUserAccess(#clientId)) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateClient(@RequestBody ClientUpdateDTO client, @PathVariable("clientId") Long clientId){
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Access-Control-Allow-Origin", "2")
                .body(this.clientService.updateClient(client, clientId));
    }

    @DeleteMapping("/{clientId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @clientService.hasCurrentUserAccess(#clientId)) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteClient(@PathVariable("clientId") Long clientId){
        this.clientService.deleteClients(clientId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Access-Control-Allow-Origin", "https://main--payrollapp1.netlify.app")
                .body("Category deleted");
    }
}
