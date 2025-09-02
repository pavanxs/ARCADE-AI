"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  file: File;
  status: "uploading" | "completed" | "failed";
  progress: number;
}

interface KnowledgeBaseStepProps {
  files: UploadedFile[];
  onFilesUpdate: (files: UploadedFile[]) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function KnowledgeBaseStep({ 
  files, 
  onFilesUpdate, 
  onValidationChange 
}: KnowledgeBaseStepProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "uploading" as const,
      progress: 0,
    }));

    // Simulate file upload progress
    newFiles.forEach(uploadFile => {
      const interval = setInterval(() => {
        setUploadingFiles(prev => 
          prev.map(f => 
            f.id === uploadFile.id 
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 200);

      // Complete upload after progress reaches 100%
      setTimeout(() => {
        clearInterval(interval);
        setUploadingFiles(prev => prev.filter(f => f.id !== uploadFile.id));
        onFilesUpdate([...files, { ...uploadFile, status: "completed", progress: 100 }]);
        toast.success(`${uploadFile.file.name} uploaded successfully`);
      }, 2200);
    });

    setUploadingFiles(prev => [...prev, ...newFiles]);
  }, [files, onFilesUpdate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    onFilesUpdate(updatedFiles);
  };

  // Update validation state
  React.useEffect(() => {
    onValidationChange(files.length > 0);
  }, [files.length, onValidationChange]);

  const allFiles = [...files, ...uploadingFiles];

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-lg">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">
                  Drag & drop files here, or click to select
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: PDF, TXT, DOC, DOCX (max 10MB each)
                </p>
                <Button type="button" variant="secondary">
                  Choose Files
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {allFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Uploaded Documents</h3>
            <div className="space-y-3">
              {allFiles.map((uploadedFile) => (
                <div
                  key={uploadedFile.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      {uploadedFile.status === "uploading" && (
                        <Progress value={uploadedFile.progress} className="mt-2" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      uploadedFile.status === "completed" ? "default" :
                      uploadedFile.status === "uploading" ? "secondary" : "destructive"
                    }>
                      {uploadedFile.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {uploadedFile.status === "failed" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {uploadedFile.status}
                    </Badge>
                    
                    {uploadedFile.status === "completed" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadedFile.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <div className="text-sm text-muted-foreground">
        <p>💡 <strong>Tip:</strong> Upload documents that contain the knowledge you want your AI agent to reference. 
        This could include research papers, reports, manuals, or any text-based content.</p>
      </div>
    </div>
  );
}
