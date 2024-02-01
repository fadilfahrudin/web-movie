/* eslint-disable @next/next/no-img-element */
"use client"
import LoadPage from '@/components/atomic/LoadPage';
import styles from './page.module.css'
import Header from '@/components/molecules/Header';
import ListMovie from '@/components/molecules/ListMovie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLoading } from '@/lib/redux/slice/loadingSlice';
import ListSeries from '../components/molecules/listSeries';
export default function Home() {
  const { isLoading } = useSelector((state: any) => state.loading)
  const dispatch = useDispatch()


  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(false))
    }
  }, [dispatch, isLoading])

  return (
    <>
      {isLoading && <LoadPage />}
      {!isLoading && <main className={styles.main}>
        <Header />
        <ListMovie imgOrientation='portrait' listTitle='Trending' listType='movies' listLimit={10} listPath='trending' />
        <ListMovie listTitle='Spider Verse' listPath='query' listType='featured' imgOrientation='portrait' keyword='spider man' />
        <ListMovie listTitle='Avengers Collection' listPath='sequel' collectionId={86311} imgOrientation='landscape' listType='featured' />
        <ListSeries listType='movies' imgOrientation='portrait' listTitle='Airing Today' listPath='airing_today' />
      </main >
      }
    </>
  )
}
