import { useState, useEffect, useRef } from "react";
import { MessageCircle, Phone, Video, Send, Mic, Paperclip, Search, ArrowLeft, MoreVertical, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isSent: boolean;
}

interface Contact {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
}

export function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState("");
  const [isVoiceCall, setIsVoiceCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Rajesh Kumar (Farmer)",
      role: "Farmer - Mango Supplier",
      lastMessage: "Yes, I have 50 quintals available",
      time: "10:30 AM",
      unread: 2,
      online: true,
      avatar: "👨‍🌾"
    },
    {
      id: 2,
      name: "Priya Sharma (Buyer)",
      role: "Wholesaler - Delhi",
      lastMessage: "What's the price for mangoes?",
      time: "9:15 AM",
      unread: 0,
      online: true,
      avatar: "👩‍💼"
    },
    {
      id: 3,
      name: "Amit Patel (Farmer)",
      role: "Farmer - Apple Supplier",
      lastMessage: "Can we discuss the deal?",
      time: "Yesterday",
      unread: 1,
      online: false,
      avatar: "👨‍🌾"
    },
    {
      id: 4,
      name: "Sunita Verma (Buyer)",
      role: "Wholesaler - Mumbai",
      lastMessage: "Thank you for the quick delivery",
      time: "Yesterday",
      unread: 0,
      online: false,
      avatar: "👩‍💼"
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Rajesh Kumar",
      text: "Hello! I saw your request for mangoes.",
      time: "10:00 AM",
      isSent: false
    },
    {
      id: 2,
      sender: "You",
      text: "Hi Rajesh! Yes, I need 50 quintals. Do you have them available?",
      time: "10:05 AM",
      isSent: true
    },
    {
      id: 3,
      sender: "Rajesh Kumar",
      text: "Yes, I have 50 quintals available. Premium quality Alphonso mangoes.",
      time: "10:30 AM",
      isSent: false
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isSent: true
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleVoiceCall = () => {
    setIsVoiceCall(true);
    setTimeout(() => setIsVoiceCall(false), 5000);
  };

  const handleVideoCall = () => {
    setIsVideoCall(true);
    setTimeout(() => setIsVideoCall(false), 5000);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
          <div className="flex h-full">
            {/* Contacts Sidebar */}
            <div className={`${selectedContact && 'hidden md:flex'} w-full md:w-96 border-r border-gray-200 flex flex-col bg-gradient-to-b from-green-50 to-white`}>
              {/* Header */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-emerald-600">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageCircle className="h-6 w-6" />
                    Messages
                  </h2>
                </div>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white border-green-200"
                  />
                </div>
              </div>

              {/* Contacts List */}
              <div className="flex-1 overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-green-50 ${
                      selectedContact?.id === contact.id ? "bg-green-100" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl">
                          {contact.avatar}
                        </div>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">{contact.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{contact.role}</p>
                        <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            {selectedContact ? (
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-emerald-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedContact(null)}
                        className="md:hidden text-white hover:bg-green-700 p-2 rounded-lg"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-xl">
                        {selectedContact.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{selectedContact.name}</h3>
                        <p className="text-xs text-green-100">
                          {selectedContact.online ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleVoiceCall}
                        size="sm"
                        className="bg-white text-green-600 hover:bg-green-50"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleVideoCall}
                        size="sm"
                        className="bg-white text-green-600 hover:bg-green-50"
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-white text-green-600 hover:bg-green-50">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-50/30 to-white">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          msg.isSent
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-br-none"
                            : "bg-white border border-gray-200 text-gray-900 rounded-bl-none shadow-sm"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.isSent ? "text-green-100" : "text-gray-500"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-gray-600">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" variant="ghost" className="text-gray-600">
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="text-center">
                  <MessageCircle className="h-24 w-24 text-green-600 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a contact to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Voice Call Modal */}
      {isVoiceCall && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 w-80 text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{selectedContact?.name}</h3>
            <p className="text-green-100 mb-6">Calling...</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setIsVoiceCall(false)}
                className="bg-red-500 hover:bg-red-600 rounded-full w-14 h-14"
              >
                <Phone className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Video Call Modal */}
      {isVideoCall && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="relative w-full h-full max-w-4xl">
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
              <div className="w-full h-full flex items-center justify-center text-white">
                <User className="h-16 w-16" />
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{selectedContact?.name}</h3>
                <p className="text-green-300 mb-8">Connecting...</p>
                <Button
                  onClick={() => setIsVideoCall(false)}
                  className="bg-red-500 hover:bg-red-600 rounded-full px-8 py-6"
                >
                  <Phone className="h-6 w-6 mr-2" />
                  End Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
