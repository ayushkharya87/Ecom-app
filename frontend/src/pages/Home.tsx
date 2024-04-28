import {Link} from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {

  // add to card
  const addToCartHandler = () => {

  };

  return (
    <div className='home'>
      {/* image */}
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>

      {/* products card */}
      <main>
        <ProductCard productId="abc" name="phone" price={12} stock={12} handler={addToCartHandler} photo="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg"/>
      </main>
    </div>
  )
}

export default Home