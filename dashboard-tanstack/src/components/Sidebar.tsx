import NavButton from './NavButton'

export default function Sidebar() {
  return (
    <div className="bg-gray-200 w-1/5 p-4">
      <div className="flex flex-col gap-2">
        <NavButton label="Products" to="/products" />
        <NavButton label="Orders" to="/orders" />
        <NavButton label="Customers" to="/customers" />
        <NavButton label="Account" to="/account" />
      </div>
    </div>
  )
}
