// import { useEffect, useState } from "react";

// export default function HeartCursor({ children }) {
//     const [position, setPosition] = useState({ x: 0, y: 0 });
//     const [bursts, setBursts] = useState([]);

//     // Track mouse position
//     useEffect(() => {
//         const move = (e) => {
//             setPosition({ x: e.clientX, y: e.clientY });
//         };

//         const click = (e) => {
//             const hearts = Array.from({ length: 25 }).map((_, i) => ({
//                 id: Date.now() + i,
//                 x: e.clientX,
//                 y: e.clientY,
//                 dx: Math.random() * 4 - 2,
//                 dy: Math.random() * 3 + 3,
//             }));

//             setBursts((prev) => [...prev, ...hearts]);
//         };

//         window.addEventListener("mousemove", move);
//         window.addEventListener("click", click);

//         return () => {
//             window.removeEventListener("mousemove", move);
//             window.removeEventListener("click", click);
//         };
//     }, []);

//     // Falling animation
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setBursts((prev) =>
//                 prev
//                     .map((h) => ({
//                         ...h,
//                         y: h.y + h.dy,
//                         x: h.x + h.dx,
//                     }))
//                     .filter((h) => h.y < window.innerHeight + 50)
//             );
//         }, 30);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <>
//             {children}

//             {/* Heart Cursor */}
//             <div
//                 className="fixed text-3xl pointer-events-none select-none z-[9999]"
//                 style={{
//                     left: position.x,
//                     top: position.y,
//                     transform: "translate(-50%, -50%)",
//                 }}
//             >
//                 ❤️
//             </div>

//             {/* Click → Falling Hearts */}
//             {bursts.map((b) => (
//                 <div
//                     key={b.id}
//                     className="fixed pointer-events-none text-red-400 animate-pulse z-[9998]"
//                     style={{
//                         left: b.x,
//                         top: b.y,
//                         transform: "translate(-50%, -50%)",
//                     }}
//                 >
//                     ❤️
//                 </div>
//             ))}
//         </>
//     );
// }
