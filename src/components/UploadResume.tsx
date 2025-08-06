// components/UploadResume.tsx
import React, { useState, ChangeEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const UploadResume: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResumeFile(file || null);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!resumeFile) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const response = await fetch('http://localhost:3000/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('✅ Resume uploaded successfully!');
      } else {
        setUploadStatus('❌ Failed to upload resume.');
      }
    } catch (error) {
      console.error(error);
      setUploadStatus('⚠️ An error occurred while uploading.');
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Upload Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="resume">Select Resume File (PDF/DOCX)</Label>
          <Input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
        <Button onClick={handleUpload}>Upload</Button>
        {uploadStatus && <p className="text-sm text-blue-600">{uploadStatus}</p>}
      </CardContent>
    </Card>
  );
};

export default UploadResume;
