import React from "react";
import { Link } from "react-router-dom";

export default function ServiceFooter() {
  return (
    <section className="w-full bg-black text-center py-10 px-5 pb-40">
      {/* Thin red separator */}
<div className="h-px w-1/2 bg-[#ff0000] mb-8 mx-auto" />
      
      {/* Text and Link */}
      <p className="text-neutral-400 text-lg">
        Ready to accelerate your growth?{" "}
        <Link 
          to="/contact" 
          className="text-[#ff0000] hover:text-[#ff0000] transition"
        >
          Let's build something extraordinary.
        </Link>
      </p>
    </section>
  );
}

