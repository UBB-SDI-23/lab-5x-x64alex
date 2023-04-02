package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Client;
import payroll.Model.DTO.ClientDTO;
import payroll.Service.ClientService;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @GetMapping()
    public List<ClientDTO> getCategories(){
        return this.clientService.getClientsDTOList();
    }

    @GetMapping("/{clientId}")
    public Client getOne(@PathVariable("clientId") Long clientId){
        return this.clientService.getOne(clientId);
    }

    @PostMapping()
    public Client saveClient(@RequestBody Client client){
        return this.clientService.saveClient(client);
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
