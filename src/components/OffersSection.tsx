import { Trash } from "lucide-react";
import { Offer } from "../../interfaces";
import EditOfferModal from "./EditOfferModal";
import Image from "next/image";
import { Button } from "./ui/button";

export default function OffersSection({
  offers,
  handleOfferUpdated,
  handleOfferDeleted,
}: {
  offers: Offer[];
  handleOfferUpdated: (updatedOffer: Offer) => void;
  handleOfferDeleted: (deletedOfferId: string) => void;
}) {
  const handleDeleteOffer = async (offerId: string) => {
    const res = await fetch("/api/offers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offerId }),
    });

    if (res.ok) {
      handleOfferDeleted(offerId);
    } else {
      alert("Failed to delete offer.");
    }
  };

  if (!offers || offers.length === 0) {
    return <p className="text-[#9ca3af]">No active offers.</p>;
  }

  return (
    <ul className="space-y-3">
      {offers.map((offer) => (
        <li
          key={offer.id}
          className="flex justify-between items-center bg-gray-900 p-3 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <Image
              src={offer.ordinal?.contentUrl}
              alt={offer.ordinal?.inscriptionName}
              className="w-10 h-10 rounded-lg"
              width={40}
              height={40}
            />
            <div>
              <p className="text-sm">{offer.ordinal?.inscriptionName}</p>
              <p className="text-xs text-[#9ca3af]">
                Offer: ₿{offer.amount.toFixed(10)} | Floor: ₿
                {offer.ordinal?.floorPrice.toFixed(10)} | LTV: {offer.ltv}%
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <EditOfferModal offer={offer} onOfferUpdated={handleOfferUpdated} />
            <Button
              onClick={() => handleDeleteOffer(offer.id)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
              variant={"ghost"}
            >
              <Trash size={18} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
