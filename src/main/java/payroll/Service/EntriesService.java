package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import payroll.Model.EntriesPerPage;
import payroll.Repository.EntriesRepository;


import java.util.List;
@Service
public class EntriesService {
    @Autowired
    private EntriesRepository entriesRepository;

    public void modifyUserPerPage(EntriesPerPage entriesPerPage){
        System.out.println(entriesRepository.getEntriesPerPage());

        entriesRepository.deleteAll();
        entriesRepository.save(entriesPerPage);
        System.out.println(entriesRepository.getEntriesPerPage());

    }
    public int getEntries(){
        if(entriesRepository.count() == 0){
            EntriesPerPage entity = new EntriesPerPage();
            entity.setEntries(50);
            entriesRepository.save(entity);
        }
        return entriesRepository.getEntriesPerPage();
    }
}