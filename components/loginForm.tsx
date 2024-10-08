"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

let Password123 = "qwertyuipASDFGHJKLzxcvbnmWASDdoctorMESSIpele10";
let email123 = "PeleISTheGoat10BallanDorIsBellingham@football.org.germany.google.com";
let first_Name = "Pele";
let last_Name = "Messi";

export function LoginForm() {
  const router = useRouter();

  async function Authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const password = formData.get("password");
    let data = { email, firstName, password, lastName };
    console.log(data);

    if (
      email123 == email &&
      first_Name == firstName &&
      last_Name == lastName &&
      Password123 == password
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
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}