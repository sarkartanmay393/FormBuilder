const RecordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto max-w-2xl min-h-screen border overflow-hidden">
      <header className="p-4 px-6 border-b">
        <h1 className="text-[16px] font-semibold ">Submission Records</h1>
      </header>
      {children}
    </div>
  );
};

export default RecordLayout;

