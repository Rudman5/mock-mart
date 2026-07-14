import NavButton from './NavButton'

export default function Sidebar() {
  return (
    <div className=" w-1/5 p-4 border-r">
      <div className="flex flex-col gap-2 justify-stretch items-stretch">
        <NavButton label="Products" to="/products" />
        <NavButton label="Orders" to="/carts" />
        <NavButton label="Account" to="/account" />
      </div>
    </div>
  )
}
