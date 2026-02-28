import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { FileCheck, CheckCircle2, Calendar, User, Layers, ShieldCheck, AlertTriangle, Download, FileText, FileJson, FileType, Copy, Upload, FileSearch } from 'lucide-react';
import { VerificationStatus } from '@/backend';
import { sanitizeFilename, formatTimestampForFilename, triggerDownload, generatePDFFromHTML } from '@/utils/fileDownload';
import { computeTextHash, hashToHex } from '@/components/notary/HashUtils';
import { parseTextProof, parseJSONProof, parsePDFProof } from '@/components/notary/ProofParser';
import { verifyProof } from '@/components/notary/ProofVerifier';
import { ProofVerificationResult } from '@/components/notary/ProofVerificationResult';
import { VerificationResult } from '@/types/proof';
import { toast } from 'sonner';

interface ProofData {
  agentName: string;
  agentType: string;
  capabilities: string[];
  verificationStatus: VerificationStatus;
  timestamp: Date;
}

type ProofFormat = 'pdf' | 'json' | 'text';
type VerifyInputMode = 'file' | 'paste';

export function AgentCapabilityProofGenerator() {
  // Generation state
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(VerificationStatus.pending);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [generatedProof, setGeneratedProof] = useState<ProofData | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ProofFormat>('json');
  const [signature, setSignature] = useState<string>('');

  // Verification state
  const [verifyInputMode, setVerifyInputMode] = useState<VerifyInputMode>('file');
  const [verifyFile, setVerifyFile] = useState<File | null>(null);
  const [verifyPastedContent, setVerifyPastedContent] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const capabilities = [
    'Workflow Orchestration',
    'Policy Enforcement',
    'Risk Assessment',
    'Compliance Monitoring',
    'Data Analysis',
    'Decision Support',
  ];

  const agentTypeLabels: Record<string, string> = {
    'time-orchestrator': 'TIME Orchestrator',
    'trav-navigator': 'TRAV Navigator',
    'policy-sentinel': 'Policy Sentinel',
    'custom-agent': 'Custom Agent',
  };

  // Load format from sessionStorage on mount
  useEffect(() => {
    const savedFormat = sessionStorage.getItem('proofFormat');
    if (savedFormat && (savedFormat === 'pdf' || savedFormat === 'json' || savedFormat === 'text')) {
      setSelectedFormat(savedFormat as ProofFormat);
    }
  }, []);

  // Save format to sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('proofFormat', selectedFormat);
  }, [selectedFormat]);

  // Compute signature whenever proof data changes
  useEffect(() => {
    if (!generatedProof) {
      setSignature('');
      return;
    }

    const computeSignature = async () => {
      // Create canonical string from proof data
      const canonicalData = [
        `agentName:${generatedProof.agentName}`,
        `agentType:${generatedProof.agentType}`,
        `capabilities:${generatedProof.capabilities.sort().join(',')}`,
        `verificationStatus:${generatedProof.verificationStatus}`,
        `timestamp:${generatedProof.timestamp.toISOString()}`,
      ].join('|');

      // Compute SHA-256 hash
      const hashBytes = await computeTextHash(canonicalData);
      const hexSignature = hashToHex(hashBytes);
      setSignature(hexSignature);
    };

    computeSignature();
  }, [generatedProof]);

  const handleCapabilityToggle = (capability: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(capability)
        ? prev.filter((c) => c !== capability)
        : [...prev, capability]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate proof data
    const proof: ProofData = {
      agentName,
      agentType,
      capabilities: selectedCapabilities,
      verificationStatus,
      timestamp: new Date(),
    };
    
    setGeneratedProof(proof);
  };

  const handleCopySignature = async () => {
    if (!signature) return;

    try {
      await navigator.clipboard.writeText(signature);
      toast.success('Signature copied to clipboard', {
        description: 'The cryptographic signature has been copied successfully.',
        duration: 3000,
      });
    } catch (error) {
      toast.error('Failed to copy signature', {
        description: 'Please try again or copy manually.',
        duration: 3000,
      });
    }
  };

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
  };

  const getVerificationStatusText = (status: VerificationStatus): string => {
    switch (status) {
      case VerificationStatus.verified:
        return 'Verified';
      case VerificationStatus.pending:
        return 'Pending Verification';
      case VerificationStatus.suspended:
        return 'Suspended';
      case VerificationStatus.unverified:
        return 'Unverified';
      default:
        return 'Unknown';
    }
  };

  const generateTextProof = (proof: ProofData, sig: string): string => {
    const lines = [
      '═══════════════════════════════════════════════════════════',
      '           AGENT CAPABILITY PROOF DOCUMENT',
      '═══════════════════════════════════════════════════════════',
      '',
      'AGENT INFORMATION',
      '─────────────────────────────────────────────────────────',
      `Agent Name: ${proof.agentName}`,
      `Agent Type: ${agentTypeLabels[proof.agentType] || proof.agentType}`,
      `Verification Status: ${getVerificationStatusText(proof.verificationStatus)}`,
      '',
      'CAPABILITIES',
      '─────────────────────────────────────────────────────────',
    ];

    if (proof.capabilities.length > 0) {
      proof.capabilities.forEach((capability, index) => {
        lines.push(`  ${index + 1}. ${capability}`);
      });
    } else {
      lines.push('  No capabilities selected');
    }

    lines.push('');
    lines.push('DOCUMENT METADATA');
    lines.push('─────────────────────────────────────────────────────────');
    lines.push(`Generated On: ${formatTimestamp(proof.timestamp)}`);
    lines.push(`Document Type: Agent Capability Proof`);
    lines.push('');
    lines.push('DIGITAL SIGNATURE');
    lines.push('─────────────────────────────────────────────────────────');
    lines.push(`${sig}`);
    lines.push('');
    lines.push('═══════════════════════════════════════════════════════════');
    lines.push('This document was generated by TIME AI Governance System');
    lines.push('═══════════════════════════════════════════════════════════');

    return lines.join('\n');
  };

  const generateJSONProof = (proof: ProofData, sig: string): string => {
    const jsonData = {
      documentType: 'Agent Capability Proof',
      agent: {
        name: proof.agentName,
        type: agentTypeLabels[proof.agentType] || proof.agentType,
        typeCode: proof.agentType,
      },
      verification: {
        status: getVerificationStatusText(proof.verificationStatus),
        statusCode: proof.verificationStatus,
      },
      capabilities: proof.capabilities.length > 0 ? proof.capabilities : [],
      metadata: {
        generatedAt: proof.timestamp.toISOString(),
        generatedBy: 'TIME AI Governance System',
        version: '1.0',
      },
      signature: sig,
    };

    return JSON.stringify(jsonData, null, 2);
  };

  const generatePDFHTML = (proof: ProofData, sig: string): string => {
    const capabilitiesHTML = proof.capabilities.length > 0
      ? proof.capabilities.map((cap, idx) => `<li>${idx + 1}. ${cap}</li>`).join('')
      : '<li>No capabilities selected</li>';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Agent Capability Proof - ${proof.agentName}</title>
          <style>
            body {
              font-family: Arial, Helvetica, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              line-height: 1.6;
              color: #333;
            }
            h1 {
              text-align: center;
              color: #1a1a1a;
              border-bottom: 3px solid #333;
              padding-bottom: 10px;
              margin-bottom: 30px;
            }
            h2 {
              color: #1a1a1a;
              margin-top: 30px;
              margin-bottom: 15px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
            }
            .info-row {
              margin: 10px 0;
              padding: 8px 0;
            }
            .info-label {
              font-weight: bold;
              display: inline-block;
              width: 180px;
            }
            .info-value {
              display: inline-block;
            }
            ul {
              list-style: none;
              padding-left: 0;
            }
            li {
              margin: 8px 0;
              padding-left: 20px;
            }
            .signature {
              font-family: 'Courier New', monospace;
              font-size: 11px;
              word-break: break-all;
              background-color: #f5f5f5;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 4px;
              margin-top: 10px;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #ccc;
              text-align: center;
              font-size: 12px;
              color: #666;
              font-style: italic;
            }
            @media print {
              body {
                margin: 0;
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <h1>AGENT CAPABILITY PROOF</h1>
          
          <h2>Agent Information</h2>
          <div class="info-row">
            <span class="info-label">Agent Name:</span>
            <span class="info-value">${proof.agentName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Agent Type:</span>
            <span class="info-value">${agentTypeLabels[proof.agentType] || proof.agentType}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Verification Status:</span>
            <span class="info-value">${getVerificationStatusText(proof.verificationStatus)}</span>
          </div>
          
          <h2>Capabilities</h2>
          <ul>
            ${capabilitiesHTML}
          </ul>
          
          <h2>Document Metadata</h2>
          <div class="info-row">
            <span class="info-label">Generated On:</span>
            <span class="info-value">${formatTimestamp(proof.timestamp)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Document Type:</span>
            <span class="info-value">Agent Capability Proof</span>
          </div>
          
          <h2>Digital Signature</h2>
          <div class="signature">${sig}</div>
          
          <div class="footer">
            This document was generated by TIME AI Governance System
          </div>
        </body>
      </html>
    `;
  };

  const handleDownload = () => {
    if (!generatedProof || !signature) return;

    const timestamp = formatTimestampForFilename(generatedProof.timestamp);
    const sanitizedName = sanitizeFilename(generatedProof.agentName);
    const baseFilename = `agent-capability-proof-${sanitizedName}-${timestamp}`;

    switch (selectedFormat) {
      case 'pdf': {
        const htmlContent = generatePDFHTML(generatedProof, signature);
        generatePDFFromHTML(htmlContent, `${baseFilename}.pdf`);
        break;
      }
      case 'json': {
        const jsonContent = generateJSONProof(generatedProof, signature);
        triggerDownload(jsonContent, `${baseFilename}.json`, 'application/json');
        break;
      }
      case 'text': {
        const textContent = generateTextProof(generatedProof, signature);
        triggerDownload(textContent, `${baseFilename}.txt`, 'text/plain');
        break;
      }
    }
  };

  const getProofContent = (): string => {
    if (!generatedProof || !signature) return '';

    switch (selectedFormat) {
      case 'json':
        return generateJSONProof(generatedProof, signature);
      case 'text':
        return generateTextProof(generatedProof, signature);
      case 'pdf':
        return 'PDF preview not available. Click "Download Proof" to generate the PDF file.';
      default:
        return '';
    }
  };

  // Get verification status display
  const getVerificationDisplay = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.verified:
        return {
          badge: (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 text-base px-4 py-1.5">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Verified
            </Badge>
          ),
          details: (
            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                    Agent Verified
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    This agent has been verified by TIME AI Governance Authority. Verification Date: {formatTimestamp(new Date())}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                    <strong>Verification Authority:</strong> TIME AI Governance Board
                  </p>
                </div>
              </div>
            </div>
          ),
        };
      case VerificationStatus.pending:
        return {
          badge: (
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 text-base px-4 py-1.5">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Pending Verification
            </Badge>
          ),
          details: (
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                    Verification Pending
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This agent is awaiting verification by TIME AI Governance Authority. Verification is currently in progress and will be completed within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          ),
        };
      case VerificationStatus.suspended:
        return {
          badge: (
            <Badge variant="destructive" className="text-base px-4 py-1.5">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Suspended
            </Badge>
          ),
          details: (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">
                    Agent Suspended - Not Currently Authorized
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    This agent's verification has been suspended by TIME AI Governance Authority. The agent is not authorized for production use until verification is reinstated.
                  </p>
                </div>
              </div>
            </div>
          ),
        };
      case VerificationStatus.unverified:
        return {
          badge: (
            <Badge variant="secondary" className="text-base px-4 py-1.5">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Unverified
            </Badge>
          ),
          details: (
            <div className="bg-gray-50 dark:bg-gray-900/10 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Unverified Agent - Use with Caution
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    This agent has not been verified by TIME AI Governance Authority. Use in production environments is not recommended until verification is completed.
                  </p>
                </div>
              </div>
            </div>
          ),
        };
      default:
        return {
          badge: (
            <Badge variant="secondary" className="text-base px-4 py-1.5">
              Unknown Status
            </Badge>
          ),
          details: null,
        };
    }
  };

  // Verification handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVerifyFile(file);
      setVerificationResult(null);
    }
  };

  const handleVerifySubmit = async () => {
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      let proofData;

      if (verifyInputMode === 'file') {
        if (!verifyFile) {
          toast.error('No file selected', {
            description: 'Please select a proof file to verify.',
            duration: 3000,
          });
          setIsVerifying(false);
          return;
        }

        // Parse based on file type
        const fileExtension = verifyFile.name.split('.').pop()?.toLowerCase();
        
        if (fileExtension === 'json') {
          const content = await verifyFile.text();
          proofData = parseJSONProof(content);
        } else if (fileExtension === 'txt') {
          const content = await verifyFile.text();
          proofData = parseTextProof(content);
        } else if (fileExtension === 'pdf' || fileExtension === 'html') {
          proofData = await parsePDFProof(verifyFile);
        } else {
          throw new Error('Unsupported file format. Please upload a PDF, JSON, or TXT file.');
        }
      } else {
        // Parse pasted content
        if (!verifyPastedContent.trim()) {
          toast.error('No content provided', {
            description: 'Please paste proof content to verify.',
            duration: 3000,
          });
          setIsVerifying(false);
          return;
        }

        // Try to detect format and parse
        const trimmedContent = verifyPastedContent.trim();
        if (trimmedContent.startsWith('{')) {
          proofData = parseJSONProof(trimmedContent);
        } else {
          proofData = parseTextProof(trimmedContent);
        }
      }

      // Verify the proof
      const result = await verifyProof(proofData);
      setVerificationResult(result);

      if (result.isValid) {
        toast.success('Proof verified successfully', {
          description: 'The proof is valid and has not been tampered with.',
          duration: 4000,
        });
      } else {
        toast.error('Proof verification failed', {
          description: 'The proof signature does not match. The document may have been altered.',
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error('Verification error', {
        description: error instanceof Error ? error.message : 'Failed to verify proof. Please check the file format.',
        duration: 5000,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClearVerification = () => {
    setVerifyFile(null);
    setVerifyPastedContent('');
    setVerificationResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SectionHeader
        title="Agent Capability Proof Generator"
        subtitle="Generate and verify cryptographically signed capability proofs for AI agents"
        icon={<FileCheck className="h-8 w-8" />}
      />

      <Tabs defaultValue="generate" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="generate">Generate Proof</TabsTrigger>
          <TabsTrigger value="verify">Verify Proof</TabsTrigger>
        </TabsList>

        {/* Generate Proof Tab */}
        <TabsContent value="generate" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Agent Information</CardTitle>
                <CardDescription>
                  Enter the agent details to generate a capability proof
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Agent Name */}
                  <div className="space-y-2">
                    <Label htmlFor="agentName">Agent Name</Label>
                    <Input
                      id="agentName"
                      placeholder="e.g., Production Orchestrator Alpha"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Agent Type */}
                  <div className="space-y-2">
                    <Label htmlFor="agentType">Agent Type</Label>
                    <Select value={agentType} onValueChange={setAgentType} required>
                      <SelectTrigger id="agentType">
                        <SelectValue placeholder="Select agent type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(agentTypeLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Verification Status */}
                  <div className="space-y-2">
                    <Label htmlFor="verificationStatus">Verification Status</Label>
                    <Select
                      value={verificationStatus}
                      onValueChange={(value) => setVerificationStatus(value as VerificationStatus)}
                    >
                      <SelectTrigger id="verificationStatus">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={VerificationStatus.verified}>Verified</SelectItem>
                        <SelectItem value={VerificationStatus.pending}>Pending Verification</SelectItem>
                        <SelectItem value={VerificationStatus.suspended}>Suspended</SelectItem>
                        <SelectItem value={VerificationStatus.unverified}>Unverified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-3">
                    <Label>Capabilities</Label>
                    <div className="space-y-2">
                      {capabilities.map((capability) => (
                        <div key={capability} className="flex items-center space-x-2">
                          <Checkbox
                            id={capability}
                            checked={selectedCapabilities.includes(capability)}
                            onCheckedChange={() => handleCapabilityToggle(capability)}
                          />
                          <Label
                            htmlFor={capability}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {capability}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proof Format */}
                  <div className="space-y-3">
                    <Label>Proof Format</Label>
                    <RadioGroup value={selectedFormat} onValueChange={(value) => setSelectedFormat(value as ProofFormat)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="json" id="format-json" />
                        <Label htmlFor="format-json" className="flex items-center gap-2 cursor-pointer font-normal">
                          <FileJson className="h-4 w-4" />
                          JSON
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="text" id="format-text" />
                        <Label htmlFor="format-text" className="flex items-center gap-2 cursor-pointer font-normal">
                          <FileType className="h-4 w-4" />
                          Text
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pdf" id="format-pdf" />
                        <Label htmlFor="format-pdf" className="flex items-center gap-2 cursor-pointer font-normal">
                          <FileText className="h-4 w-4" />
                          PDF
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" disabled={!agentName || !agentType}>
                    Generate Capability Proof
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Output Display */}
            <div className="space-y-6">
              {generatedProof && signature && (
                <>
                  {/* Verification Status Display */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5" />
                        Verification Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center">
                        {getVerificationDisplay(generatedProof.verificationStatus).badge}
                      </div>
                      {getVerificationDisplay(generatedProof.verificationStatus).details}
                    </CardContent>
                  </Card>

                  {/* Cryptographic Signature */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5" />
                        Digital Signature
                      </CardTitle>
                      <CardDescription>
                        SHA-256 cryptographic signature for proof authenticity
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted rounded-lg p-4">
                        <p className="text-xs font-mono break-all">{signature}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Generated: {formatTimestamp(generatedProof.timestamp)}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopySignature}
                        className="w-full"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Signature
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Proof Content Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Proof Content</CardTitle>
                      <CardDescription>
                        Preview of the generated proof document
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted rounded-lg p-4 max-h-96 overflow-auto">
                        <pre className="text-xs whitespace-pre-wrap font-mono">
                          {getProofContent()}
                        </pre>
                      </div>
                      <Button onClick={handleDownload} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Proof
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}

              {!generatedProof && (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center text-muted-foreground">
                      <FileCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Fill in the agent information and click "Generate Capability Proof" to create a signed proof document.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Verify Proof Tab */}
        <TabsContent value="verify" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Verification Input */}
            <Card>
              <CardHeader>
                <CardTitle>Verify Proof Document</CardTitle>
                <CardDescription>
                  Upload a proof file or paste proof content to verify its authenticity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input Mode Selector */}
                <RadioGroup value={verifyInputMode} onValueChange={(value) => setVerifyInputMode(value as VerifyInputMode)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="file" id="mode-file" />
                    <Label htmlFor="mode-file" className="flex items-center gap-2 cursor-pointer font-normal">
                      <Upload className="h-4 w-4" />
                      Upload File
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paste" id="mode-paste" />
                    <Label htmlFor="mode-paste" className="flex items-center gap-2 cursor-pointer font-normal">
                      <FileText className="h-4 w-4" />
                      Paste Content
                    </Label>
                  </div>
                </RadioGroup>

                {/* File Upload Mode */}
                {verifyInputMode === 'file' && (
                  <div className="space-y-2">
                    <Label htmlFor="proofFile">Proof File</Label>
                    <Input
                      id="proofFile"
                      type="file"
                      accept=".pdf,.json,.txt,.html"
                      onChange={handleFileChange}
                    />
                    {verifyFile && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {verifyFile.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Paste Content Mode */}
                {verifyInputMode === 'paste' && (
                  <div className="space-y-2">
                    <Label htmlFor="proofContent">Proof Content</Label>
                    <Textarea
                      id="proofContent"
                      placeholder="Paste the proof document content here (JSON or Text format)"
                      value={verifyPastedContent}
                      onChange={(e) => setVerifyPastedContent(e.target.value)}
                      rows={12}
                      className="font-mono text-xs"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleVerifySubmit}
                    disabled={isVerifying || (verifyInputMode === 'file' ? !verifyFile : !verifyPastedContent.trim())}
                    className="flex-1"
                  >
                    <FileSearch className="h-4 w-4 mr-2" />
                    {isVerifying ? 'Verifying...' : 'Verify Proof'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClearVerification}
                    disabled={isVerifying}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification Results */}
            <div>
              {verificationResult ? (
                <ProofVerificationResult result={verificationResult} />
              ) : (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center text-muted-foreground">
                      <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="mb-2">No verification results yet</p>
                      <p className="text-sm">
                        Upload a proof file or paste proof content, then click "Verify Proof" to check its authenticity.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
