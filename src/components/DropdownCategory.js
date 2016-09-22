import React from 'react'
import SubCategory from './DropdownSubCategory'
import { categories, subCategories } from '../assets/categoriesData'

const Categories = ({categorize, selected}) => {

  const subCategoryList = (mainCategory) => {
    return (
      subCategories[mainCategory].map(subCategory => (
        <SubCategory
            categorize={categorize}
            subCategory={subCategory}
        />
      ))
    )
  }

  const nestedList = () => {
    return categories.map(category => {
        return (
          <li><a href="" onClick={e => e.preventDefault()}>{category}</a>
            <ul>
              {subCategoryList(category)}
            </ul>
          </li>
        )
      })

  }

  return (
    <ul>
      {nestedList()}
    </ul>
  )

}

export default Categories
