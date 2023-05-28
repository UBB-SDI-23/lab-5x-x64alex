import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BACKEND_API_URL_CHAT, authorization } from '../../constants';
import Checkbox from '@mui/material/Checkbox';
import { Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';
import * as deepai from 'deepai';


export const AppChat = () => {
  const [stompClient, setStompClient] = useState<any>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [from, setFrom] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [checked, setChecked] = useState(false);



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
    if(checked){
      console.log("send to api")
      deepai.setApiKey('0c00b471-5d4c-4def-94e6-34960fac56c3');

      (async function() {
          var resp = await deepai.callStandardApi("text2img", {
                  text: text,
          });
          console.log(resp);
      })()
    }
    if(!checked){
      if (stompClient) {
        stompClient.send('/app/chat', {}, JSON.stringify({ 'from': from, 'text': text }));
      }
    }
  }

  function showMessageOutput(messageOutput: any): void {
    setMessages((prevMessages) => [...prevMessages, messageOutput]);
  }

  return (
    <Container>
        <Card>
            <CardContent>
              <Stack direction="row" spacing={2}  sx={{ mb: 2 }}  alignItems="center">
                  <Typography variant="subtitle1">
                        Generate text from message:
                  </Typography>
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(!checked)}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Stack>
                {!checked &&
                  <Typography variant="subtitle1">
                      Username:
                  </Typography>
                }
                {!checked &&
                <TextField
                    type="text"
                    value={from}
                    sx={{ mb: 2 }}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Choose a nickname"
                />
                }
                {!checked &&
                <Stack direction="row" spacing={2}  sx={{ mb: 2 }}  alignItems="center">
                    <Button disabled={connected} onClick={connect} variant="contained" color="primary">
                    Connect
                    </Button>
                    <Button disabled={!connected} onClick={disconnect} variant="contained" color="secondary">
                    Disconnect
                    </Button>
                </Stack>
                }
                <Typography variant="subtitle1">
                        Message:
                </Typography>
                <Stack direction="row" spacing={2}   sx={{ mb: 2 }}  alignItems="center">
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