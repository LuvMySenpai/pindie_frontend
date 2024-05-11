"use client"

import { Preloader } from '../components/Preloader/Preloader';
import { useGetDataByCategory } from '../api/api-hooks';
import { endpoints } from '../api/config';
import { CardsListSection } from '../components/CardsListSection/CardsListSection';

export default function TDS() {
    const tdsGames = useGetDataByCategory(endpoints.games, "TDS");

    return (
        <main>
            {
                tdsGames ? (
                    <CardsListSection id="TDS" title="Защита Башни" data={tdsGames} />
                ) : (
                    <Preloader />
                )
            }
        </main>
    );
}