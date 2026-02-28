import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Role } from '../backend';

function mapRoleString(roleStr: string): Role {
  return roleStr === 'Admin' ? Role.admin : Role.user;
}

export function useGetMyRole() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<Role>({
    queryKey: ['myRole'],
    queryFn: async (): Promise<Role> => {
      if (!actor) throw new Error('Actor not available');
      const roleStr = await actor.getMyRole();
      return mapRoleString(roleStr);
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
