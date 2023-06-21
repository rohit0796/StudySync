import React from 'react'
import styled from 'styled-components'
import searchs from'./media/search.png'

const Search = ({search,changeSearch}) => {
  return (
    <Div>
    <Searchi src={searchs} alt="" />
    <Searchs placeholder='search with name' value={search} onChange={(e)=>changeSearch(e.target.value)}></Searchs>
    </Div>
  )
}
const Div = styled.div`
text-align:center`
const Searchs=styled.input`
 border-radius:10px;
 background-color:rgb(73,68,68);
 padding:10px;
 width:50%`
 const Searchi = styled.img`
height : 25px;
position:relative;
top:12px;
`
export default Search
