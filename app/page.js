"use client"

import { Banner } from './components/Banner/Banner';
import { Promo } from './components/Promo/Promo';
import { CardsListSection } from './components/CardsListSection/CardsListSection';
import { Preloader } from './components/Preloader/Preloader';

import { useGetDataByCategory } from './api/api-hooks';
import { endpoints } from './api/config';

export default function Home() {
  const popularGames = useGetDataByCategory(endpoints.games, "popular");
  const newGames = useGetDataByCategory(endpoints.games, "new");

  return (
    <main>
      <Banner />
      {
        popularGames ? (
          <CardsListSection id="popular" title="Популярное" data={popularGames} type="slider" />
        ) : (
          <Preloader/>
        )
      }
      {
        newGames ? (
          <CardsListSection id="new" title="Новинки" data={newGames} type="slider" />
        ) : (
          <Preloader/>
        )
      }
      <Promo />
    </main>
  );
}
