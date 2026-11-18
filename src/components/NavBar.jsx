export default function NavBar() {
  return (
    <>
      <div className="nav-bar">
        <NavBarButton text="Home/About"/>
        <NavBarButton text="Blog" />
      </div>
    </>
  );
}

function NavBarButton({text}) {
  return (
    // needs an onclick and type for styling
    <button className="nav-bar-button">{text}</button>
  );
}