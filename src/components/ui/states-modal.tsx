import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface StatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatesModal: React.FC<StatesModalProps> = ({ isOpen, onClose }) => {
  const focusStates = [
    { name: 'West Bengal', region: 'Eastern Coast', projects: 342, highlight: true },
    { name: 'Gujarat', region: 'Western Coast', projects: 289, highlight: true },
    { name: 'Odisha', region: 'Eastern Coast', projects: 234, highlight: false },
    { name: 'Tamil Nadu', region: 'Southern Coast', projects: 198, highlight: false },
    { name: 'Kerala', region: 'Southern Coast', projects: 184, highlight: false },
    { name: 'Karnataka', region: 'Western Coast', projects: 156, highlight: false },
    { name: 'Andhra Pradesh', region: 'Eastern Coast', projects: 143, highlight: false },
    { name: 'Maharashtra', region: 'Western Coast', projects: 128, highlight: false },
    { name: 'Goa', region: 'Western Coast', projects: 89, highlight: false },
    { name: 'Puducherry', region: 'Southern Coast', projects: 67, highlight: false },
    { name: 'Andaman & Nicobar', region: 'Island Territory', projects: 45, highlight: true },
    { name: 'Lakshadweep', region: 'Island Territory', projects: 23, highlight: true }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-ocean-blue" />
            BlueTrust Focus States & Territories
          </DialogTitle>
          <DialogDescription>
            Coastal states and island territories where BlueTrust operates blue carbon restoration projects
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {focusStates.map((state, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border transition-all ${
                state.highlight 
                  ? 'bg-ocean-surface border-ocean-light' 
                  : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-neutral-900">{state.name}</h3>
                {state.highlight && (
                  <Badge className="bg-ocean-light text-ocean-deep">Top Performer</Badge>
                )}
              </div>
              
              <p className="text-sm text-neutral-600 mb-2">{state.region}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Active Projects</span>
                <span className="font-semibold text-mangrove-green">{state.projects}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-mangrove-surface rounded-lg">
          <p className="text-sm text-neutral-700">
            <strong>Total Coverage:</strong> BlueTrust operates across India's entire coastline spanning 
            7,516 km, covering both mainland coastal states and strategic island territories. 
            Our focus areas include mangrove-rich regions, degraded coastal ecosystems, and 
            community-driven restoration zones.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatesModal;