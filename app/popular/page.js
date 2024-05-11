"use client"

import { Preloader } from '../components/Preloader/Preloader';
import { useGetDataByCategory } from '../api/api-hooks';
import { endpoints } from '../api/config';
import { CardsListSection } from '../components/CardsListSection/CardsListSection';

export default function Popular() {
    const popularGames = useGetDataByCategory(endpoints.games, "popular");

    return (
        <main>
            {
                popularGames ? (
                    <CardsListSection id="popular" title="Популярное" data={popularGames} />
                ) : (
                    <Preloader />
                )
            }
        </main>
    );
}