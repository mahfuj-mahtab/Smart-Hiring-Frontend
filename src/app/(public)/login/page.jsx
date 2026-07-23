import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Briefcase, Users, BarChart3 } from "lucide-react";

export const metadata = {
  title: "Sign in — Smart Hiring",
};

const highlights = [
  { icon: Briefcase, text: "Manage jobs and applications in one place" },
  { icon: Users, text: "Collaborate with your hiring team" },
  { icon: BarChart3, text: "Track your pipeline with kanban & tables" },
];

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  return (
    <div className="flex flex-1 min-h-[calc(100vh-8rem)]">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20 border-r border-border/50">
        <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
          Welcome back
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Sign in to <span className="gradient-text">Smart Hiring</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-md">
          Access your organization dashboard, manage open roles, and move candidates
          through your hiring pipeline.
        </p>
        <ul className="mt-10 space-y-4">
          {highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md premium-card border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Employer or candidate account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm nextUrl={params?.next} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
