import { useState } from "react"
import ProductCard from "../components/ProductCard"


const Search = () => {

  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [maxPrice, setMaxPrice] = useState(1000)
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1);

  // add to card
  const addToCartHandler = () => {

  };

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  return (
    <div className="product-search-page">
      {/* aside */}
      <aside>
        <h2>Filters</h2>

        {/* price sorting */}
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        {/* range */}
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input type="range" min={100} max={1000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} />
        </div>

        {/* category */}
        <div>
          <h4>Category</h4>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="">Laptop</option>
            <option value="">Camera</option>
            <option value="">Games</option>
            <option value="">Shoes</option>
          </select>
        </div>
      </aside>

      {/* main */}
      <main>
        <h1>Products</h1>
        {/* search input */}
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>

        {/* all product lists */}
        <div className="search-product-list">
        <ProductCard 
        productId="abc" 
        name="phone" 
        price={12} 
        stock={12} 
        handler={addToCartHandler} 
        photo="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg" />
        </div>

        {/* pagination */}
        <article>
          <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
          <span>
            {page} of {4}
          </span>
          <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </article>
      </main>
    </div>
  )
}

export default Search