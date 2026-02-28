import { useState } from 'react';
import { FileCheck, Shield, Clock, Lock, CheckCircle, FileText, Sparkles, Upload, Search as SearchIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useNavigate } from '@tanstack/react-router';
import { routes } from '../router/routes';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useSubmitNotaryRequest,
  useVerifyNotarizationText,
  useMyNotarizationRecords,
} from '../hooks/useQueries';
import { NotaryCertificateView } from '../components/notary/NotaryCertificateView';
import { useCertificateDownload } from '../components/notary/useCertificateDownload';
import { InlineAuthGate } from '../components/auth/InlineAuthGate';
import type { NotarizationRecord } from '../backend';

export function AINotary() {
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const [notarizeText, setNotarizeText] = useState('');
  const [verifyText, setVerifyText] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<NotarizationRecord | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const submitNotary = useSubmitNotaryRequest();
  const verifyNotary = useVerifyNotarizationText();
  const { data: myRecords, isLoading: recordsLoading } = useMyNotarizationRecords();
  const { downloadCertificate } = useCertificateDownload();

  const handleNotarize = async () => {
    if (!notarizeText.trim()) return;
    try {
      await submitNotary.mutateAsync({ contentText: notarizeText });
      setNotarizeText('');
    } catch (error) {
      console.error('Notarization failed:', error);
    }
  };

  const handleVerify = async () => {
    if (!verifyText.trim()) return;
    try {
      const result = await verifyNotary.mutateAsync(verifyText);
      if (result) {
        setSelectedRecord(result);
        setShowCertificate(true);
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const handleViewCertificate = (record: NotarizationRecord) => {
    setSelectedRecord(record);
    setShowCertificate(true);
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
            <FileCheck className="w-8 h-8 text-primary" />
            AI Notary
          </h1>
          <p className="text-lg text-muted-foreground">
            Blockchain-backed verification and certification for AI outputs
          </p>
        </div>

        {/* Disclaimer */}
        <Alert className="mb-8 border-accent/50 bg-accent/5">
          <Sparkles className="h-5 w-5 text-accent" />
          <AlertDescription className="text-sm">
            <strong>World's First AI Notary:</strong> This service provides cryptographic proof of content existence at a specific time. 
            It does not constitute legal notarization. For legal matters, consult a licensed notary public.
          </AlertDescription>
        </Alert>

        {/* Workflow Tabs */}
        <Tabs defaultValue="notarize" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notarize">
              <Upload className="w-4 h-4 mr-2" />
              Notarize
            </TabsTrigger>
            <TabsTrigger value="verify">
              <SearchIcon className="w-4 h-4 mr-2" />
              Verify
            </TabsTrigger>
            <TabsTrigger value="records">
              <FileText className="w-4 h-4 mr-2" />
              My Records
            </TabsTrigger>
          </TabsList>

          {/* Notarize Tab */}
          <TabsContent value="notarize" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notarize Content</CardTitle>
              </CardHeader>
              <CardContent>
                <InlineAuthGate
                  fallback={
                    <div className="text-center py-8">
                      <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Log in to notarize content
                      </p>
                      <Button onClick={login}>Log In</Button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Content to Notarize
                      </label>
                      <Textarea
                        placeholder="Enter the content you want to notarize..."
                        value={notarizeText}
                        onChange={(e) => setNotarizeText(e.target.value)}
                        rows={8}
                        className="font-mono text-sm"
                      />
                    </div>
                    <Button
                      onClick={handleNotarize}
                      disabled={!notarizeText.trim() || submitNotary.isPending}
                      className="w-full gap-2"
                    >
                      <FileCheck className="w-4 h-4" />
                      {submitNotary.isPending ? 'Notarizing...' : 'Notarize Content'}
                    </Button>
                    {submitNotary.isSuccess && (
                      <Alert className="border-green-500/50 bg-green-500/5">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertDescription>
                          Content successfully notarized! View it in the "My Records" tab.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </InlineAuthGate>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verify Tab */}
          <TabsContent value="verify" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Verify Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Content to Verify
                    </label>
                    <Textarea
                      placeholder="Enter the content to verify..."
                      value={verifyText}
                      onChange={(e) => setVerifyText(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                  <Button
                    onClick={handleVerify}
                    disabled={!verifyText.trim() || verifyNotary.isPending}
                    className="w-full gap-2"
                  >
                    <SearchIcon className="w-4 h-4" />
                    {verifyNotary.isPending ? 'Verifying...' : 'Verify Content'}
                  </Button>
                  {verifyNotary.isSuccess && !verifyNotary.data && (
                    <Alert className="border-destructive/50 bg-destructive/5">
                      <AlertDescription>
                        No notarization record found for this content.
                      </AlertDescription>
                    </Alert>
                  )}
                  {verifyNotary.isSuccess && verifyNotary.data && (
                    <Alert className="border-green-500/50 bg-green-500/5">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertDescription>
                        Content verified! Notarized on {formatTimestamp(verifyNotary.data.timestamp)}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Records Tab */}
          <TabsContent value="records" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Notarization Records</CardTitle>
              </CardHeader>
              <CardContent>
                <InlineAuthGate
                  fallback={
                    <div className="text-center py-8">
                      <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Log in to view your notarization records
                      </p>
                      <Button onClick={login}>Log In</Button>
                    </div>
                  }
                >
                  {recordsLoading && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Loading records...</p>
                    </div>
                  )}
                  {!recordsLoading && (!myRecords || myRecords.length === 0) && (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        No notarization records yet
                      </p>
                      <Button variant="outline" onClick={() => navigate({ to: routes.aiNotary.path })}>
                        Notarize Content
                      </Button>
                    </div>
                  )}
                  {!recordsLoading && myRecords && myRecords.length > 0 && (
                    <div className="space-y-4">
                      {myRecords.map((record) => (
                        <Card key={record.id.toString()} className="border-muted">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline">
                                    ID: {record.id.toString()}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {formatTimestamp(record.timestamp)}
                                  </div>
                                </div>
                                {record.contentText && (
                                  <p className="text-sm text-muted-foreground font-mono truncate">
                                    {record.contentText.substring(0, 100)}
                                    {record.contentText.length > 100 && '...'}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewCertificate(record)}
                                >
                                  View Certificate
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => downloadCertificate(record)}
                                >
                                  Download
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </InlineAuthGate>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-accent" />
                Blockchain-Backed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Immutable proof stored on the Internet Computer blockchain
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" />
                Timestamped
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cryptographic timestamp proving content existence at a specific time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="w-5 h-5 text-secondary" />
                Secure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Content hashed and verified using cryptographic algorithms
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Certificate Dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Notarization Certificate</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <NotaryCertificateView
              record={selectedRecord}
              onDownload={() => downloadCertificate(selectedRecord)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
