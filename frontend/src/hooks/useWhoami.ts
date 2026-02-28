import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useWhoami() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<string>({
    queryKey: ['whoami'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.whoami();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });
}
