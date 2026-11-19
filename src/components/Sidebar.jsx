export default function SideBar({files}) {
  const fileList = files.map(file => <button key={file.id}>{file.name}</button>)

  return (
    <>
      <div className="sidebar-div">
        {fileList}
      </div>
    </>
  );
}

function SideBarButton({title}) {
  return (
    <button className="sidebar-button">{title}</button>
  );
}