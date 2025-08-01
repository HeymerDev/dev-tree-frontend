export const ErrorMessage = ({ children }: { children: string }) => {
  return (
    <span className="text-red-500 bg-red-50 p-3 text-sm font-bold">
      {children}
    </span>
  );
};
