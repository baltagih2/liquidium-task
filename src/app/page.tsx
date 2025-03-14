"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Offer, Ordinal } from "../../interfaces";
import OrdinalsSection from "@/components/OrdinalsSection";
import OffersSection from "@/components/OffersSection";
import { Input } from "@/components/ui/input";
import { bitcoinPrice } from "../../constants";

export default function Portfolio() {
  const [ordinals, setOrdinals] = useState<Ordinal[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [portfolioStats, setPortfolioStats] = useState({
    totalPortfolioValue: 0,
    availableLiquidity: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/ordinals")
        .then((res) => res.json())
        .then(setOrdinals),
      fetch("/api/offers")
        .then((res) => res.json())
        .then(setOffers),
      fetch("/api/portfolio")
        .then((res) => res.json())
        .then(setPortfolioStats),
    ]).finally(() => setLoading(false));
  }, []);

  const filteredOrdinals = useMemo(
    () =>
      ordinals.filter((ordinal) =>
        ordinal.inscriptionName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [ordinals, searchQuery]
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleOfferUpdated = useCallback((updatedOffer: Offer) => {
    setOffers((prev) =>
      prev.map((offer) => (offer.id === updatedOffer.id ? updatedOffer : offer))
    );
  }, []);

  const handleOfferDeleted = useCallback((deletedOfferId: string) => {
    setOffers((prev) => prev.filter((offer) => offer.id !== deletedOfferId));
  }, []);

  return (
    <main className="p-6 bg-secondary min-h-screen text-foreground">
      {/* Portfolio Summary */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg w-1/2">
          <h3 className="text-sm text-[#9ca3af]">Total Portfolio Value</h3>
          <p className="text-xl font-bold space-x-10">
            <span>₿{portfolioStats.totalPortfolioValue.toFixed(10)}&nbsp;</span>
            <span className="text-[#9ca3af]">
              ${(portfolioStats.totalPortfolioValue * bitcoinPrice)?.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg w-1/2">
          <h3 className="text-sm text-[#9ca3af]">Available Liquidity</h3>
          <p className="text-xl font-bold space-x-10">
            <span>₿{portfolioStats.availableLiquidity.toFixed(10)}&nbsp;</span>
            <span className="text-[#9ca3af]">
              ${(portfolioStats.availableLiquidity * bitcoinPrice)?.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-800 p-3 rounded-lg mb-6">
        <Search className="text-[#9ca3af] mr-3" />
        <Input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-textPrimary outline-none w-full"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Ordinals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-[#9ca3af]">Loading...</p>
        ) : (
          <OrdinalsSection ordinals={filteredOrdinals} />
        )}
      </div>

      <h2 className="text-xl font-bold mt-10 mb-4">Your Offers</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        {loading ? (
          <p>Loading Offers...</p>
        ) : (
          <OffersSection
            offers={offers}
            handleOfferUpdated={handleOfferUpdated}
            handleOfferDeleted={handleOfferDeleted}
          />
        )}
      </div>
    </main>
  );
}
