"use client";

import { useRef, useState } from "react";
import { Ordinal } from "../../interfaces";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ModalProps {
  ordinal: Ordinal;
}

export default function CreateOfferModal({ ordinal }: ModalProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [amount, setAmount] = useState(ordinal.floorPrice * 0.5);
  const [days, setDays] = useState(7);
  const [interest, setInterest] = useState(2);

  const handleCreateOffer = async () => {
    if (amount <= 0 || days <= 0 || interest < 0) {
      alert("Please enter valid loan terms.");
      return;
    }

    const payload = {
      ordinalId: ordinal.id,
      amount,
      ltv: (amount / ordinal.floorPrice) * 100,
      termDays: days,
      interest,
    };

    const res = await fetch("/api/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Offer created successfully!");
      triggerRef.current?.click();
    } else {
      alert("Failed to create offer.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} asChild>
        <Button className="mt-2 w-full bg-primary text-black py-2 rounded-lg flex items-center justify-center hover:bg-orange-700 hover:text-white transition cursor-pointer">
          <PlusCircle className="mr-2" size={18} />
          Create Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogTitle>Create a custom request</DialogTitle>
        {/* Ordinal Info */}
        <div className="mt-4 flex items-center">
          <Image
            src={ordinal.renderUrl || ordinal.contentUrl}
            alt={ordinal.inscriptionName}
            className="w-12 h-12 rounded-lg"
            width={48}
            height={48}
          />
          <div className="ml-4">
            <p className="text-sm text-[#9ca3af]">{ordinal.collection.name}</p>
            <p className="text-sm">{ordinal.inscriptionName}</p>
            <p className="text-xs text-[#9ca3af]">{ordinal.inscriptionId}</p>
          </div>
        </div>

        {/* Loan Terms */}
        <div className="mt-6 space-y-4">
          {/* Loan Duration */}
          <div>
            <label className="text-sm text-[#9ca3af]">Term</label>
            <Input
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-2 rounded mt-1"
            />
          </div>

          {/* Loan Amount */}
          <div>
            <label className="text-sm text-[#9ca3af]">Amount (BTC)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-gray-800 text-white p-2 rounded mt-1"
            />
          </div>

          {/* Interest Rate */}
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
            onClick={handleCreateOffer}
            className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-white cursor-pointer"
          >
            Create Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
