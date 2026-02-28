import { useEffect, useRef, useState } from 'react';
import { useGetMyRole } from '../../hooks/useGetMyRole';
import { useGetAllUsers } from '../../hooks/useGetAllUsers';
import { useActor } from '../../hooks/useActor';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Loader2, ShieldAlert, Users, AlertTriangle } from 'lucide-react';
import { Role } from '../../backend';

const LOAD_TIMEOUT_MS = 8000;

function roleLabel(role: Role | undefined): string {
  if (role === undefined) return 'unknown';
  return role === Role.admin ? 'Admin' : 'User';
}

export default function UserManagement() {
  const { actor, isFetching: actorFetching } = useActor();
  const { data: roleData, isLoading: roleQueryLoading, isFetched: roleFetched } = useGetMyRole();

  // Local loading guard: stays true until the role has been fully resolved.
  const [roleLoading, setRoleLoading] = useState(true);
  // backendLoading tracks the ensureCallerUserExists async call
  const [backendLoading, setBackendLoading] = useState(false);

  // Timeout failsafe state
  const [timeoutError, setTimeoutError] = useState<{
    roleLoadingAtTimeout: boolean;
    backendLoadingAtTimeout: boolean;
  } | null>(null);

  // Refs to capture current loading state values inside the timeout callback
  const roleLoadingRef = useRef(roleLoading);
  const backendLoadingRef = useRef(backendLoading);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    roleLoadingRef.current = roleLoading;
  }, [roleLoading]);

  useEffect(() => {
    backendLoadingRef.current = backendLoading;
  }, [backendLoading]);

  // Hard timeout failsafe: if still loading after LOAD_TIMEOUT_MS, force-clear and show error
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      const rl = roleLoadingRef.current;
      const bl = backendLoadingRef.current;
      if (rl || bl) {
        setRoleLoading(false);
        setBackendLoading(false);
        setTimeoutError({ roleLoadingAtTimeout: rl, backendLoadingAtTimeout: bl });
      }
    }, LOAD_TIMEOUT_MS);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once the role query has completed and the actor is ready, mark role loading as done.
  useEffect(() => {
    if (!actorFetching && roleFetched) {
      setRoleLoading(false);
    }
  }, [actorFetching, roleFetched]);

  const isAdmin = roleData === Role.admin;

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useGetAllUsers({ enabled: isAdmin });

  const [ensureError, setEnsureError] = useState<string | null>(null);

  // On mount (once actor is ready), ensure the caller's user record exists,
  // then re-run the existing load-users logic.
  useEffect(() => {
    if (!actor || actorFetching) return;

    let cancelled = false;

    (async () => {
      setBackendLoading(true);
      try {
        await actor.ensureCallerUserExists();

        if (cancelled) return;

        refetchUsers();
      } catch (err) {
        if (!cancelled) {
          const errMsg = err instanceof Error ? err.message : String(err);
          setEnsureError(errMsg);
        }
      } finally {
        if (!cancelled) {
          setBackendLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // Run once when actor becomes available
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actor, actorFetching]);

  // Determine if we are in the initial loading phase
  const isInitialLoading = roleLoading || (backendLoading && !roleFetched);

  // ── LOADING STATE (replaces the old `return null`) ──────────────────────────
  if (isInitialLoading && !timeoutError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground text-base">Loading permissions &amp; users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Hard-timeout error box */}
      {timeoutError && (
        <Alert variant="destructive" className="max-w-2xl mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Loading timed out</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              Still loading role/backend after {LOAD_TIMEOUT_MS / 1000}s. Please refresh.
            </p>
            <p className="font-mono text-xs">
              debug: roleLoading={String(timeoutError.roleLoadingAtTimeout)}{' '}
              backendLoading={String(timeoutError.backendLoadingAtTimeout)}
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Error banner if ensureCallerUserExists fails */}
      {ensureError && (
        <Alert variant="destructive" className="max-w-2xl mb-6">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Failed to ensure user record</AlertTitle>
          <AlertDescription className="font-mono text-xs break-all">
            {ensureError}
          </AlertDescription>
        </Alert>
      )}

      {/* Not admin */}
      {!isAdmin && !timeoutError && (
        <div className="flex items-center justify-center py-16">
          <Card className="max-w-md w-full">
            <CardContent className="flex flex-col items-center gap-3 py-10">
              <ShieldAlert className="h-12 w-12 text-destructive" />
              <p className="text-center text-lg font-medium text-destructive">
                Admin access required (role={roleLabel(roleData)})
              </p>
              <p className="text-center text-sm text-muted-foreground">
                You do not have permission to view this page.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Admin view */}
      {isAdmin && (
        <>
          {/* Loading users */}
          {usersLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-3 text-muted-foreground">Loading users...</span>
            </div>
          )}

          {/* Error fetching users */}
          {!usersLoading && usersError && (
            <Alert variant="destructive" className="max-w-2xl">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Failed to load users</AlertTitle>
              <AlertDescription className="font-mono text-xs break-all">
                {usersError instanceof Error ? usersError.message : String(usersError)}
              </AlertDescription>
            </Alert>
          )}

          {/* Users table */}
          {!usersLoading && !usersError && users && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  All Users ({users.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {users.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No users yet — have someone log in once.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Principal</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.principalText}>
                          <TableCell className="font-mono text-xs break-all">
                            {user.principalText}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.role === Role.admin ? 'default' : 'secondary'}
                            >
                              {roleLabel(user.role)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
