import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

export function permissions({ session }) {
  return {
    canManageProducts() {
      return session?.data.role?.canManageProducts;
    },
  };
}
