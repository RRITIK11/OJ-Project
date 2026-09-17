"use client";

import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/layout/EmptyState";
import { TableSkeletonRows } from "@/components/layout/TableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { initials, timeAgo } from "@/lib/format";

interface Roles {
  isAdmin: boolean;
  isModerator: boolean;
}

interface UserRow {
  _id: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  roles: Roles;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<UserRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [draft, setDraft] = React.useState<Record<string, Roles>>({});
  const [saving, setSaving] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    try {
      const response = await axios.get("/api/admin/users");
      const list: UserRow[] = response.data.allUser ?? [];
      setUsers(list);
      setDraft(
        list.reduce<Record<string, Roles>>((acc, u) => {
          acc[u._id] = {
            isAdmin: !!u.roles?.isAdmin,
            isModerator: !!u.roles?.isModerator,
          };
          return acc;
        }, {})
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Could not load users");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const isDirty = (u: UserRow) => {
    const d = draft[u._id];
    if (!d) return false;
    return (
      d.isAdmin !== !!u.roles?.isAdmin ||
      d.isModerator !== !!u.roles?.isModerator
    );
  };

  const setRole = (id: string, key: keyof Roles, value: boolean) =>
    setDraft((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));

  const save = async (u: UserRow) => {
    setSaving(u._id);
    try {
      await toast.promise(
        axios.post("/api/admin/users/role", { userId: u._id, ...draft[u._id] }),
        {
          loading: "Saving roles…",
          success: `Roles updated for ${u.username}`,
          error: "Could not update roles",
        }
      );
      await load();
    } finally {
      setSaving(null);
    }
  };

  const remove = async (u: UserRow) => {
    if (!window.confirm(`Delete ${u.username}? This cannot be undone.`)) return;
    await toast.promise(
      axios.post("/api/admin/users/delete", { username: u.username }),
      {
        loading: "Deleting user…",
        success: `${u.username} deleted`,
        error: "Deletion failed",
      }
    );
    await load();
  };

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">#</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-28">Joined</TableHead>
            <TableHead className="w-20 text-center">Admin</TableHead>
            <TableHead className="w-24 text-center">Moderator</TableHead>
            <TableHead className="w-36 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && <TableSkeletonRows rows={6} cols={7} />}
          {!loading &&
            users.map((u, index) => {
              const d = draft[u._id] ?? u.roles;
              const dirty = isDirty(u);
              return (
                <TableRow key={u._id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                        {initials(u.username)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{u.username}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {[u.firstname, u.lastname].filter(Boolean).join(" ") || "—"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {timeAgo(u.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      aria-label={`${u.username} is admin`}
                      className="h-4 w-4 accent-primary"
                      checked={d.isAdmin}
                      onChange={(e) => setRole(u._id, "isAdmin", e.target.checked)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      aria-label={`${u.username} is moderator`}
                      className="h-4 w-4 accent-primary"
                      checked={d.isModerator}
                      onChange={(e) =>
                        setRole(u._id, "isModerator", e.target.checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant={dirty ? "default" : "outline"}
                        disabled={!dirty || saving === u._id}
                        loading={saving === u._id}
                        onClick={() => save(u)}
                      >
                        Save
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        aria-label={`Delete ${u.username}`}
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => remove(u)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {!loading && users.length === 0 && (
        <EmptyState
          icon={Users}
          title="No users"
          description="Accounts will appear here once people sign up."
        />
      )}
    </Card>
  );
}
