import { useState } from "react";
import { MessageCircle, Wallet, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useNavigate } from "react-router";

interface DealInitiatorProps {
  productName: string;
  pricePerUnit: number;
  unit: string;
  sellerName: string;
  sellerRole: string;
}

export function DealInitiator({
  productName,
  pricePerUnit,
  unit,
  sellerName,
  sellerRole,
}: DealInitiatorProps) {
  const [quantity, setQuantity] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const totalAmount = quantity ? parseFloat(quantity) * pricePerUnit : 0;
  const advancePayment = totalAmount * 0.25; // 25% advance

  const handleInitiateDeal = () => {
    if (quantity && parseFloat(quantity) > 0) {
      // Simulate deal initiation
      alert(
        `Deal Initiated!\n\nProduct: ${productName}\nQuantity: ${quantity} ${unit}\nTotal: ₹${totalAmount.toLocaleString('en-IN')}\nAdvance Payment: ₹${advancePayment.toLocaleString('en-IN')}\n\nRedirecting to wallet for payment...`
      );
      setIsDialogOpen(false);
      setTimeout(() => {
        navigate('/wallet');
      }, 1000);
    }
  };

  const handleContactSeller = () => {
    setIsDialogOpen(false);
    navigate('/messages');
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Initiate Deal
            </DialogTitle>
            <DialogDescription>
              Purchase {productName} from {sellerName} ({sellerRole})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity ({unit})</Label>
              <Input
                id="quantity"
                type="number"
                placeholder={`Enter quantity in ${unit}`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="text-lg"
              />
            </div>

            {quantity && parseFloat(quantity) > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Price per {unit}:</span>
                  <span className="font-semibold">₹{pricePerUnit.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Quantity:</span>
                  <span className="font-semibold">{quantity} {unit}</span>
                </div>
                <div className="flex justify-between border-t border-green-300 pt-2">
                  <span className="font-semibold text-gray-900">Total Amount:</span>
                  <span className="font-bold text-lg text-green-700">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between bg-orange-100 -mx-4 -mb-4 mt-2 p-3 rounded-b-lg border-t-2 border-orange-300">
                  <span className="font-semibold text-orange-900">
                    Advance Payment (25%):
                  </span>
                  <span className="font-bold text-lg text-orange-700">
                    ₹{advancePayment.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Payment Terms:</strong> 25% advance payment will be held in your AgroChain Wallet until delivery is confirmed. Remaining 75% to be paid upon delivery.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleInitiateDeal}
                disabled={!quantity || parseFloat(quantity) <= 0}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Pay Advance
              </Button>
              <Button
                onClick={handleContactSeller}
                variant="outline"
                className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Seller
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        onClick={() => navigate('/messages')}
        variant="outline"
        className="border-green-600 text-green-600 hover:bg-green-50"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Chat
      </Button>

      <Button
        variant="outline"
        className="border-blue-600 text-blue-600 hover:bg-blue-50"
      >
        <Phone className="h-4 w-4 mr-2" />
        Call
      </Button>
    </div>
  );
}
