import { Outlet, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, Heart } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useNavbarOverflow } from '@/hooks/useNavbarOverflow';

interface MenuItem {
  label: string;
  items: Array<{ label: string; path?: string; icon?: string; submenu?: Array<{ label: string; path: string }> }>;
}

export function AppLayout() {
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const authButtonText = loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        console.error('Login error:', error);
        if (error instanceof Error && error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setMobileMenuOpen(false);
  };

  // Define all menu items
  const menuItems: MenuItem[] = [
    {
      label: 'TIME AI',
      items: [
        { label: 'Agent Registry', path: '/agent-registry' },
        { label: 'Agent Passports', path: '/agent-passports' },
        { label: 'Evidence & Compliance Map', path: '/time-ai/evidence-compliance-map' },
        { label: 'Capability Proof Generator', path: '/agent-capability-proof-generator' },
        { label: 'Value Dashboard', path: '/value-dashboard' },
        { label: '🧩 Agent Templates', path: '/timeai/agent-templates' },
        { label: '🏥 Agent Health Monitor', path: '/timeai/agent-health-monitor' },
        { label: '📡 Agent Activity Feed', path: '/timeai/agent-activity-feed' },
        { label: '⚠️ Risk Dashboard', path: '/timeai/risk-dashboard' },
        { label: '⚙️ Agent Settings', path: '/timeai/agent-settings' },
      ],
    },
    {
      label: 'TRAV AI',
      items: [
        { label: '🎨 Design Your AI Agent', path: '/trav-ai/design-your-ai-agent' },
        { label: '💬 AI Talk', path: '/community/ai-talk' },
        { label: '🧪 Simulation Sandbox', path: '/trav-ai/simulation-sandbox' },
        { label: '📚 Training Modules', path: '/trav-ai/training-modules' },
        { label: '🔮 Drift Prediction', path: '/trav-ai/drift-prediction' },
        { label: '🧠 Cognitive Telemetry', path: '/trav-ai/cognitive-telemetry' },
      ],
    },
    {
      label: 'Workflow Management',
      items: [
        { label: '📦 Workflow Packs', path: '/workflow-pack-marketplace' },
        { label: '⚙️ Workflow Builder', path: '/workflow-builder' },
        { label: '🏭 Industry Kits', path: '/industry-kits' },
        { label: '🧪 Testing Sandbox', path: '/testing-sandbox' },
        { label: '▶️ Execution History', path: '/workflow-management/execution-history' },
        { label: '⏱ Scheduled Workflows', path: '/workflow-management/scheduled-workflows' },
      ],
    },
    {
      label: 'Governance, Policy & Compliance',
      items: [
        { label: '⚖️ AI Notary', path: '/ai-notary' },
        { label: '📋 Policy Engine', path: '/policy-engine' },
        { label: '🔄 Version Control', path: '/version-control' },
        { label: '📊 Compliance Reports', path: '/compliance-reports' },
        { label: '⚠️ Policy Conflicts', path: '/policy-conflicts' },
        { label: '🧾 Audit Logs', path: '/audit-logs' },
        { label: '👥 Role Permissions', path: '/role-permissions' },
      ],
    },
    {
      label: 'Partner Connections & Infrastructure',
      items: [
        { label: '🔌 Partner Integration Layer', path: '/partner-integration' },
        { label: '🌐 Global Rails Integration', path: '/global-rails-integration' },
        { label: '📡 Integration Rollout', path: '/integration-rollout' },
        { label: '🔗 Webhooks', path: '/webhooks' },
        { label: '📦 Integration Marketplace', path: '/integration-marketplace' },
        { label: '🔑 API Keys', path: '/api-keys' },
        { label: '📖 API Documentation', path: '/api-documentation' },
        { label: '✅ Connection Status', path: '/connection-status' },
      ],
    },
    {
      label: 'Solutions',
      items: [
        { label: '🏢 Solutions Catalog', path: '/solutions' },
        { label: '🔧 Functions & Use Cases', path: '/solutions/functions-use-cases' },
        { label: "🌍 World's First", path: '/worlds-first' },
        { label: '🌾 Commodities', path: '/dashboards/commodities' },
        { label: '📖 Case Studies', path: '/solutions/case-studies' },
        { label: '🔍 Problem Solver', path: '/solutions/problem-solver' },
      ],
    },
    {
      label: 'Marketplace',
      items: [
        { label: '🤖 Agent Marketplace', path: '/marketplace/agent' },
        { label: '📦 Workflow Marketplace', path: '/marketplace/workflow' },
        { label: '🔌 Integration Marketplace', path: '/marketplace/integration' },
        { label: '💰 Monetization', path: '/marketplace/monetization' },
      ],
    },
    {
      label: 'Operations',
      items: [
        { label: '🏗️ Platform Additions', path: '/operations/platform-additions' },
        { label: '📊 Next Upgrade', path: '/operations/next-upgrade' },
        { label: '💼 AI Tax Assistance', path: '/operations/ai-tax-assistance' },
        { label: '🏢 Enterprise Onboarding', path: '/operations/enterprise-onboarding' },
        { label: '🏦 RWA Dashboard', path: '/dashboards/rwa' },
        { label: '📡 System Status', path: '/operations/system-status' },
        { label: '👥 User Management', path: '/operations/user-management' },
      ],
    },
    {
      label: 'Resources',
      items: [
        { label: '📰 News', path: '/community/news' },
        { label: '📘 Documentation', path: '/resources/documentation' },
        { label: '🎓 Training', path: '/resources/training' },
        { label: '🤝 Partners', path: '/resources/partners' },
        { label: '💬 Support', path: '/resources/support' },
      ],
    },
    {
      label: 'Tokens',
      items: [
        {
          label: '💰 Tokenomics',
          submenu: [
            { label: 'TIME AI Tokenomics', path: '/time-ai/tokenomics' },
            { label: 'TRAV AI Tokenomics', path: '/trav-ai/tokenomics' },
          ],
        },
        { label: '💼 Wallet', path: '/tokens/wallet' },
        { label: '📈 Market Data', path: '/tokens/market-data' },
        { label: '🔄 Transactions', path: '/tokens/transactions' },
        { label: '🎁 Rewards & Staking', path: '/rewards-incentives' },
        { label: '📊 Analytics', path: '/tokens/analytics' },
        { label: '🐋 Whale Tracking', path: '/tokens/whale-tracking' },
        { label: '🗳 Token Governance', path: '/tokens/governance' },
      ],
    },
    {
      label: 'Trade',
      items: [
        { label: '📊 Trade Market', path: '/trade/market' },
        { label: '💰 Buy Tokens', path: '/trade/buy' },
        { label: '💱 Sell Tokens', path: '/trade/sell' },
        { label: '🔄 Convert', path: '/trade/convert' },
        { label: '📖 Order History', path: '/trade/history' },
        { label: '⏱ Open Orders', path: '/trade/open-orders' },
      ],
    },
  ];

  // Use overflow hook to determine which items should be visible
  const totalMenuItems = menuItems.length;
  const { visibleCount, overflowCount, containerRef, itemRefs } = useNavbarOverflow(totalMenuItems, {
    maxRows: 2,
    enabled: true,
  });

  // Split menu items into visible and overflow
  const visibleMenuItems = menuItems.slice(0, visibleCount);
  const overflowMenuItems = menuItems.slice(visibleCount);

  // Set refs for menu items
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, totalMenuItems);
  }, [totalMenuItems, itemRefs]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
          <div className="flex min-h-16 items-start justify-between py-3 gap-4">
            {/* Logo - Never wraps */}
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors shrink-0 whitespace-nowrap"
            >
              TIME AI
            </button>

            {/* Desktop Navigation - Multi-row wrapping with overflow handling */}
            <nav
              ref={containerRef}
              className="hidden md:flex flex-wrap items-start gap-x-6 gap-y-3 flex-1 justify-end max-w-full"
            >
              {/* Visible menu items */}
              {visibleMenuItems.map((menu, index) => (
                <div
                  key={menu.label}
                  ref={(el) => {
                    if (itemRefs.current) {
                      itemRefs.current[index] = el;
                    }
                  }}
                  className="shrink-0"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-1 whitespace-nowrap">
                        {menu.label}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {menu.items.map((item) => (
                        item.submenu ? (
                          <DropdownMenuSub key={item.label}>
                            <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              {item.submenu.map((subItem) => (
                                <DropdownMenuItem key={subItem.path} onClick={() => handleNavigation(subItem.path)}>
                                  {subItem.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        ) : (
                          <DropdownMenuItem key={item.path} onClick={() => item.path && handleNavigation(item.path)}>
                            {item.label}
                          </DropdownMenuItem>
                        )
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}

              {/* Overflow dropdown - only shown when there are overflow items */}
              {overflowCount > 0 && (
                <div
                  ref={(el) => {
                    if (itemRefs.current) {
                      itemRefs.current[visibleCount] = el;
                    }
                  }}
                  className="shrink-0"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-1 whitespace-nowrap">
                        More
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                          +{overflowCount}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {overflowMenuItems.map((menu) => (
                        <div key={menu.label}>
                          <DropdownMenuItem
                            className="font-semibold text-muted-foreground cursor-default"
                            onSelect={(e) => e.preventDefault()}
                          >
                            {menu.label}
                          </DropdownMenuItem>
                          {menu.items.map((item) => (
                            item.submenu ? (
                              <div key={item.label}>
                                <DropdownMenuItem
                                  className="pl-6 font-medium cursor-default"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  {item.label}
                                </DropdownMenuItem>
                                {item.submenu.map((subItem) => (
                                  <DropdownMenuItem
                                    key={subItem.path}
                                    onClick={() => handleNavigation(subItem.path)}
                                    className="pl-12"
                                  >
                                    {subItem.label}
                                  </DropdownMenuItem>
                                ))}
                              </div>
                            ) : (
                              <DropdownMenuItem
                                key={item.path}
                                onClick={() => item.path && handleNavigation(item.path)}
                                className="pl-6"
                              >
                                {item.label}
                              </DropdownMenuItem>
                            )
                          ))}
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              <Button variant="ghost" onClick={() => handleNavigation('/search')} className="shrink-0 whitespace-nowrap">
                Search
              </Button>

              <Button
                onClick={handleAuth}
                disabled={disabled}
                variant={isAuthenticated ? 'outline' : 'default'}
                size="sm"
                className="shrink-0 whitespace-nowrap"
              >
                {authButtonText}
              </Button>
            </nav>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden shrink-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <nav className="flex flex-col gap-4 mt-8">
                  <Button
                    onClick={handleAuth}
                    disabled={disabled}
                    variant={isAuthenticated ? 'outline' : 'default'}
                    className="w-full"
                  >
                    {authButtonText}
                  </Button>

                  {menuItems.map((menu) => (
                    <div key={menu.label} className="space-y-2">
                      <h3 className="font-semibold text-sm text-muted-foreground px-2">{menu.label}</h3>
                      {menu.items.map((item) => (
                        item.submenu ? (
                          <div key={item.label} className="space-y-1">
                            <div className="px-2 py-1 text-sm font-medium text-foreground">
                              {item.label}
                            </div>
                            {item.submenu.map((subItem) => (
                              <Button
                                key={subItem.path}
                                variant="ghost"
                                className="w-full justify-start pl-6"
                                onClick={() => handleNavigation(subItem.path)}
                              >
                                {subItem.label}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <Button
                            key={item.path}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => item.path && handleNavigation(item.path)}
                          >
                            {item.label}
                          </Button>
                        )
                      ))}
                    </div>
                  ))}

                  <Button variant="ghost" onClick={() => handleNavigation('/search')} className="w-full justify-start">
                    Search
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} TIME AI. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'unknown-app'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
