import { LoginForm } from "@/components/loginForm";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between py-2 bg-slate-100">
      <MaxWidthWrapper>
        <LoginForm />
      </MaxWidthWrapper>
    </section>
  );
}
