import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Calendar, 
  Users, 
  Leaf, 
  Camera,
  TrendingUp,
  AlertTriangle,
  FileText,
  Satellite
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Project {
  id: number;
  name: string;
  location: string;
  ngo: string;
  submittedDate: string;
  reportType: string;
  status: 'pending' | 'approved' | 'rejected';
  hectaresRestored: number;
  treesPlanted: number;
  carbonCredits: number;
  communityMembers: number;
  images: string[];
  description: string;
  gpsCoordinates: string;
  previousReports: number;
}

interface ProjectVerificationProps {
  project: Project;
  onApprove: (projectId: number, comments: string, creditsAwarded: number) => void;
  onReject: (projectId: number, reason: string) => void;
  onClose: () => void;
}

export const ProjectVerification: React.FC<ProjectVerificationProps> = ({
  project,
  onApprove,
  onReject,
  onClose
}) => {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [comments, setComments] = useState('');
  const [creditsAwarded, setCreditsAwarded] = useState(project.carbonCredits);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitDecision = async () => {
    if (!decision) return;

    if (decision === 'approve' && !comments.trim()) {
      toast({
        title: 'Comments Required',
        description: 'Please provide verification comments before approving.',
        variant: 'destructive',
      });
      return;
    }

    if (decision === 'reject' && !rejectionReason.trim()) {
      toast({
        title: 'Reason Required',
        description: 'Please provide a reason for rejection.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      if (decision === 'approve') {
        onApprove(project.id, comments, creditsAwarded);
        toast({
          title: 'Project Approved',
          description: `${project.name} has been verified and ${creditsAwarded} credits awarded.`,
        });
      } else {
        onReject(project.id, rejectionReason);
        toast({
          title: 'Project Rejected',
          description: `${project.name} has been rejected with feedback provided.`,
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit verification decision.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const aiAnalysisScore = Math.floor(Math.random() * 20) + 80; // Mock AI score 80-100

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">{project.name}</h2>
              <p className="text-neutral-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {project.location} • Submitted by {project.ngo}
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Project Details Panel */}
            <div className="xl:col-span-1">
              <Card className="card-premium mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-ocean-blue" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-600">Report Type</p>
                      <p className="font-semibold">{project.reportType}</p>
                    </div>
                    <div>
                      <p className="text-neutral-600">Submitted</p>
                      <p className="font-semibold">{project.submittedDate}</p>
                    </div>
                    <div>
                      <p className="text-neutral-600">GPS Coordinates</p>
                      <p className="font-semibold text-xs">{project.gpsCoordinates}</p>
                    </div>
                    <div>
                      <p className="text-neutral-600">Previous Reports</p>
                      <p className="font-semibold">{project.previousReports}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <h4 className="font-semibold mb-2">Project Impact</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-mangrove-green" />
                        <span>{project.hectaresRestored} hectares</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-ocean-blue" />
                        <span>{project.treesPlanted} trees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-trust-gold" />
                        <span>{project.communityMembers} people</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-neutral-600" />
                        <span>{project.carbonCredits} credits</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-neutral-600">{project.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Satellite className="w-5 h-5 text-trust-gold" />
                    AI Vegetation Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className={`text-3xl font-bold ${aiAnalysisScore >= 90 ? 'text-mangrove-green' : 
                                                         aiAnalysisScore >= 75 ? 'text-trust-gold' : 'text-red-500'}`}>
                      {aiAnalysisScore}%
                    </div>
                    <p className="text-sm text-neutral-600">Vegetation Growth Score</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mangrove Coverage</span>
                      <span className="font-semibold text-mangrove-green">+23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Canopy Density</span>
                      <span className="font-semibold text-ocean-blue">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water Quality</span>
                      <span className="font-semibold text-trust-gold">Improved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Evidence Panel */}
            <div className="xl:col-span-1">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-mangrove-green" />
                    Site Evidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.images.map((_, index) => (
                      <div key={index} className="aspect-video bg-gradient-nature rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <Camera className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">Site Photo {index + 1}</p>
                          <p className="text-xs opacity-80">GPS Tagged • High Resolution</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Decision Panel */}
            <div className="xl:col-span-1">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-ocean-blue" />
                    Verification Decision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => setDecision('approve')}
                      className={`gradient-nature text-white font-semibold ${
                        decision === 'approve' ? 'ring-2 ring-mangrove-green ring-offset-2' : ''
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Project
                    </Button>
                    
                    <Button
                      onClick={() => setDecision('reject')}
                      variant="destructive"
                      className={`font-semibold ${
                        decision === 'reject' ? 'ring-2 ring-red-500 ring-offset-2' : ''
                      }`}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Project
                    </Button>
                  </div>

                  {decision === 'approve' && (
                    <div className="space-y-4 pt-4 border-t border-neutral-200">
                      <div>
                        <Label htmlFor="credits" className="text-sm font-medium">
                          Carbon Credits to Award
                        </Label>
                        <input
                          id="credits"
                          type="number"
                          value={creditsAwarded}
                          onChange={(e) => setCreditsAwarded(Number(e.target.value))}
                          className="w-full mt-1 px-3 py-2 border rounded-lg"
                          min="0"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="approval-comments" className="text-sm font-medium">
                          Verification Comments
                        </Label>
                        <Textarea
                          id="approval-comments"
                          placeholder="Add verification notes and observations..."
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {decision === 'reject' && (
                    <div className="space-y-4 pt-4 border-t border-neutral-200">
                      <div>
                        <Label htmlFor="rejection-reason" className="text-sm font-medium">
                          Reason for Rejection
                        </Label>
                        <Textarea
                          id="rejection-reason"
                          placeholder="Explain why this project is being rejected..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {decision && (
                    <Button
                      onClick={handleSubmitDecision}
                      disabled={isSubmitting}
                      className="w-full gradient-ocean text-white font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        `Submit ${decision === 'approve' ? 'Approval' : 'Rejection'}`
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};