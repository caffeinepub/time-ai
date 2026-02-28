import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { AgentStatus } from '@/backend';

interface AgentStatusBadgeProps {
  status: AgentStatus;
}

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case AgentStatus.active:
        return {
          icon: CheckCircle2,
          label: 'Active',
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400',
          ariaLabel: 'Agent status: Active',
        };
      case AgentStatus.suspended:
        return {
          icon: XCircle,
          label: 'Suspended',
          variant: 'destructive' as const,
          className: '',
          ariaLabel: 'Agent status: Suspended',
        };
      case AgentStatus.pending:
        return {
          icon: Clock,
          label: 'Pending Approval',
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400',
          ariaLabel: 'Agent status: Pending Approval',
        };
      default:
        return {
          icon: Clock,
          label: 'Unknown',
          variant: 'secondary' as const,
          className: '',
          ariaLabel: 'Agent status: Unknown',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={`inline-flex items-center gap-1.5 ${config.className}`}
      aria-label={config.ariaLabel}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{config.label}</span>
    </Badge>
  );
}
