import './Nav.css';

export default function Nav() {
    return (
        <div className="nav">
            <div className='nav_title'>
                <a className='nav_home' href='/'>
                <span className='nav_webName'>이름 뭐로하지?</span>
                </a>
            </div>
            <div className='nav_list'>
                <span className='nav_more'>ㅁ</span>
            </div>
        </div>
    )
}