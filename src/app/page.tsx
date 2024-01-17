/* eslint-disable @next/next/no-img-element */
"use client"
import LoadPage from '@/app/components/atomic/LoadPage';
import styles from './page.module.css'
import Header from '@/app/components/molecules/Header';
import ListMovie from '@/app/components/molecules/ListMovie';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { setLoading } from '@/lib/redux/slice/loadingSlice';
import Loading from './movie/[...slug]/loading';
export default function Home() {
  const { isLoading } = useSelector((state: any) => state.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    // Fungsi untuk menandai bahwa halaman telah selesai dimuat
    const handleLoad = () => {
      dispatch(setLoading(false))
    };

    // Tambahkan event listener untuk event load pada window
    window.addEventListener('load', handleLoad);

    // Cleanup: hapus event listener saat komponen di-unmount
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [dispatch, isLoading])

  return (
    <>
      {isLoading && <LoadPage />}
      {!isLoading && <main className={styles.main}>
        <Header />
        <ListMovie imgOrientation='portrait' listTitle='Trending' listType='movies' listLimit={10} listPath='trending' />
        <ListMovie listTitle='Spider Man Verse' listPath='query' listType='featured' imgOrientation='portrait' />
        <ListMovie listTitle='Avengers Collection' listPath='sequel' collectionId={86311} imgOrientation='landscape' listType='featured' />
      </main >
      }
    </>
  )
}
