import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function OrgPublicBranding({ organization }) {
  if (!organization) {
    return (
      <>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg text-white text-sm font-bold shadow-md shadow-primary/25">
          SH
        </div>
        <span className="text-lg font-semibold tracking-tight">Smart Hiring</span>
      </>
    );
  }

  return (
    <>
      {organization.logo ? (
        <Image
          src={organization.logo}
          alt={`${organization.name} logo`}
          width={36}
          height={36}
          className="h-9 w-9 rounded-xl object-cover shadow-md"
          unoptimized
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg text-white text-sm font-bold shadow-md shadow-primary/25">
          {organization.name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span className="text-lg font-semibold tracking-tight">{organization.name}</span>
    </>
  );
}

export function OrgPublicFooter({ organization }) {
  const label = organization?.name || "Smart Hiring";
  return <p>© {new Date().getFullYear()} {label}. Built for modern teams.</p>;
}

export function OrgPublicHomeLink({ organization, children, className }) {
  return (
    <Link href={ROUTES.HOME} className={className}>
      {children}
    </Link>
  );
}
