import type { ClubEvent } from "../types";

/**
 * Format a date string (YYYY-MM-DD) and time (e.g. "09:00 AM" or "14:00") into ISO string without separators for iCal / Google
 */
function formatDateTime(dateStr: string, timeStr: string, addHours = 2): { start: string; end: string } {
  // Parse time
  const timeRegex = /(\d{1,2}):(\d{2})(?:\s*([AP]M))?/i;
  const match = timeStr.match(timeRegex);

  let hours = 10;
  let minutes = 0;

  if (match) {
    hours = parseInt(match[1], 10);
    minutes = parseInt(match[2], 10);
    const meridiem = match[3]?.toUpperCase();
    if (meridiem === "PM" && hours < 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
  }

  const [year, month, day] = dateStr.split("-").map(Number);
  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + addHours * 60 * 60 * 1000);

  const toCalFormat = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d+/g, "");
  };

  return {
    start: toCalFormat(startDate),
    end: toCalFormat(endDate),
  };
}

/**
 * Generate a Google Calendar event intent URL
 */
export function getGoogleCalendarUrl(event: ClubEvent): string {
  const { start, end } = formatDateTime(event.date, event.time);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `[${event.club.name}] ${event.title}`,
    dates: `${start}/${end}`,
    details: `${event.description}\n\nOrganized by: ${event.club.name}\nCampus ClubHub`,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Trigger an iCalendar (.ics) download for Apple Calendar, Outlook, etc.
 */
export function downloadIcsFile(event: ClubEvent): void {
  const { start, end } = formatDateTime(event.date, event.time);

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Campus ClubHub//College Events Portal//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:clubhub-${event.id}@campus.clubhub`,
    `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, "")}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:[${event.club.name}] ${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
