export default function Topbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-10 py-[13px] bg-[rgba(10,10,10,0.92)] backdrop-blur-[24px] border-b border-[rgba(255,255,255,0.07)]">
      
      <div className="flex items-center gap-3">
        <div className="w-[34px] h-[34px] bg-[#E8192C] rounded-[7px] flex items-center justify-center text-white text-[17px] font-bold tracking-wide">
          SB
        </div>

        <div className="font-syne text-[13px] font-bold tracking-[0.06em] text-[#E6E3DC]">
          Social
          <span className="text-[#E8192C]">Bureau</span>

          <span className="mx-[5px] text-[#5C5850]">
            /
          </span>

          Workflow Architect
        </div>
      </div>

      <div className="flex items-center gap-[7px] px-[14px] py-[5px] border border-[rgba(232,25,44,.22)] rounded-full font-syne text-[10px] font-bold tracking-[0.14em] uppercase text-[#E8192C]">
        <div className="w-[6px] h-[6px] rounded-full bg-[#E8192C] animate-pulse" />
        Free Tool
      </div>
    </nav>
  );
}