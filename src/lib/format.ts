/** Turn a problem title into the slug used in /problems/[slug]. */
export function problemSlug(title: string): string {
  return title.trim().toLowerCase().split(/\s+/).join("-");
}

/** Reverse of problemSlug, good enough for title matching. */
export function slugToTitle(slug: string): string {
  return slug.split("-").join(" ").toLowerCase();
}

export function acceptanceRate(
  accepted?: number,
  submissions?: number
): string {
  if (!submissions) return "—";
  return `${((accepted || 0) / submissions * 100).toFixed(1)}%`;
}

export function timeAgo(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return "";
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 30) return date.toLocaleDateString();
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export function initials(name?: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/[\s._-]+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
