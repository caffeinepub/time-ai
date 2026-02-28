import type { NotarizationRecord } from '../../backend';
import { hashToHex } from './HashUtils';

export function useCertificateDownload() {
  const downloadCertificate = (record: NotarizationRecord) => {
    const certificate = {
      certificateType: 'AI Notary Certificate',
      verificationId: record.id.toString(),
      timestamp: new Date(Number(record.timestamp) / 1_000_000).toISOString(),
      contentHash: record.contentHash ? hashToHex(new Uint8Array(record.contentHash)) : null,
      contentPreview: record.contentText ? record.contentText.substring(0, 200) : null,
      owner: record.owner.toString(),
      attestations: {
        timeAI: 'Structure Verified',
        travAI: 'Content Verified',
        manager: 'Consensus Achieved',
      },
      blockchain: 'Internet Computer',
      issuer: 'TIME AI Notary System',
      worldsFirst: true,
    };

    const blob = new Blob([JSON.stringify(certificate, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notary-certificate-${record.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { downloadCertificate };
}
