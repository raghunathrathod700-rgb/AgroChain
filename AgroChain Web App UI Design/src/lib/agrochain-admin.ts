import { apiFetch } from "@/lib/agrochain-auth";

export type AdminUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  blocked: boolean;
  enabled: boolean;
  roles: string[];
};

export type AdminOrder = {
  id: number;
  buyerId: number;
  buyerDisplayName: string;
  productId: number;
  productName: string;
  farmerId: number;
  farmerName: string;
  quantity: number;
  totalPrice: number;
  deliveryAddress: string;
  status: string;
  orderedAt: string;
  updatedAt: string;
};

export type ActivityLog = {
  id: number;
  actorUserId: number;
  action: string;
  detail: string;
  entityType: string;
  entityId: number;
  createdAt: string;
};

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = res.statusText || "Request failed";
    try {
      const body = (await res.json()) as { message?: string };
      if (body?.message) message = body.message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  return (await res.json()) as T;
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  const res = await apiFetch("/v1/admin/users");
  return parseJson(res);
}

export async function fetchAdminOrders(): Promise<AdminOrder[]> {
  const res = await apiFetch("/v1/admin/orders");
  return parseJson(res);
}

export async function fetchAdminActivity(): Promise<ActivityLog[]> {
  const res = await apiFetch("/v1/admin/activity");
  return parseJson(res);
}

export async function blockAdminUser(id: number): Promise<AdminUser> {
  const res = await apiFetch(`/v1/admin/users/${id}/block`, { method: "PATCH" });
  return parseJson(res);
}

export async function unblockAdminUser(id: number): Promise<AdminUser> {
  const res = await apiFetch(`/v1/admin/users/${id}/unblock`, { method: "PATCH" });
  return parseJson(res);
}

export function roleLabel(roles: string[]): string {
  if (roles.includes("ROLE_FARMER")) return "Farmer";
  if (roles.includes("ROLE_BUYER")) return "Buyer";
  if (roles.includes("ROLE_ADMIN")) return "Admin";
  return roles[0] ?? "User";
}

export function orderStatusLabel(status: string): string {
  switch (status) {
    case "DELIVERED":
      return "Completed";
    case "SHIPPED":
      return "In Transit";
    case "PENDING":
      return "Pending";
    case "REJECTED":
      return "Cancelled";
    case "ACCEPTED":
      return "Accepted";
    default:
      return status;
  }
}
