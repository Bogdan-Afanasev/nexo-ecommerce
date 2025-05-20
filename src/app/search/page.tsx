import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import ProductGrid from "@/components/product/ProductGrid";
import { searchProducts } from "@/sanity/lib/client";
import React from "react";

type SearchPageProps = {
  searchParams: Promise<{ query: string }>;
};
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { query } = await searchParams;

  const products = await searchProducts(query);

  return (
    <div>
      <SalesCampaignBanner />

      <div className="bg-red-50 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-2">
            Результаты поиска для &quot;{query}&quot; - СКИДКИ ДО 90%! 🔥
          </h1>
          <p className="text-center text-red-500 text-sm md:text-base animate-pulse">
            ⚡️ Распродажа скоро закончится! ⏰ Только ограниченное время
          </p>
          <p className="text-center text-gray-600 text-xs mt-2">
            Откройте для себя потрясающие предложения, соответствующие вашему
            поиску
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">🚚</span>
              <span>Бесплатная доставка</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">⭐️</span>
              <span>Топ-рейтинг</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">💰</span>
              <span>Лучшие цены</span>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto py-8">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            🎉 {products.length} Потрясающие предложения доступны прямо сейчас!
          </p>
        </div>

        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default SearchPage;
