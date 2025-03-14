import Image from "next/image";
import { Ordinal } from "../../interfaces";
import CreateOfferModal from "./CreateOfferModal";

export default function OrdinalsSection({ ordinals }: { ordinals: Ordinal[] }) {
  if (!ordinals || ordinals.length === 0) {
    return (
      <p className="text-[#9ca3af]">
        You do not own any supported ordinals yet.
      </p>
    );
  }

  return ordinals.map((ordinal) => (
    <div key={ordinal.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
      <Image
        src={ordinal.renderUrl || ordinal.contentUrl}
        alt={ordinal.inscriptionName}
        className="w-full object-cover rounded"
        width={400}
        height={200}
      />
      <h2 className="mt-2 font-semibold">{ordinal.inscriptionName}</h2>
      <p className="text-sm text-[#9ca3af]">{ordinal.collection.name}</p>
      <p className="text-lg font-semibold">₿{ordinal.floorPrice.toFixed(10)}</p>
      <a
        href={ordinal.bisUrl}
        target="_blank"
        className="text-blue-500 underline text-sm"
        rel="noopener noreferrer"
      >
        View on BestInSlot
      </a>
      <CreateOfferModal ordinal={ordinal} />
    </div>
  ));
}
