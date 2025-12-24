"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([{ id: 1, text: "Hello! How can I help you today?", isBot: true }])

  const sendMessage = () => {
    if (!message.trim()) return

    setMessages((prev) => [...prev, { id: Date.now(), text: message, isBot: false }])
    setMessage("")

    // Mock bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Thank you for your message. Our team will get back to you shortly. For urgent queries, please call our helpline.",
          isBot: true,
        },
      ])
    }, 1000)
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-20 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-20 z-50 w-80 sm:w-96 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-medium">Live Chat</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-primary-foreground/20 rounded p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "max-w-[80%] rounded-lg p-3 text-sm",
                  msg.isBot ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground ml-auto",
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button size="icon" onClick={sendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
