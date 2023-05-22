package payroll.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class ChatController {
    @Autowired
    private MessageRepository messageRepository;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public OutputMessage send(final Message message) throws Exception {
        final String time = new SimpleDateFormat("HH:mm").format(new Date());


        SavedMessage savedMessage = new SavedMessage();
        savedMessage.setUsername(message.getFrom());
        savedMessage.setMessage(message.getText());
        messageRepository.save(savedMessage);
        System.out.println(5);

        return new OutputMessage(message.getFrom(), message.getText(), time);
    }

}
