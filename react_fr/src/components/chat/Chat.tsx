import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BACKEND_API_URL_CHAT, authorization } from '../../constants';
import { Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';

export const AppChat = () => {
  const [stompClient, setStompClient] = useState<any>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [from, setFrom] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    disconnect(); // Disconnect on component mount
  }, []);

  function setConnectedState(isConnected: boolean): void {
    setConnected(isConnected);
  }

  function connect(): void {
    const socket = new SockJS(BACKEND_API_URL_CHAT+'/chat');
    const client = Stomp.over(socket);
    client.connect({ Authorization: authorization}, (frame) => {
      setStompClient(client);
      setConnectedState(true);
      console.log('Connected: ' + frame);
      client.subscribe('/topic/messages', (messageOutput) => {
        showMessageOutput(JSON.parse(messageOutput.body));
      });
    });
  }

  function disconnect(): void {
    if (stompClient) {
      stompClient.disconnect();
    }
    setConnectedState(false);
    console.log('Disconnected');
  }

  function sendMessage(): void {
    if (stompClient) {
      stompClient.send('/app/chat', {}, JSON.stringify({ 'from': from, 'text': text }));
    }
  }

  function showMessageOutput(messageOutput: any): void {
    setMessages((prevMessages) => [...prevMessages, messageOutput]);
  }


//   return (
    
//     <div >
//       <div>
//         <TextField
//           type="text"
//           value={from}
//           onChange={(e) => setFrom(e.target.value)}
//           placeholder="Choose a nickname"
//         />
//       </div>
//       <div >
//         <Button disabled={connected} onClick={connect} variant="contained" color="primary">
//           Connect
//         </Button>
//         <Button disabled={!connected} onClick={disconnect} variant="contained" color="secondary">
//           Disconnect
//         </Button>
//       </div>
//       <div>
//         <div>
//           <TextField
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Write a message..."
//           />
//           <Button onClick={sendMessage} variant="contained" color="primary">
//             Send
//           </Button>
//         </div>
//         <div>
//           {messages.map((messageOutput, index) => (
//             <Typography
//               key={index}
//               variant="body1"
//             >
//               {`${messageOutput.from}: ${messageOutput.text} (${messageOutput.time})`}
//             </Typography>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
  return (
    <Container>
        <Card>
            <CardContent>
                <TextField
                    type="text"
                    value={from}
                    sx={{ mb: 2 }}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Choose a nickname"
                />
                <Stack direction="row" spacing={2}  sx={{ mb: 2 }}  alignItems="center">
                    <Button disabled={connected} onClick={connect} variant="contained" color="primary">
                    Connect
                    </Button>
                    <Button disabled={!connected} onClick={disconnect} variant="contained" color="secondary">
                    Disconnect
                    </Button>
                </Stack>
                <Stack direction="row" spacing={2}   sx={{ mb: 2 }}  alignItems="center">
                    <Typography variant="h4">
                        Message:
                    </Typography>
                    <TextField
                    type="text"
                    sx={{ mb: 2 }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a message..."
                    />
                    <Button onClick={sendMessage} variant="contained" color="primary">
                        Send
                    </Button>
                </Stack>

                {messages.map((messageOutput, index) => (
                    <Typography
                    key={index}
                    variant="body1"
                    >
                    {`${messageOutput.from}: ${messageOutput.text} (${messageOutput.time})`}
                    </Typography>
                ))}

            </CardContent>
        </Card>
    </Container>
);
};