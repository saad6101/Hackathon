"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCommand = () => {
    if (command.trim() === "") {
      return;
    }
    setLoading(true);
    const args = command.split(" ");
    setTimeout(() => { // Simulate a delay for command processing
      let response = "";
      let isWarning = false;
      if (args[0] === "clear") {
        setHistory([]);
        setOutput("");
      } else if (args[0] === "football") {
        if (args.includes("-help")) {
          response = "Usage: football [options]\n" +
                     "Options:\n" +
                     "  -username <username>  Specify the username\n" +
                     "  -password <password>  Specify the password\n" +
                     "Example:\n" +
                     "  football -username Pele -password Goat";
        } else {
          if (args.includes("-username") && args.includes("-password")) {
            const usernameIndex = args.indexOf("-username") + 1;
            const passwordIndex = args.indexOf("-password") + 1;
            if (usernameIndex < args.length && passwordIndex < args.length) {
              const username = args[usernameIndex];
              const password = args[passwordIndex];
              if (username === "Pele" && password === "Goat") {
                router.push("/pages/Website");
                return;
              }
            }
          }
          response = "Wrong Syntax. Please Run Football -help for usage instructions.";
          isWarning = true;
        }
      } else if (args[0] === "quit") {
        router.push("/");
        return;
      } else {
        response = "Unknown command. Use 'football -help' for a list of available commands.";
        isWarning = true;
      }
      if (args[0] !== "clear") {
        const capitalizedCommand = command.charAt(0).toUpperCase() + command.slice(1);
        setHistory((prevHistory) => [
          ...prevHistory,
          `> ${capitalizedCommand}`,
          isWarning ? `<span class="text-red-500 font-bold">${response}</span>` : response
        ]);
      }
      setOutput(response);
      setLoading(false);
      setCommand(""); 
    }, 500);
  };
  

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
      <MaxWidthWrapper>
        <div className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg shadow-lg h-30 relative">
          <Input
            type="text"
            placeholder="Enter command"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleCommand();
              }
            }}
            // onChange={(e) => {setCommand(e.target.value); console.log("parent change") }}
            onChange={(value: string) => setCommand(value)}
            value={command}
            className="w-full text-2xl font-mono p-4 mb-4 bg-gray-800 text-gray-100 border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {history.length > 0 && (
            <div className={`whitespace-pre-wrap text-xl bg-gray-800 p-2 rounded h-80 overflow-y-auto scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-w-4 ${loading ? 'blur-sm' : ''}`}>
              {history.map((entry, index) => (
                <div key={index} className="mb-1" dangerouslySetInnerHTML={{ __html: entry }} />
              ))}
              {loading && (
                <div className="flex items-center justify-center mt-4">
                  <div className="w-8 h-8 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span className="ml-2">Processing command...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </MaxWidthWrapper>
      <div className="absolute top-4 right-4 text-2xl font-mono">
        {currentTime ? currentTime.toLocaleTimeString() : "Loading..."}
      </div>
    </section>
  );
}