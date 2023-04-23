package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Client.Client;
import payroll.Model.Client.ClientDTO;
import payroll.Model.DTO.ProductTransactionDTO;
import payroll.Service.ClientService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @GetMapping()
    public List<ClientDTO> getClients(@RequestParam(defaultValue = "0") int pageNumber,
                                      @RequestParam(defaultValue = "100") int pageSize){
        return this.clientService.getClients(pageNumber,pageSize).stream().map(client -> client.getClientDTO(clientService.getTransactionsCount(client.getClientId()))).toList();
    }

    @GetMapping("/{clientId}")
    public Client getOne(@PathVariable("clientId") Long clientId){
        return this.clientService.getOne(clientId);
    }

    @PostMapping()
    public Client saveClient(@RequestBody Client client){
        return this.clientService.saveClient(client);
    }

    @PostMapping("/{clientId}/products")
    public Client saveClientProducts(@PathVariable("clientId") Long clientId, @RequestBody ArrayList<ProductTransactionDTO> client){
        return this.clientService.saveProductsTransactions(clientId, client);
    }

    @PutMapping("/{clientId}")
    public Client updateClient(@RequestBody Client client, @PathVariable("clientId") Long clientId){
        return this.clientService.updateClient(client, clientId);
    }

    @DeleteMapping("/{clientId}")
    public String deleteClient(@PathVariable("clientId") Long clientId){
        this.clientService.deleteClients(clientId);
        return "Category deleted";
    }
}
