import React from 'react'
import {
  ByDressSection,
  MainSection,
  NewArrivalsSection,
  TopSellingSection
} from './components'
import { useCategories } from '../../hooks'

const HomePage = () => {

  const { data, isLoading } = useCategories();

  console.log(isLoading, data);


  return (
    <>
      <MainSection />
      <NewArrivalsSection />
      <TopSellingSection />
      <ByDressSection />
    </>
  )
}

export default HomePage