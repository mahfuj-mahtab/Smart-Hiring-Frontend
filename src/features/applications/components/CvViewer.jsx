"use client";

import { ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

function isPdfUrl(url) {
  if (!url) return false;
  try {
    const pathname = new URL(url, "http://localhost").pathname.toLowerCase();
    return pathname.endsWith(".pdf");
  } catch {
    return url.toLowerCase().includes(".pdf");
  }
}

export function CvViewer({ cvUrl, candidateName }) {
  if (!cvUrl) {
    return (
      <div className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 p-8 text-center">
        <FileText className="mb-3 h-10 w-10 text-muted-foreground" />
        <p className="font-medium">No CV uploaded</p>
        <p className="mt-1 text-sm text-muted-foreground">
          This candidate did not attach a resume.
        </p>
      </div>
    );
  }

  const pdf = isPdfUrl(cvUrl);

  return (
    <div className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div>
          <p className="text-sm font-semibold">CV / Resume</p>
          <p className="text-xs text-muted-foreground">
            {candidateName ? `${candidateName}'s document` : "Candidate document"}
          </p>
        </div>
        <Button variant="outline" size="sm" className="rounded-lg" asChild>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer">
            Open
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
      {pdf ? (
        <iframe
          title={`CV for ${candidateName || "candidate"}`}
          src={cvUrl}
          className="h-full min-h-[24rem] w-full flex-1 bg-muted/20"
        />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <FileText className="h-12 w-12 text-primary" />
          <div>
            <p className="font-medium">Preview not available</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Word documents must be opened in a new tab.
            </p>
          </div>
          <Button variant="gradient" className="rounded-xl" asChild>
            <a href={cvUrl} target="_blank" rel="noopener noreferrer">
              Download CV
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
