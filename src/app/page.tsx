/* eslint-disable @next/next/no-img-element */
"use client"
import LoadPage from '@/components/atomic/LoadPage';
import styles from './page.module.css'
import Header from '@/components/molecules/Header';
import ListMovie from '@/components/molecules/ListMovie';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import ListSeries from '../components/molecules/listSeries';
import Loading from './loading';
export default function Home() {
  const { isLoading } = useSelector((state: any) => state.loading)

  return (
    <>
      {isLoading && <LoadPage />}
      <Suspense fallback={<Loading />}>
        <main className={styles.main}>
          <Header />
          <ListMovie imgOrientation='portrait' listTitle='Trending' listType='movies' listLimit={10} listPath='trending' />
          <ListMovie listTitle='Spider Verse' listPath='query' listType='featured' imgOrientation='portrait' keyword='spider man' />
          <ListMovie listTitle='Avengers Collection' listPath='sequel' collectionId={86311} imgOrientation='landscape' listType='featured' />
          <ListSeries listType='movies' imgOrientation='portrait' listTitle='Airing Today' listPath='airing_today' />
        </main >
      </Suspense>
    </>
  )
}
