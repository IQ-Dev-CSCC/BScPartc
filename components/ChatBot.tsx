"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X } from 'lucide-react';
import axios from 'axios';

type Message = {
  text: string;
  isUser: boolean;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Send the first message automatically
      const initialMessage = "واش كاين في بومرداس من أحداث؟";
      setMessages([{ text: initialMessage, isUser: false }]);
      handleSend(initialMessage);
    }
  }, [isOpen]);

  const handleSend = async (message: string) => {
    if (message.trim()) {
      setMessages(prev => [...prev, { text: message, isUser: true }]);
      setInput('');

      try {
        const response = await axios.post('/api/test', { inputText: message });

        const data = response.data;
        if (data.transformedText) {
          setMessages(prev => [...prev, { text: data.transformedText, isUser: false }]);
        } else {
          setMessages(prev => [...prev, { text: 'معليش، ما فهمتش. حاول مرة أخرى.', isUser: false }]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => [...prev, { text: 'معليش، صرات مشكلة. حاول مرة أخرى.', isUser: false }]);
      }
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-4"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat with us</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full pr-4">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block rounded-lg px-3 py-1 ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit">Send</Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}