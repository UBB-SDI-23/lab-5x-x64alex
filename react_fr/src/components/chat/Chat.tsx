import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BACKEND_API_URL_CHAT, authorization } from '../../constants';

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

  return (
    <div>
      <div>
        <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Choose a nickname" />
      </div>
      <br />
      <div>
        <button disabled={connected} onClick={connect}>Connect</button>
        <button disabled={!connected} onClick={disconnect}>Disconnect</button>
      </div>
      <br />
      <div id="conversationDiv">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message..." />
        <button onClick={sendMessage}>Send</button>
        <p id="response">
          {messages.map((messageOutput, index) => (
            <span key={index}>
              {messageOutput.from}: {messageOutput.text} ({messageOutput.time})
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};