import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, MapPin, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: any) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleGetLocation = () => {
    setIsCapturingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsCapturingLocation(false);
          toast({
            title: "Location captured",
            description: `Coordinates: ${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          });
        },
        (error) => {
          setIsCapturingLocation(false);
          toast({
            title: "Location error",
            description: "Could not get your location. Please try again.",
            variant: "destructive"
          });
        }
      );
    } else {
      setIsCapturingLocation(false);
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 5); // Limit to 5 photos
      setPhotos(prev => [...prev, ...newPhotos].slice(0, 5));
      toast({
        title: "Photos added",
        description: `${newPhotos.length} photo(s) added to your project.`
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!projectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a project name.",
        variant: "destructive"
      });
      return;
    }

    if (!location) {
      toast({
        title: "Location required",
        description: "Please capture your project location.",
        variant: "destructive"
      });
      return;
    }

    if (photos.length === 0) {
      toast({
        title: "Photos required",
        description: "Please upload at least one photo of your project site.",
        variant: "destructive"
      });
      return;
    }

    const projectData = {
      name: projectName,
      description,
      location,
      photos,
      submittedDate: new Date().toISOString(),
      status: 'pending'
    };

    onSubmit(projectData);
    
    // Reset form
    setProjectName('');
    setDescription('');
    setLocation(null);
    setPhotos([]);
    onClose();

    toast({
      title: "Project submitted",
      description: "Your project has been submitted for verification."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-mangrove-green" />
            Register New Restoration Site
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Sagar Mangrove Restoration"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your restoration project..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          {/* Location Capture */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-medium">Project Location *</Label>
                <Button
                  onClick={handleGetLocation}
                  disabled={isCapturingLocation}
                  variant="outline"
                  size="sm"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {isCapturingLocation ? 'Getting Location...' : 'Capture Location'}
                </Button>
              </div>
              {location && (
                <div className="bg-mangrove-light/20 p-3 rounded-lg">
                  <p className="text-sm text-mangrove-dark">
                    <strong>Coordinates:</strong> {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-medium">Site Photos * (Max 5)</Label>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="sm"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photos
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />

              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Project photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        onClick={() => removePhoto(index)}
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 gradient-nature text-white"
            >
              Submit Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;