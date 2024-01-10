/* eslint-disable @next/next/no-img-element */
"use client"
import styles from './page.module.css'
import Header from '@/components/molecules/Header';
import ListMovie from '@/components/molecules/ListMovie';

export default function Home() {
  // const data = await omdbapi(1)

  return (
    <main className={styles.main}>
      <Header />
      <ListMovie imgOrientation='portrait' listTitle='Trending' listType='movies' listLimit={10} listPath='trending' />
      {/* <ListMovie imgOrientation='portrait' listTitle='The Avengers Collection' listType='featured' listLimit={20} listPath='trending' /> */}
      <ListMovie listTitle='Spider Man Verse' listPath='query' listType='featured' imgOrientation='portrait' />
      <ListMovie listTitle='Avengers Collection' listPath='sequel' collectionId={86311} imgOrientation='portrait' listType='featured' />
    </main >
  )
}
