"use client";

import { useState } from "react";
import { ExternalLink, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toProxiedMediaUrl } from "@/lib/media-url";

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
  const [loadError, setLoadError] = useState(false);
  const previewUrl = toProxiedMediaUrl(cvUrl);

  if (!cvUrl) {
    return (
      <div className="premium-card flex min-h-[70vh] flex-col items-center justify-center border-0 p-10 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/60">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">No CV uploaded</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          This candidate did not attach a resume with their application.
        </p>
      </div>
    );
  }

  const pdf = isPdfUrl(cvUrl);

  return (
    <div className="premium-card flex min-h-[70vh] flex-col overflow-hidden border-0">
      <div className="flex items-center justify-between gap-4 border-b border-border/60 bg-gradient-to-r from-primary/5 via-transparent to-violet-500/5 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">CV / Resume</p>
            <p className="text-xs text-muted-foreground">
              {candidateName ? `${candidateName}'s document` : "Candidate document"}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl" asChild>
          <a href={previewUrl} target="_blank" rel="noopener noreferrer">
            <Download className="h-3.5 w-3.5" />
            Open
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </Button>
      </div>

      {pdf ? (
        loadError ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <p className="font-semibold">Could not load preview</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Open the CV in a new tab instead.
              </p>
            </div>
            <Button variant="gradient" className="rounded-xl" asChild>
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                Open CV
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        ) : (
          <iframe
            title={`CV for ${candidateName || "candidate"}`}
            src={previewUrl}
            className="h-full min-h-[calc(70vh-4.5rem)] w-full flex-1 bg-muted/10"
            onError={() => setLoadError(true)}
          />
        )
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-8 w-8" />
          </div>
          <div>
            <p className="font-semibold">Preview not available</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Word documents must be opened in a new tab.
            </p>
          </div>
          <Button variant="gradient" className="rounded-xl" asChild>
            <a href={previewUrl} target="_blank" rel="noopener noreferrer">
              Download CV
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
