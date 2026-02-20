import type { ModifierUser } from "./types";

export const SINGLE_USER: ModifierUser[] = [
  {
    id: "u1",
    name: "Alex Chen",
    modifiedAt: "2026-02-19T14:32:00Z",
    color: "#0176D3",
  },
];

export const FEW_USERS: ModifierUser[] = [
  { id: "u1", name: "Alex Chen",    modifiedAt: "2026-02-19T14:32:00Z" },
  { id: "u2", name: "Sarah Kim",    modifiedAt: "2026-02-18T09:15:00Z" },
  { id: "u3", name: "Mike Davis",   modifiedAt: "2026-02-17T11:00:00Z" },
];

export const MANY_USERS: ModifierUser[] = [
  { id: "u1", name: "Alex Chen",     modifiedAt: "2026-02-19T14:32:00Z" },
  { id: "u2", name: "Sarah Kim",     modifiedAt: "2026-02-18T09:15:00Z" },
  { id: "u3", name: "Mike Davis",    modifiedAt: "2026-02-17T11:00:00Z" },
  { id: "u4", name: "Priya Patel",   modifiedAt: "2026-02-16T16:45:00Z" },
  { id: "u5", name: "Jordan Torres", modifiedAt: "2026-02-14T08:30:00Z" },
  { id: "u6", name: "Lena Müller",   modifiedAt: "2026-02-12T13:10:00Z" },
  { id: "u7", name: "Omar Hassan",   modifiedAt: "2026-02-10T10:55:00Z" },
];

export const MIXED_USERS: ModifierUser[] = [
  {
    id: "u1",
    name: "Alex Chen",
    avatarUrl: "https://i.pravatar.cc/80?img=3",
    modifiedAt: "2026-02-19T14:32:00Z",
  },
  { id: "u2", name: "Sarah Kim",  modifiedAt: "2026-02-18T09:15:00Z", color: "#9050E9" },
  {
    id: "u3",
    name: "Mike Davis",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
    modifiedAt: "2026-02-17T11:00:00Z",
  },
  { id: "u4", name: "Priya Patel", modifiedAt: "2026-02-16T16:45:00Z", color: "#E07735" },
];
