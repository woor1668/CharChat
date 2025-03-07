import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Container } from "@styles/HomeStyles";
import { Input } from "@src/styles/MyPageStyles";

// Styled components for the chat interface
const ChatContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 50vh;
  padding: 20px;
`;

const ChatHeader = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
`;

const ChatTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  padding: 10px 0;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const UserMessage = styled(Message)`
  align-items: flex-end;
`;

const SystemMessage = styled(Message)`
  align-items: flex-start;
`;

const MessageInfo = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 12px;
  color: #757575;
`;

const UserInfo = styled(MessageInfo)`
  justify-content: flex-end;
`;

const SystemInfo = styled(MessageInfo)`
  justify-content: flex-start;
`;

const SenderName = styled.span`
  font-weight: 600;
`;

const Timestamp = styled.span`
  font-weight: 400;
`;

const MessageBubble = styled.div`
  padding: 10px 16px;
  border-radius: 18px;
  max-width: 70%;
  word-break: break-word;
`;

const UserBubble = styled(MessageBubble)`
  background-color: #0084ff;
  color: white;
`;

const SystemBubble = styled(MessageBubble)`
  background-color: #f0f0f0;
  color: #333;
`;

const ChatFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ChatInput = styled(Input)`
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid #e0e0e0;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #0084ff;
  }
`;

const SendButton = styled.button`
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0077e6;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Format time for message timestamps
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Sample messages for demonstration
const sampleMessages = [
  { 
    id: 1, 
    text: "안녕하세요, 어떤 주제로 브레인스토밍을 할까요?", 
    sender: "system", 
    senderName: "진행자", 
    timestamp: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
  },
  { 
    id: 2, 
    text: "신제품 아이디어에 대해 논의하고 싶습니다.", 
    sender: "user", 
    senderName: "김민준", 
    timestamp: new Date(Date.now() - 1000 * 60 * 9) // 9 minutes ago
  },
  { 
    id: 3, 
    text: "좋습니다! 어떤 분야의 제품인가요?", 
    sender: "system", 
    senderName: "진행자", 
    timestamp: new Date(Date.now() - 1000 * 60 * 8) // 8 minutes ago
  }
];

// Define message type for better type safety
interface Message {
  id: number;
  text: string;
  sender: "user" | "system";
  senderName: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // User information (in a real app, this would come from authentication)
  const currentUser = {
    name: "김민준",
    id: "user123"
  };

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      senderName: currentUser.name,
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    // Simulate a response (in a real app, this would be from your API)
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        text: "메시지를 받았습니다. 추가 의견이 있으신가요?",
        sender: "system",
        senderName: "진행자",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>브레인스토밍 채팅</ChatTitle>
      </ChatHeader>
      
      <ChatBody>
        <MessageList>
          {messages.map((message) => (
            message.sender === "user" ? (
              <UserMessage key={message.id}>
                <UserInfo>
                  <SenderName>{message.senderName}</SenderName>
                  <Timestamp>{formatTime(message.timestamp)}</Timestamp>
                </UserInfo>
                <UserBubble>{message.text}</UserBubble>
              </UserMessage>
            ) : (
              <SystemMessage key={message.id}>
                <SystemInfo>
                  <SenderName>{message.senderName}</SenderName>
                  <Timestamp>{formatTime(message.timestamp)}</Timestamp>
                </SystemInfo>
                <SystemBubble>{message.text}</SystemBubble>
              </SystemMessage>
            )
          ))}
          <div ref={messagesEndRef} />
        </MessageList>
      </ChatBody>
      
      <ChatFooter>
        <ChatInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={newMessage.trim() === ""}
        >
          →
        </SendButton>
      </ChatFooter>
    </ChatContainer>
  );
}