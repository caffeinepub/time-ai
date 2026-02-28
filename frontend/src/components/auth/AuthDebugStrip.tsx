import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetMyRole } from '../../hooks/useGetMyRole';
import { Role } from '../../backend';

export default function AuthDebugStrip() {
  const { identity } = useInternetIdentity();
  const { data: roleData, isLoading: roleLoading, error: roleError } = useGetMyRole();

  const isAuthenticated = !!identity;
  const principal = isAuthenticated ? identity.getPrincipal().toString() : 'anonymous';

  let roleDisplay = 'loading...';
  let backendDisplay = 'loading...';

  if (!roleLoading) {
    if (roleError) {
      const errMsg = roleError instanceof Error ? roleError.message : String(roleError);
      roleDisplay = 'ERROR';
      backendDisplay = `ERROR: ${errMsg}`;
    } else if (roleData !== undefined) {
      roleDisplay = roleData === Role.admin ? 'Admin' : 'User';
      backendDisplay = 'OK';
    } else if (!isAuthenticated) {
      roleDisplay = 'N/A';
      backendDisplay = 'N/A (not logged in)';
    }
  }

  return (
    <div
      style={{ zIndex: 99999 }}
      className="fixed bottom-4 right-4 bg-black/85 text-white text-xs font-mono rounded-lg px-3 py-2 shadow-xl border border-white/20 max-w-xs pointer-events-none select-none"
    >
      <div className="font-bold text-yellow-400 mb-1">Debug v1</div>
      <div>
        <span className="text-white/60">Auth: </span>
        <span className={isAuthenticated ? 'text-green-400' : 'text-red-400'}>
          {isAuthenticated ? 'Logged In' : 'Logged Out'}
        </span>
      </div>
      <div className="truncate max-w-[240px]">
        <span className="text-white/60">Principal: </span>
        <span className="text-blue-300">{principal}</span>
      </div>
      <div>
        <span className="text-white/60">Role: </span>
        <span className="text-purple-300">{roleDisplay}</span>
      </div>
      <div className="truncate max-w-[240px]">
        <span className="text-white/60">Backend: </span>
        <span className={backendDisplay === 'OK' ? 'text-green-400' : backendDisplay.startsWith('ERROR') ? 'text-red-400' : 'text-white/60'}>
          {backendDisplay}
        </span>
      </div>
    </div>
  );
}
