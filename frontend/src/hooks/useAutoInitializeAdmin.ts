import { useEffect, useRef } from 'react';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { useGetMyRole } from './useGetMyRole';
import { Role } from '../backend';

// Must match ADMIN_PRINCIPALS in backend/main.mo
const ADMIN_PRINCIPALS: string[] = [
  'q5ida-vdwpr-bqbk4-ksxkw-77nif-xmn2v-wevql-eh4j2-urrl2-cd27f-6qe',
];

const SESSION_FLAG_KEY = 'autoInitializeAdmin_called';

export function useAutoInitializeAdmin() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const { data: role, isFetched: roleFetched } = useGetMyRole();
  const calledRef = useRef(false);

  useEffect(() => {
    // Guard: only run once per component lifecycle
    if (calledRef.current) return;
    // Guard: actor must be ready
    if (!actor || actorFetching) return;
    // Guard: user must be authenticated
    if (!identity) return;
    // Guard: role must be resolved
    if (!roleFetched) return;
    // Guard: only call if current role is NOT already Admin
    if (role === Role.admin) return;

    // Guard: only call if the authenticated principal is in ADMIN_PRINCIPALS
    const principalText = identity.getPrincipal().toString();
    if (!ADMIN_PRINCIPALS.includes(principalText)) return;

    // Guard: sessionStorage ensures idempotency across re-renders within the same session
    if (sessionStorage.getItem(SESSION_FLAG_KEY)) return;

    calledRef.current = true;
    sessionStorage.setItem(SESSION_FLAG_KEY, '1');

    actor.initializeAdmin().catch((err: unknown) => {
      console.error('initializeAdmin error (non-critical):', err);
    });
  }, [actor, actorFetching, identity, role, roleFetched]);
}
