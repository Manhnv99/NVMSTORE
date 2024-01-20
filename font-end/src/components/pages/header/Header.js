import "./Header.css"

const Header=()=>{
    return(
        <div className="header-container">
            <div className="header-left">
                <i className="fa-solid fa-list-ul"></i>
            </div>
            <div className="header-right">
                <div className="header-right-bell">
                    <i className="fa-regular fa-bell"></i>
                    <span>9</span>
                </div>
                <div className="header-right-name">
                    <span>Nguyễn Vĩ Mạnh</span>
                </div>
                <div className="header-right-img">
                    <img src="canhan2.jpg" />
                </div>
            </div>
        </div>
    )
}

export default Header