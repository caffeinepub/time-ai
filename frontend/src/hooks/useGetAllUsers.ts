import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Role } from '../backend';

export interface UserEntry {
  principalText: string;
  role: Role;
}

interface UseGetAllUsersOptions {
  enabled?: boolean;
}

export function useGetAllUsers({ enabled = true }: UseGetAllUsersOptions = {}) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserEntry[]>({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      // Ensure the admin principal is registered in roleMap so getAllUsers() doesn't trap.
      // initializeAdmin() is a no-op if the caller is not in ADMIN_PRINCIPALS, and safe to call repeatedly.
      try {
        await actor.initializeAdmin();
      } catch {
        // Non-admin callers will get "Not authorized" — that's fine, ignore it.
      }

      const tuples = await actor.getAllUsers();
      return tuples.map(([principal, role]) => ({
        principalText: principal.toString(),
        role,
      }));
    },
    enabled: !!actor && !actorFetching && enabled,
    retry: 1,
  });
}
