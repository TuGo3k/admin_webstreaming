import React from 'react'
import MainContainer from '../../Utills/MainContainer'
import CategoriesTable from '../../components/Categories/CategoriesTable'
import CategoriesModal from '../../components/Categories/CategoriesModal'

export default function CategoryPage() {
  return (
    <div>
        <MainContainer>
            <CategoriesModal/>
            <CategoriesTable />
        </MainContainer>
    </div>
  )
}
