import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href="/">
          <span className="navbar__brand-mark">✦</span>
          <span>منصة ألعاب</span>
        </a>

        <nav className="navbar__nav" aria-label="التنقل الرئيسي">
          <a className="navbar__link navbar__link--active" href="/">
            الألعاب
          </a>

          <a className="navbar__link" href="/about">
            عن المنصة
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
