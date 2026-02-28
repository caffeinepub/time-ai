import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Info, Lock, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PredictableLatencyChannelConfig, PresetKey, Preset } from '../../hooks/usePredictableLatencyChannelConfig';
import { PresetPicker } from './PresetPicker';

export interface PredictableLatencyChannelStatusSummaryCardProps {
  statusSummary: string;
  warningCount: number;
  channelConfig: PredictableLatencyChannelConfig;
  onChannelConfigChange: (updates: Partial<PredictableLatencyChannelConfig>) => void;
  currentPreset: PresetKey;
  onPresetChange: (preset: PresetKey) => void;
  presets: Preset[];
  disabled?: boolean;
}

export function PredictableLatencyChannelStatusSummaryCard({
  statusSummary,
  warningCount,
  channelConfig,
  onChannelConfigChange,
  currentPreset,
  onPresetChange,
  presets,
  disabled = false,
}: PredictableLatencyChannelStatusSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Predictable-Latency Channel
        </CardTitle>
        <CardDescription>Monitor real-time status and configure channel behavior for multi-source ingestion</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Status Summary Section */}
          <div className="space-y-3">
            <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
              <h3 className="text-lg font-semibold text-foreground leading-tight">Status Summary</h3>
              <div className="shrink-0">
                {warningCount > 0 ? (
                  <Badge variant="destructive" className="gap-1.5 text-sm px-3 py-1.5 whitespace-nowrap font-semibold">
                    <AlertTriangle className="h-4 w-4" />
                    {warningCount} {warningCount === 1 ? 'Warning' : 'Warnings'}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1.5 text-sm px-3 py-1.5 whitespace-nowrap font-semibold border-green-600/30 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30">
                    <CheckCircle2 className="h-4 w-4" />
                    0 Warnings
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-4 bg-muted/40 rounded-lg border border-border/50">
              <p className="text-sm leading-relaxed text-foreground/90 max-w-prose">{statusSummary}</p>
            </div>
          </div>
          
          {/* Channel Configuration Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
              <h3 className="text-lg font-semibold text-foreground leading-tight">Channel Configuration</h3>
              {disabled && (
                <Badge variant="outline" className="gap-1.5 text-xs">
                  <Lock className="h-3 w-3" />
                  Locked
                </Badge>
              )}
            </div>

            {/* Disabled state notice */}
            {disabled && (
              <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-md border border-border/50">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Configuration is locked while the channel is running. Stop the run to modify settings.
                </p>
              </div>
            )}

            {/* Preset Picker */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Configuration Preset
                </Label>
                
                {/* Quick Start guidance */}
                <div className="flex items-start gap-2 p-3 bg-card rounded-md border border-border">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1 text-xs text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">Quick Start</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span>Select a preset</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>Customize if needed</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>Start the run</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <PresetPicker
                presets={presets}
                currentPreset={currentPreset}
                channelConfig={channelConfig}
                onPresetChange={onPresetChange}
                disabled={disabled}
              />
            </div>

            {/* Individual Settings */}
            <div className="pt-4 border-t space-y-3">
              <div>
                <Label className="text-sm font-medium">Individual Settings</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Fine-tune configuration (switches to Custom preset when modified)
                </p>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-md border bg-card">
                <Checkbox
                  id="includePerSourceTiming"
                  checked={channelConfig.includePerSourceTiming}
                  onCheckedChange={(checked) => 
                    onChannelConfigChange({ includePerSourceTiming: checked === true })
                  }
                  disabled={disabled}
                  className="mt-0.5"
                />
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor="includePerSourceTiming"
                    className={`text-sm font-medium leading-none ${
                      disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                    }`}
                  >
                    Show per-source timing statistics
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Include average, min, max, and count for each source in the status summary
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
