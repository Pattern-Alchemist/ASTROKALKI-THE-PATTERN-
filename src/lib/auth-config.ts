/**
 * Authentication Configuration
 * Supports role-based access control (RBAC)
 */

export type UserRole = 'free' | 'member' | 'premium' | 'admin';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  subscriptionStatus?: 'active' | 'cancelled' | 'expired';
  subscriptionExpiry?: Date;
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: Date;
}

export const ROLE_PERMISSIONS = {
  free: {
    canAccessAssessment: true,
    canViewPatternLibrary: true,
    canAccessConsultation: false,
    canAccessMemberContent: false,
    canExportData: false,
  },
  member: {
    canAccessAssessment: true,
    canViewPatternLibrary: true,
    canAccessConsultation: true,
    canAccessMemberContent: true,
    canExportData: false,
  },
  premium: {
    canAccessAssessment: true,
    canViewPatternLibrary: true,
    canAccessConsultation: true,
    canAccessMemberContent: true,
    canExportData: true,
  },
  admin: {
    canAccessAssessment: true,
    canViewPatternLibrary: true,
    canAccessConsultation: true,
    canAccessMemberContent: true,
    canExportData: true,
    canManageUsers: true,
    canViewMetrics: true,
    canManageContent: true,
  },
};

export function hasPermission(
  role: UserRole,
  permission: keyof typeof ROLE_PERMISSIONS['free']
): boolean {
  const permissions = ROLE_PERMISSIONS[role] as Record<string, any>;
  return permissions?.[permission] ?? false;
}

export function getRoleLevel(role: UserRole): number {
  const levels = {
    free: 0,
    member: 1,
    premium: 2,
    admin: 999,
  };
  return levels[role] || 0;
}

// Check if user is expired
export function isSubscriptionExpired(user: User): boolean {
  if (!user.subscriptionExpiry) return false;
  return new Date() > new Date(user.subscriptionExpiry);
}

// Check if user can access feature
export function canAccessFeature(
  user: User,
  feature: keyof typeof ROLE_PERMISSIONS['free']
): boolean {
  // Check if subscription is expired
  if (
    user.subscriptionStatus === 'cancelled' ||
    isSubscriptionExpired(user)
  ) {
    // Downgrade to free tier
    user.role = 'free';
  }

  return hasPermission(user.role, feature);
}
