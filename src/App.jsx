// import styles from "./style";
// import {
//   Billing,
//   Business,
//   CardDeal,
//   Clients,
//   CTA,
//   Footer,
//   Navbar,
//   Stats,
//   Testimonials,
//   Hero,
// } from "./components";

// const App = () => (
//   <div className="bg-primary w-full overflow-hidden">
//     <div className={`${styles.paddingX} ${styles.flexCenter}`}>
//       <div className={`${styles.boxWidth}`}>
//         <Navbar />
//       </div>
//     </div>

//     <div className={`bg-primary ${styles.flexStart}`}>
//       <div className={`${styles.boxWidth}`}>
//         <Hero />
//       </div>
//     </div>

//     <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
//       <div className={`${styles.boxWidth}`}>
//         <Stats />
//         <Business />
//         <Billing />
//         <CardDeal />
//         <Testimonials />
//         <Clients />
//         <CTA />
//         <Footer />
//       </div>
//     </div>
//   </div>
// );

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, GetStarted, Roz_test, Search } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/roz_test" element={<Roz_test />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
