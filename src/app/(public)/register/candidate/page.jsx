import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterCandidateForm } from "@/features/auth/components/RegisterCandidateForm";
import { Search, FileText, Bell } from "lucide-react";

export const metadata = {
  title: "Candidate registration — Smart Hiring",
};

const highlights = [
  { icon: Search, text: "Discover roles across organizations" },
  { icon: FileText, text: "Apply with a single candidate profile" },
  { icon: Bell, text: "Track your applications in one place" },
];

export default function RegisterCandidatePage() {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-8rem)]">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20 border-r border-border/50">
        <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
          For candidates
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Find your next role on{" "}
          <span className="gradient-text">Smart Hiring</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-md">
          Create a candidate profile to apply for jobs across organizations
          and manage your applications from one dashboard.
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
          Hiring for your company?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create an employer account
          </Link>
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <Card className="w-full max-w-lg premium-card border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Create candidate account</CardTitle>
            <CardDescription>
              Sign up to apply for jobs across organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterCandidateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
