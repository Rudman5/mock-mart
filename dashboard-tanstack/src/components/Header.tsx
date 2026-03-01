import Button from "./Button";

export default function Header() {
  const handleLogout = () => {
    console.log("User logged out!");
  };
  const switchLanguage = () => {
    console.log("Langugage button clicked!");
  };

  return (
    <div>
      <div className="bg-gray-200 w-full py-5 px-6 border-b border-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl ">MockMart</h1>
          <div>Search</div>
          <div className="flex gap-2">
            <Button label="Language" onClick={switchLanguage}></Button>
            <Button label="Logout" onClick={handleLogout}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
