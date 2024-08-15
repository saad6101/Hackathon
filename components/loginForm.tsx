"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VscRefresh } from "react-icons/vsc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

let Password123 = "1";
let email123 = "1@1.2";
let first_Name = "1";
let last_Name = "1";
export function LoginForm() {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let newCaptcha = "";
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(newCaptcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const router = useRouter();
  async function Authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsCorrect(userInput === captchaText);
    userInput !== captchaText ? generateCaptcha() : setUserInput("");

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const password = formData.get("password");
    let data = { email, firstName, password, lastName };
    if (
      email123 == email &&
      firstName == first_Name &&
      last_Name == lastName &&
      Password123 == password &&
      userInput == captchaText
    ) {
      router.push("/pages/Terminal");
    }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Log In</CardTitle>
        <CardDescription>Enter your information to Log In</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={Authenticate} autoComplete="off">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" name="first-name" placeholder="Max" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" name="last-name" placeholder="Robinson" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" />
            </div>

            <div className="flex space-x-3">
              <Label htmlFor="captchaText">CAPTCHA</Label>
              <button type="button" onClick={generateCaptcha}>
                <VscRefresh />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <div
                  id="captchaText"
                  className="text-2xl font-bold tracking-widest bg-gray-100 p-3 rounded-md select-none"
                >
                  {captchaText}
                </div>
              </div>
              <div className="grid gap-2 content-center">
                <Input
                  id="captchaInput"
                  value={userInput}
                  customOnChange={(value: string) => setUserInput(value)}
                  placeholder="Enter CAPTCHA"
                />
              </div>
            </div>

            {isCorrect !== null && (
              <Alert variant={isCorrect ? "default" : "destructive"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{isCorrect ? "Success!" : "Error!"}</AlertTitle>
                <AlertDescription>
                  {isCorrect
                    ? "CAPTCHA verified successfully."
                    : "Incorrect CAPTCHA. Please try again."}
                </AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
