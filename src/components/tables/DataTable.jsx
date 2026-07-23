"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/feedback/EmptyState";
import { cn } from "@/lib/utils";
import { MESSAGES } from "@/constants/messages";

export function DataTable({
  columns,
  data = [],
  pagination,
  searchPlaceholder = MESSAGES.common.search,
  emptyTitle = MESSAGES.common.noResults,
  emptyDescription,
  emptyAction,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const currentPage = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const ordering = searchParams.get("ordering") || "";

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateParams({ search: formData.get("search"), page: 1 });
  };

  const handleSort = (field) => {
    const desc = ordering === field;
    const next = desc ? `-${field}` : field;
    if (ordering === field) {
      updateParams({ ordering: `-${field}` });
    } else if (ordering === `-${field}`) {
      updateParams({ ordering: null });
    } else {
      updateParams({ ordering: next });
    }
  };

  const totalPages = pagination ? Math.ceil(pagination.count / 20) : 1;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="search"
            defaultValue={search}
            placeholder={searchPlaceholder}
            className="pl-9 bg-card/50"
          />
        </div>
        <Button type="submit" variant="secondary" disabled={pending}>
          Search
        </Button>
      </form>

      {data.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      ) : (
        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead key={col.key}>
                    {col.sortable ? (
                      <button
                        type="button"
                        className={cn(
                          "inline-flex items-center gap-1.5 transition-colors hover:text-foreground",
                          (ordering === col.key || ordering === `-${col.key}`) &&
                            "text-foreground"
                        )}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      </button>
                    ) : (
                      col.label
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {pagination && pagination.count > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/50 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
            <span className="font-medium text-foreground">{totalPages}</span>
            <span className="hidden sm:inline">
              {" "}
              · {pagination.count} total
            </span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              disabled={!pagination.previous || pending}
              onClick={() => updateParams({ page: currentPage - 1 })}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              disabled={!pagination.next || pending}
              onClick={() => updateParams({ page: currentPage + 1 })}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
