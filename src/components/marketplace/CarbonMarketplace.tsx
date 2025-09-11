import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ShoppingCart, 
  TrendingUp, 
  Star, 
  MapPin, 
  Users, 
  Leaf,
  DollarSign,
  Calendar,
  Award,
  Eye,
  Plus,
  Minus
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CarbonCredit {
  id: number;
  projectName: string;
  location: string;
  ngo: string;
  rating: number;
  pricePerCredit: number;
  availableCredits: number;
  totalCredits: number;
  cobenefits: string[];
  verificationDate: string;
  impact: {
    hectares: number;
    trees: number;
    community: number;
  };
}

interface MarketplaceProps {
  credits: CarbonCredit[];
  userBalance: number;
  onPurchase: (creditId: number, quantity: number, totalCost: number) => void;
  onSellRequest: (pricePerCredit: number, quantity: number) => void;
  userOwnedCredits: number;
}

export const CarbonMarketplace: React.FC<MarketplaceProps> = ({
  credits,
  userBalance,
  onPurchase,
  onSellRequest,
  userOwnedCredits
}) => {
  const [selectedCredit, setSelectedCredit] = useState<CarbonCredit | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [sellPrice, setSellPrice] = useState(45);
  const [showSellForm, setShowSellForm] = useState(false);

  const handlePurchase = (credit: CarbonCredit) => {
    const totalCost = credit.pricePerCredit * purchaseQuantity;
    
    if (totalCost > userBalance) {
      toast({
        title: 'Insufficient Funds',
        description: 'You do not have enough balance for this purchase.',
        variant: 'destructive',
      });
      return;
    }

    if (purchaseQuantity > credit.availableCredits) {
      toast({
        title: 'Not Enough Credits',
        description: 'Not enough credits available for this quantity.',
        variant: 'destructive',
      });
      return;
    }

    onPurchase(credit.id, purchaseQuantity, totalCost);
    setSelectedCredit(null);
    setPurchaseQuantity(1);
    
    toast({
      title: 'Purchase Successful',
      description: `Successfully purchased ${purchaseQuantity} credits from ${credit.projectName}`,
    });
  };

  const handleSellRequest = () => {
    if (sellQuantity > userOwnedCredits) {
      toast({
        title: 'Insufficient Credits',
        description: 'You do not have enough credits to sell.',
        variant: 'destructive',
      });
      return;
    }

    onSellRequest(sellPrice, sellQuantity);
    setShowSellForm(false);
    setSellQuantity(1);
    
    toast({
      title: 'Sell Order Created',
      description: `Your sell order for ${sellQuantity} credits at ₹${sellPrice} each has been listed.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Marketplace Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Carbon Credit Marketplace</h2>
          <p className="text-neutral-600">Buy and sell verified blue carbon credits</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-neutral-600">Your Balance</p>
            <p className="text-xl font-bold text-trust-gold">₹{userBalance.toLocaleString()}</p>
          </div>
          {userOwnedCredits > 0 && (
            <Button 
              onClick={() => setShowSellForm(true)}
              className="gradient-trust text-white font-semibold"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Sell Credits
            </Button>
          )}
        </div>
      </div>

      {/* Sell Credits Modal */}
      {showSellForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-trust-gold" />
                Sell Your Carbon Credits
              </CardTitle>
              <CardDescription>
                List your carbon credits for sale on the marketplace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sell-quantity">Quantity to Sell</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSellQuantity(Math.max(1, sellQuantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    id="sell-quantity"
                    type="number"
                    value={sellQuantity}
                    onChange={(e) => setSellQuantity(Math.max(1, Number(e.target.value)))}
                    className="text-center"
                    min="1"
                    max={userOwnedCredits}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSellQuantity(Math.min(userOwnedCredits, sellQuantity + 1))}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Available: {userOwnedCredits} credits
                </p>
              </div>

              <div>
                <Label htmlFor="sell-price">Price per Credit (₹)</Label>
                <Input
                  id="sell-price"
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className="mt-1"
                  min="1"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Total Value:</span>
                  <span className="font-bold text-trust-gold">
                    ₹{(sellQuantity * sellPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowSellForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSellRequest}
                  className="flex-1 gradient-trust text-white"
                >
                  List for Sale
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Credit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credits.map((credit) => (
          <Card key={credit.id} className="card-premium hover:shadow-strong transition-all duration-300">
            <div className="aspect-video bg-gradient-nature rounded-lg m-4 mb-0 flex items-center justify-center relative">
              <Leaf className="w-8 h-8 text-white" />
              <Badge className="absolute top-2 right-2 bg-white/90 text-neutral-900">
                <Star className="w-3 h-3 mr-1 fill-trust-gold text-trust-gold" />
                {credit.rating}
              </Badge>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight">{credit.projectName}</CardTitle>
              <CardDescription className="space-y-1">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  {credit.location}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="w-3 h-3" />
                  {credit.ngo}
                </div>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-neutral-600">Price per Credit</p>
                  <p className="font-bold text-trust-gold text-lg">₹{credit.pricePerCredit}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Available</p>
                  <p className="font-semibold">{credit.availableCredits}/{credit.totalCredits}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-700">Co-benefits:</p>
                <div className="flex flex-wrap gap-1">
                  {credit.cobenefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-neutral-600">
                <div className="text-center">
                  <Leaf className="w-4 h-4 mx-auto mb-1 text-mangrove-green" />
                  <p>{credit.impact.hectares}ha</p>
                </div>
                <div className="text-center">
                  <Users className="w-4 h-4 mx-auto mb-1 text-trust-gold" />
                  <p>{credit.impact.community}</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-4 h-4 mx-auto mb-1 text-ocean-blue" />
                  <p>{credit.impact.trees}</p>
                </div>
              </div>

              <Button
                onClick={() => setSelectedCredit(credit)}
                className="w-full gradient-ocean text-white font-semibold"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Credits
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Purchase Modal */}
      {selectedCredit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-ocean-blue" />
                Purchase Carbon Credits
              </CardTitle>
              <CardDescription>
                {selectedCredit.projectName} • {selectedCredit.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-neutral-600">Price per Credit</p>
                  <p className="font-bold text-trust-gold text-xl">₹{selectedCredit.pricePerCredit}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Available Credits</p>
                  <p className="font-semibold text-lg">{selectedCredit.availableCredits}</p>
                </div>
              </div>

              <div>
                <Label htmlFor="purchase-quantity">Quantity to Purchase</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPurchaseQuantity(Math.max(1, purchaseQuantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    id="purchase-quantity"
                    type="number"
                    value={purchaseQuantity}
                    onChange={(e) => setPurchaseQuantity(Math.max(1, Number(e.target.value)))}
                    className="text-center"
                    min="1"
                    max={selectedCredit.availableCredits}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPurchaseQuantity(Math.min(selectedCredit.availableCredits, purchaseQuantity + 1))}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-gradient-surface rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{purchaseQuantity} credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unit Price:</span>
                    <span className="font-medium">₹{selectedCredit.pricePerCredit}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-neutral-200">
                    <span>Total Cost:</span>
                    <span className="text-trust-gold">₹{(selectedCredit.pricePerCredit * purchaseQuantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCredit(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handlePurchase(selectedCredit)}
                  className="flex-1 gradient-trust text-white font-semibold"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Purchase Credits
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};