export const Hamburger = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary-foreground">
        <svg
          className="w-6 h-6 text-primary-background"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </div>
    </div>
  );
};
