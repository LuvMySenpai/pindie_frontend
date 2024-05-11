"use client"

import { Preloader } from '../components/Preloader/Preloader';
import { useGetDataByCategory } from '../api/api-hooks';
import { endpoints } from '../api/config';
import { CardsListSection } from '../components/CardsListSection/CardsListSection';

export default function Runners() {
    const runnerGames = useGetDataByCategory(endpoints.games, "runner");

    return (
        <main>
            {
                runnerGames ? (
                    <CardsListSection id="runner" title="Раннеры" data={runnerGames} />
                ) : (
                    <Preloader />
                )
            }
        </main>
    );
}