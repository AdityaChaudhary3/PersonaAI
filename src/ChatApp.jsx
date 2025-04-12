import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getResponse }  from "./ai_tasks/persona_gemini.js";

const ChatApp = () => {
  const [model, setModel] = useState("Hitesh");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // const sendMessage = () => {
  //   if (!input.trim()) return;
  //   const newMessage = { role: "user", content: input };
  //   let updatedMessages = [...messages, newMessage];

  //   if (model === "Both") {
  //     updatedMessages.push(
  //       { role: "ai", content: `Hitesh says: This is a reply from Hitesh` },
  //       { role: "ai", content: `Piyush says: This is a reply from Piyush` }
  //     );
  //   } else {
  //     updatedMessages.push({ role: "ai", content: `This is a reply from ${model}` });
  //   }

  //   setMessages(updatedMessages);
  //   setInput("");
  // };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    let updatedMessages = [...messages, newMessage];

    if (model === "Both") {
      const reply1 = await getResponse("Hitesh", input);
      const reply2 = await getResponse("Piyush", input);

      updatedMessages.push({role: "Hitesh", content: reply1});
      updatedMessages.push({role: "Piyush", content: reply2});

      setMessages(updatedMessages);

    }else{
      const reply = await getResponse(model,input);
      updatedMessages.push({role: model, content: reply});
      console.log("Updated Messages: ", updatedMessages);

      setMessages(updatedMessages);
    }

    setMessages(updatedMessages);
    setInput("");

  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="flex gap-4 mb-4">
        <Button
          className={`rounded-full px-6 py-2 text-lg flex items-center gap-2 ${model === "Hitesh" ? "bg-blue-600 text-black" : "bg-white border text-black"}`}
          onClick={() => setModel("Hitesh")}
        >
          <img
            src="/assets/hitesh.jpg"
            alt="H"
            className="w-6 h-6 rounded-full"
          />
          Hitesh
        </Button>
        <Button
          className={`rounded-full px-6 py-2 text-lg flex items-center gap-2 ${model === "Piyush" ? "bg-blue-600 text-black" : "bg-white border text-black"}`}
          onClick={() => setModel("Piyush")}
        >
          <img
            src="assets/piyush.jpg"
            alt="P"
            className="w-6 h-6 rounded-full"
          />
          Piyush
        </Button>
        <Button
          className={`rounded-full px-6 py-2 text-lg ${model === "Both" ? "bg-blue-600 text-black" : "bg-white border text-black"}`}
          onClick={() => setModel("Both")}
        >
          Both
        </Button>
      </div>

      <Card className="w-full max-w-xl flex-1 flex flex-col" >
        <CardContent className="overflow-y-auto flex-1 space-y-4 p-4"  >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 w-full ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {(msg.role === "Hitesh" || msg.role === "Piyush" ) && (
                <img
                  src={msg.role === "Hitesh" ? "/assets/hitesh.jpg" : "/assets/piyush.jpg"}
                  alt="Bot"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div className="flex items-start max-w-sm">
                <div
                  className={`p-3 rounded-xl ${
                    msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
              {msg.role === "user" && (
                <img
                  src="https://i.pravatar.cc/32?img=3"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              )}
            </div>
          ))}
        </CardContent>
        <div className="p-4 border-t flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatApp;
