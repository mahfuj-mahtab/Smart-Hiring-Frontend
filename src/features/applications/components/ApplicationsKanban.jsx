"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Briefcase,
  Calendar,
  FileText,
  GripVertical,
  Mail,
  Phone,
  Star,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateApplicationStageAction } from "@/features/applications/actions/applications";
import { applicationReviewUrl } from "@/features/applications/utils/review-query";
import {
  APPLICATION_STAGES,
  STAGE_LABELS,
  STAGE_ICONS,
  STAGE_THEME,
} from "@/features/applications/constants/stages";
import { MESSAGES } from "@/constants/messages";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format-date";
import { toProxiedMediaUrl } from "@/lib/media-url";
import { PermissionGate } from "@/components/layout/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

function groupByStage(applications) {
  const groups = {};
  APPLICATION_STAGES.forEach((stage) => {
    groups[stage] = [];
  });
  applications.forEach((app) => {
    if (groups[app.stage]) {
      groups[app.stage].push(app);
    } else {
      groups.applied.push(app);
    }
  });
  return groups;
}

function getInitials(name, email) {
  const source = name || email || "?";
  return source
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getDragStyle(style, snapshot) {
  if (!style) return undefined;
  if (!snapshot.isDragging) return style;

  return {
    ...style,
    margin: 0,
  };
}

function KanbanCard({ app, reviewHref }) {
  const name = app.candidate_name || app.candidate_email;
  const theme = STAGE_THEME[app.stage] || STAGE_THEME.applied;

  return (
    <div className={cn("kanban-card group border-l-[3px]", theme.accent)}>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {getInitials(app.candidate_name, app.candidate_email)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-semibold text-sm leading-tight">{name}</p>
            {app.is_shortlisted && (
              <Star className="h-3.5 w-3.5 shrink-0 fill-amber-500 text-amber-500" />
            )}
          </div>
          {app.candidate_email && app.candidate_name && (
            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
              <Mail className="h-3 w-3 shrink-0" />
              {app.candidate_email}
            </p>
          )}
        </div>
        <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Briefcase className="h-3.5 w-3.5 shrink-0 text-primary/70" />
        <span className="truncate font-medium text-foreground/80">
          {app.job_title}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {app.years_of_experience != null && (
          <span className="rounded-md bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {app.years_of_experience} yrs exp
          </span>
        )}
        {app.phone && (
          <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            <Phone className="h-3 w-3" />
            {app.phone}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formatDate(app.applied_at)}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 rounded-md px-2 text-xs"
            asChild
          >
            <Link href={reviewHref} onClick={(e) => e.stopPropagation()}>
              <Eye className="h-3.5 w-3.5" />
              Review
            </Link>
          </Button>
          {app.cv_url && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 rounded-md px-2 text-xs"
              asChild
            >
              <a href={toProxiedMediaUrl(app.cv_url)} target="_blank" rel="noopener noreferrer">
                <FileText className="h-3.5 w-3.5" />
                CV
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ stage, items, disabled, listQuery }) {
  const theme = STAGE_THEME[stage];
  const Icon = STAGE_ICONS[stage];

  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <div className="flex items-center gap-2.5">
          <span className={cn("h-2.5 w-2.5 rounded-full ring-4", theme.dot, theme.ring)} />
          <Icon className={cn("h-4 w-4", theme.header)} />
          <h3 className={cn("text-sm font-semibold", theme.header)}>
            {STAGE_LABELS[stage]}
          </h3>
        </div>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", theme.count)}>
          {items.length}
        </span>
      </div>

      <Droppable droppableId={stage} isDropDisabled={disabled}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "kanban-column-body",
              theme.column,
              snapshot.isDraggingOver && theme.columnActive,
              snapshot.isDraggingOver && "kanban-column-body--active"
            )}
          >
            {items.map((app, index) => (
              <Draggable
                key={app.id}
                draggableId={app.id}
                index={index}
                isDragDisabled={disabled}
              >
                {(dragProvided, dragSnapshot) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    style={getDragStyle(
                      dragProvided.draggableProps.style,
                      dragSnapshot
                    )}
                    className={cn(
                      "kanban-card-wrapper",
                      dragSnapshot.isDragging && "kanban-card-wrapper--dragging"
                    )}
                  >
                    <KanbanCard
                      app={app}
                      reviewHref={applicationReviewUrl(app.id, listQuery)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {items.length === 0 && !snapshot.isDraggingOver && (
              <div className="kanban-empty">
                <p className="text-xs font-medium text-muted-foreground/70">
                  No candidates
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground/50">
                  {disabled ? "View only" : "Drag cards here"}
                </p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function KanbanBoard({ columns, disabled, listQuery }) {
  return (
    <div className="kanban-board-wrapper">
      <div className="kanban-board">
        {APPLICATION_STAGES.map((stage) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            items={columns[stage] || []}
            disabled={disabled}
            listQuery={listQuery}
          />
        ))}
      </div>
    </div>
  );
}

export function ApplicationsKanban({ applications }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listQuery = Object.fromEntries(searchParams.entries());
  const [columns, setColumns] = useState(() => groupByStage(applications));
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setColumns(groupByStage(applications));
  }, [applications]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStage = source.droppableId;
    const destStage = destination.droppableId;
    const app = columns[sourceStage].find((a) => a.id === draggableId);
    if (!app) return;

    const sourceItems = [...columns[sourceStage]];
    const destItems =
      sourceStage === destStage ? sourceItems : [...columns[destStage]];

    sourceItems.splice(source.index, 1);
    const updatedApp = { ...app, stage: destStage };
    destItems.splice(destination.index, 0, updatedApp);

    setColumns({
      ...columns,
      [sourceStage]: sourceStage === destStage ? destItems : sourceItems,
      [destStage]: destItems,
    });

    if (sourceStage !== destStage) {
      startTransition(async () => {
        const result = await updateApplicationStageAction(draggableId, destStage);
        if (result.success) {
          toast.success(MESSAGES.applications.stageUpdated);
          router.refresh();
        } else {
          toast.error(result.message || MESSAGES.common.error);
          setColumns(groupByStage(applications));
        }
      });
    }
  };

  return (
    <div className={cn(pending && "pointer-events-none opacity-70 transition-opacity")}>
      <PermissionGate
        permission={PERMISSIONS.CANDIDATE_CHANGE}
        fallback={
          <DragDropContext onDragEnd={() => {}}>
            <KanbanBoard columns={columns} disabled listQuery={listQuery} />
          </DragDropContext>
        }
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <KanbanBoard columns={columns} disabled={pending} listQuery={listQuery} />
        </DragDropContext>
      </PermissionGate>
    </div>
  );
}
