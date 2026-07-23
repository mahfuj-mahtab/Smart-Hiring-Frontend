import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterEmployerForm } from "@/features/auth/components/RegisterEmployerForm";
import { Briefcase, Shield, Globe } from "lucide-react";

export const metadata = {
  title: "Register — Smart Hiring",
};

const highlights = [
  { icon: Briefcase, text: "Post jobs and manage your hiring pipeline" },
  { icon: Shield, text: "Role-based access for your entire HR team" },
  { icon: Globe, text: "Your own branded careers subdomain" },
];

export default function RegisterPage() {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-8rem)]">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20 border-r border-border/50">
        <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
          Get started
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Build your team with{" "}
          <span className="gradient-text">Smart Hiring</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-md">
          Create your organization in minutes. Post jobs, review applications,
          and give candidates a premium experience on your careers page.
        </p>
        <ul className="mt-10 space-y-4">
          {highlights.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              {text}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <Card className="w-full max-w-lg premium-card border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Create employer account</CardTitle>
            <CardDescription>
              Set up your organization and start hiring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterEmployerForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
