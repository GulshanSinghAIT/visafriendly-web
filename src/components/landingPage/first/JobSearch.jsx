
import React from "react";
import styles from "./JobSearch.module.css";
import { SearchBar } from "./SearchBar";
import { NavBarrr } from "../../Navbar/NavBar";



const searchOptions = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/362f09fb650174466634b70337929224b338e451a6cd22b9442a910873e6c71a?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
    placeholder: "Search Role, Company",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/367fd5dc30bbe4e89af774e395f2500ac7c18dcdf35fdaf08573321955907c42?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_NEW_KEY}",
    placeholder: "United States",
  },
];


export const JobSearch = () => {
  return (
    <main className={styles.container}>
      <NavBarrr />
      <div className={styles.decorativeImages}>
        <img alt="Google" src={`https://cdn.builder.io/api/v1/image/assets/TEMP/3103466e441b5d3ebefbf6bcf182d6f14100f8d63bae6fce77157e8b275f8d8e?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`} className={styles.decorativeImage1} />
        <img src={`https://cdn.builder.io/api/v1/image/assets/TEMP/bb3f852ca674b3bd91b108d7037849798b9b019964369da01c2b1d766b037425?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`} alt="Microsoft" className={styles.decorativeImage2} />
        <img src={`https://cdn.builder.io/api/v1/image/assets/TEMP/bed537b9062c73150e85bb4d1370191b3eff312869b08849b0c9955035c83eb1?placeholderIfAbsent=true&apiKey=${process.env.REACT_APP_API_KEY}`} alt="KPMG" className={styles.decorativeImage3} />
        <img src={`/images/meta.png`} alt="Meta" className={styles.decorativeImage4} />
        <img src={`https://cdn.builder.io/api/v1/image/assets/TEMP/97922ef4b0140bb5edfd8fb95d0cef708bd2f628a7caa09ada12c30ecf7c664c?placeholderIfAbsent=true&apiKey==${process.env.REACT_APP_API_KEY}`} alt="Company" className={styles.decorativeImage5} />
        <img src={`/images/kpmg.jpeg`} alt="Company" className={styles.decorativeImage6} />
      </div>

      <section className={styles.content}>
        <h1 className={styles.title}>Visa-Sponsored Jobs & Internships, All in One Place.</h1>
        <p className={styles.description}>
          Discover full-time, contract, internship, and co-op opportunities from U.S. companies that sponsor H-1B and
          Green Cards. Designed for F-1 and H-1B visa holders to launch and grow their careers.
        </p>

        <form className={styles.searchContainer} role="search">
          <div className={styles.searchInputs}>
            {searchOptions.map((option, index) => (
              <SearchBar key={index} icon={option.icon} placeholder={option.placeholder} />
            ))}
          </div>
          <button className={styles.searchButton} aria-label="Search jobs">
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>
      <section className="md:py-10" >
        <div className="flex flex-col items-center justify-center gap-2">
            <img className="h-8" src="/images/trustpilot.png" alt="trustpilot"  />
            <img className="h-6" src="/images/stars.png" alt="trustpilot"  />

            <p className=" text-[#545251]  text-base">Rated 4.5/5.0</p>
        </div>
      </section>
      </section>


      
    </main>
  )
}

