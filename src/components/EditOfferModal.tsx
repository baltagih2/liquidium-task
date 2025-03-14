"use client";

import { useRef, useState } from "react";
import { Offer } from "../../interfaces";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Edit } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ModalProps {
  offer: Offer;
  onOfferUpdated: (updatedOffer: Offer) => void;
}

export default function EditOfferModal({ offer, onOfferUpdated }: ModalProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [amount, setAmount] = useState(offer.amount);
  const [days, setDays] = useState(offer.termDays);
  const [interest, setInterest] = useState(offer.interest);

  const handleUpdateOffer = async () => {
    if (amount <= 0 || days <= 0 || interest < 0) {
      alert("Please enter valid loan terms.");
      return;
    }

    const payload = {
      offerId: offer.id,
      amount,
      ltv: (amount / offer.amount) * 100,
      termDays: days,
      interest,
    };

    const res = await fetch("/api/offers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const updatedOffer = await res.json();
      onOfferUpdated(updatedOffer);
      triggerRef.current?.click();
    } else {
      alert("Failed to update offer.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} asChild>
        <Button
          variant={"ghost"}
          className="text-gray-400 hover:text-white cursor-pointer"
        >
          <Edit size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Offer</DialogTitle>
        <div className="mt-4 flex items-center">
          <Image
            src={offer.ordinal?.renderUrl || offer.ordinal?.contentUrl}
            alt={offer.ordinal?.inscriptionName}
            className="w-12 h-12 rounded-lg"
            width={48}
            height={48}
          />
          <div className="ml-4">
            <p className="text-sm">{offer.ordinal.inscriptionName}</p>
          </div>
        </div>

        {/* Loan Terms */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-[#9ca3af]">Term (Days)</label>
            <Input
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-[#9ca3af]">Amount (BTC)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-[#9ca3af]">Interest (%)</label>
            <Input
              type="number"
              value={interest}
              onChange={(e) => setInterest(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-2 rounded mt-1"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <DialogClose>Close</DialogClose>
          <Button
            onClick={handleUpdateOffer}
            className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-white"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
