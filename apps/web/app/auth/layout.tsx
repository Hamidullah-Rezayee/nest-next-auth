export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br form-lime-400 to-cyan-400 flex h-screen items-center justify-center  ">
      {children}
    </div>
  );
}
