export function timeAgo(timestamp: string) {
  const now = new Date();
  const sent = new Date(timestamp);

  if (isNaN(sent.getTime())) {
    return "Invalid date";
  }

  const diffInSeconds = Math.floor((now.getTime() - sent.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}min`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
}
