import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";
import { fetchCars } from "@/utils";
import { CarCard } from ".";
import { CarInfo } from "@/types";
import Pagination from "./Paginacion"; // Importa el componente de paginación

const SearchButton = ({ otherClasses }: { otherClasses: string }) => {
  return (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying glass"
        width={40}
        height={40}
        className="object-contain"
      />
    </button>
  );
};

const SearchBar = () => {
  const [terminoDeBusqueda, setTerminoDeBusqueda] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  const [allCars, setAllCars] = useState<CarInfo[]>([]); // Cambié el tipo a CarInfo[]
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
  const carsPerPage = 12; 
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setTerminoDeBusqueda(searchTerm);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (terminoDeBusqueda === "") {
      return alert("Por favor ingrese algo en la barra de búsqueda");
    }

    setIsLoading(true);

    // Fetch data
    const cars = await fetchCars(terminoDeBusqueda);
    setAllCars(cars);

    setIsDataEmpty(!Array.isArray(cars) || cars.length < 1 || !cars);

    setIsLoading(false);
  };

  useEffect(() => {
    const searchHistory = Cookies.get("searchHistory") || "[]";
    let parsedSearchHistory = [];

    try {
      parsedSearchHistory = JSON.parse(searchHistory);
    } catch (error) {
      console.error("Error al analizar el historial de búsqueda:", error);
    }
    if (!Array.isArray(parsedSearchHistory)) {
      parsedSearchHistory = [];
    }

    const filteredSuggestions = parsedSearchHistory.filter((suggestion) =>
      suggestion.toLowerCase().includes(terminoDeBusqueda.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }, [terminoDeBusqueda]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Función para obtener los carros en la página actual
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = allCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div>
      <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item" ref={searchInputRef}>
          <input
            type="text"
            name="terminoDeBusqueda"
            value={terminoDeBusqueda}
            onChange={handleInputChange}
            placeholder="Busque el carro de sus sueños..."
            className="searchbar__input"
          />
          <SearchButton otherClasses="sm:hidden" />
        </div>
        {suggestions.length > 0 ? (
          <ul
            className="suggestions-list"
            style={{ position: "absolute", top: "100%", left: 0, right: 0 }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => setTerminoDeBusqueda(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        ) : null}
      </form>

      {isLoading ? (
        <div className="loading-indicator-container">
          <div className="loading-indicator">Loading...</div>
        </div>
      ) : (
        <div className="search-results-container">
          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {currentCars.map((car: CarInfo, i: any) => (
                  <CarCard car={car} key={i} />
                ))}
              </div>
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold mt-3">Sin resultados</h2>
              {Array.isArray(allCars) && allCars.length === 0 && <p>Sin resultados</p>}
            </div>
          )}
        </div>
      )}

      {!isDataEmpty && (
        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(allCars.length / carsPerPage)}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
