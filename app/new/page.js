"use client"

import { Preloader } from '../components/Preloader/Preloader';
import { useGetDataByCategory } from '../api/api-hooks';
import { endpoints } from '../api/config';
import { CardsListSection } from '../components/CardsListSection/CardsListSection';

export default function New() {
    const newGames = useGetDataByCategory(endpoints.games, "new");

    return (
        <main>
            {
                newGames ? (
                    <CardsListSection id="new" title="Новинки" data={newGames} />
                ) : (
                    <Preloader />
                )
            }
        </main>
    );
}