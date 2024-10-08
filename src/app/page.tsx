/* eslint-disable @next/next/no-img-element */
"use client"
import styles from './page.module.css'
import Header from '@/components/molecules/Header';
import ListMovie from '@/components/molecules/ListMovie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ListSeries from '../components/molecules/listSeries';
import Loading from './loading';
import { setLoading } from '@/lib/redux/slice/loadingSlice';
export default function Home() {
  const { isLoading } = useSelector((state: any) => state.loading)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        dispatch(setLoading(false))
      }, 2000)
    }
  }, [isLoading])

  return (
    <>
      {isLoading ? <Loading /> :
        <main className={styles.main}>
          <Header />
          <ListMovie imgOrientation='portrait' listTitle='Trending' listType='featured' listLimit={10} listPath='trending' />
          <ListMovie listTitle='Spider Verse' listPath='query' listType='featured' imgOrientation='portrait' keyword='spider man' />
          <ListMovie listTitle='Avengers Collection' listPath='sequel' collectionId={86311} imgOrientation='portrait' listType='featured' />
          <ListSeries listType='featured' imgOrientation='portrait' listTitle='Airing Today' listPath='airing_today' />
        </main >
      }
    </>
  )
}
