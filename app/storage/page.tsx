'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Upload, Download, FileText, Hash } from 'lucide-react';

export default function StoragePage() {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadHash, setUploadHash] = useState<string>('');
  const [originalFileName, setOriginalFileName] = useState<string>('');

  const [downloadHash, setDownloadHash] = useState<string>('');
  const [downloadStatus, setDownloadStatus] = useState<string>('');
  const [downloadedFile, setDownloadedFile] = useState<{
    fileName: string;
    fileSize: number;
    mimeType: string;
    data: string;
  } | null>(null);

  const handleFileUpload = async () => {
    if (!uploadFile) return;

    setUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', uploadFile);

      const response = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setUploadHash(result.hash);
      setOriginalFileName(uploadFile.name); // Store original filename
      setDownloadHash(result.hash); // Auto-populate download field with upload hash
      setUploadStatus(`Upload successful! Hash: ${result.hash} | TX: ${result.txHash}`);

    } catch (error) {
      setUploadStatus(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleFileDownload = async () => {
    if (!downloadHash) return;

    setDownloadStatus('Downloading...');
    setDownloadedFile(null);

    try {
      console.log('Frontend - attempting download for hash:', downloadHash);

      // Normalize hash for download (remove 0x prefix if present)
      const normalizedHash = downloadHash.startsWith('0x') ? downloadHash.slice(2) : downloadHash;
      console.log('Frontend - normalized hash for download:', normalizedHash);

      const response = await fetch('/api/storage/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hash: normalizedHash,
          fileName: originalFileName // Pass original filename for proper MIME type detection
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Download failed');
      }

      setDownloadedFile({
        fileName: result.fileName,
        fileSize: result.fileSize,
        mimeType: result.mimeType,
        data: result.data,
      });

      setDownloadStatus(`File ready for viewing: ${result.fileName}`);

    } catch (error) {
      setDownloadStatus(`Download failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleBrowserDownload = () => {
    if (!downloadedFile) return;

    try {
      // Convert base64 to blob
      const byteCharacters = atob(downloadedFile.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: downloadedFile.mimeType });

      // Create blob URL and trigger download
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = downloadedFile.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      URL.revokeObjectURL(blobUrl);

      setDownloadStatus(`Downloaded: ${downloadedFile.fileName}`);
    } catch (error) {
      setDownloadStatus(`Download failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">0G Storage Manager</h1>
        <p className="text-muted-foreground">Upload and download files to/from the 0G blockchain</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload File
            </CardTitle>
            <CardDescription>
              Select a file to upload to the 0G storage network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Choose File</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
            </div>

            {uploadFile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}

            <Button
              onClick={handleFileUpload}
              disabled={!uploadFile}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload to 0G Network
            </Button>

            {uploadStatus && (
              <Alert>
                <AlertDescription>{uploadStatus}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download File
            </CardTitle>
            <CardDescription>
              Enter the file hash to download from the 0G storage network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-hash">File Hash</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="file-hash"
                    placeholder="Enter file hash (root hash)"
                    value={downloadHash}
                    onChange={(e) => setDownloadHash(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  onClick={handleFileDownload}
                  disabled={!downloadHash}
                  variant="outline"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleFileDownload}
              disabled={!downloadHash}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download from 0G Network
            </Button>

            {downloadStatus && (
              <Alert>
                <AlertDescription>{downloadStatus}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* File Preview Section */}
      {downloadedFile && (
        <>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                File Preview: {downloadedFile.fileName}
              </CardTitle>
              <CardDescription>
                Size: {(downloadedFile.fileSize / 1024 / 1024).toFixed(2)} MB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Preview */}
              {downloadedFile.mimeType.startsWith('image/') && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <img
                    src={`data:${downloadedFile.mimeType};base64,${downloadedFile.data}`}
                    alt={downloadedFile.fileName}
                    className="max-w-full h-auto max-h-96 mx-auto rounded"
                  />
                </div>
              )}

              {/* Video Preview */}
              {downloadedFile.mimeType.startsWith('video/') && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <video
                    src={`data:${downloadedFile.mimeType};base64,${downloadedFile.data}`}
                    controls
                    className="max-w-full h-auto max-h-96 mx-auto rounded"
                  />
                </div>
              )}

              {/* Audio Preview */}
              {downloadedFile.mimeType.startsWith('audio/') && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <audio
                    src={`data:${downloadedFile.mimeType};base64,${downloadedFile.data}`}
                    controls
                    className="w-full"
                  />
                </div>
              )}

              {/* PDF Preview */}
              {downloadedFile.mimeType === 'application/pdf' && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="text-center mb-4">
                    <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">PDF Document</p>
                    <p className="text-xs text-muted-foreground">
                      {(downloadedFile.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <embed
                    src={`data:${downloadedFile.mimeType};base64,${downloadedFile.data}`}
                    type="application/pdf"
                    className="w-full h-96 border rounded"
                    title={downloadedFile.fileName}
                  />
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(`data:${downloadedFile.mimeType};base64,${downloadedFile.data}`, '_blank')}
                    >
                      Open in New Tab
                    </Button>
                    <Button
                      onClick={handleBrowserDownload}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              )}

              {/* Other file types */}
              {!downloadedFile.mimeType.startsWith('image/') &&
               !downloadedFile.mimeType.startsWith('video/') &&
               !downloadedFile.mimeType.startsWith('audio/') &&
               downloadedFile.mimeType !== 'application/pdf' && (
                <div className="border rounded-lg p-4 bg-muted/50 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {downloadedFile.mimeType.startsWith('text/') ? 'Text File' :
                     downloadedFile.mimeType.includes('zip') || downloadedFile.mimeType.includes('rar') || downloadedFile.mimeType.includes('7z') ? 'Archive File' :
                     'Binary File'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Preview not available for this file type
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleBrowserDownload}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download File
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDownloadedFile(null)}
                >
                  Close Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Separator />

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>1. <strong>Upload:</strong> Select a file and click upload. The hash auto-populates for download.</p>
          <p>2. <strong>Preview:</strong> Click download to view images, videos, audio, PDFs, and more in browser.</p>
          <p>3. <strong>Save:</strong> Click "Download File" to save to your downloads folder.</p>
          <p>4. <strong>Environment:</strong> Set ZEROG_PRIVATE_KEY in your .env.local</p>
        </CardContent>
      </Card>
    </div>
  );
}
