function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-5">
      <div className="basis-1/6">
        <div className="text-4xl text-center rounded-full bg-blue-500 text-white w-10 h-10">S</div>
      </div>
      <div className="basis-4/6 text-center">
        <span>Hi,</span> <strong>Sandra</strong>
      </div>
      <div className="basis-1/6 text-right">
        <span>Icon</span>
      </div>
    </header>
  )
}

export default Header
