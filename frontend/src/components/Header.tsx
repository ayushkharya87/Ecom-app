import {Link} from "react-router-dom"
import {FaSearch, FaShoppingBag, FaSignInAlt, FaUser, FaSignOutAlt} from "react-icons/fa"
import { useState } from "react"

const user = {_id : "a", role: "user"}

const Header = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const logoutHandler = () => {
        setIsOpen(false)
    }

  return ( 
    <div className="header">
        <Link onClick={() => setIsOpen(false)} to={"/"}>Home</Link>
        <Link onClick={() => setIsOpen(false)} to={"/search"}><FaSearch /></Link>
        <Link onClick={() => setIsOpen(false)} to={"/cart"}><FaShoppingBag /></Link>

        {/* user exist or not */}
        {
            user?._id ? (
                <>
                <button onClick={() => setIsOpen((prev) => !prev)}><FaUser /></button>
                {/* new html tag */}
                <dialog open={isOpen}>
                    <div>
                        {/* if admin exist */}
                        {
                            user.role === "admin" && (
                                <Link onClick={() => setIsOpen(false)} to={"/admin/dashboard"}>Admin</Link>
                            )
                        }
                        {/* orders btn */}
                        <Link onClick={() => setIsOpen(false)} to={"/orders"}>Orders</Link>

                        {/* logout btn */}
                        <button onClick={logoutHandler}><FaSignOutAlt /></button>
                    </div>
                </dialog>
                </>
            ) : (
                <Link to={"/login"}><FaSignInAlt /></Link>
            )
        }
    </div>
  )
}

export default Header