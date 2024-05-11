"use client"

import { Preloader } from '../components/Preloader/Preloader';
import { useGetDataByCategory } from '../api/api-hooks';
import { endpoints } from '../api/config';
import { CardsListSection } from '../components/CardsListSection/CardsListSection';

export default function Shooters() {
    const shooterGames = useGetDataByCategory(endpoints.games, "shooter");

    return (
        <main>
            {
                shooterGames ? (
                    <CardsListSection id="shooter" title="Шутеры" data={shooterGames} />
                ) : (
                    <Preloader />
                )
            }
        </main>
    );
}