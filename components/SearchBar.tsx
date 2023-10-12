import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { fetchCars } from "@/utils";
import { CarCard } from ".";
import { CarInfo } from "@/types";
import Pagination from "./Paginacion"; // Importa el componente de paginación
import { useRouter } from "next/router";
import Swal from 'sweetalert2'

let ventana;
if (typeof window !== 'undefined')
{
  ventana = window.localStorage.getItem('key');
}
const SearchButton = ({ otherClasses }: { otherClasses: string }) => { //Botón de búsqueda
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
  const [allCars, setAllCars] = useState<CarInfo[]>([]);  // Carros traídos por la api
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
  const [start ,setStart] = useState<boolean>(true);
  const carsPerPage = 12; 
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Actualiza el término de búsqueda
    const searchTerm = e.target.value;
    setTerminoDeBusqueda(searchTerm);
  };

  const router = useRouter();

  const handleLoad = async() => {


    if(router.query.vehiculo && start === true)
    {
      setIsLoading(true);

      // Fetch data
      const cars = await fetchCars(String(router.query.vehiculo));
      setAllCars(cars);
  
      setIsDataEmpty(!Array.isArray(cars) || cars.length < 1 || !cars);
  
      setIsLoading(false);
      setCurrentPage(1);
      setStart(false);
    }
  }

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {  // Función que realiza la búsqueda
    e.preventDefault();

    if (terminoDeBusqueda === "") {  // Si no se escribe nada en la barra debúsqyeda
      return Swal.fire({
        position: 'top-right',
        toast: true,
        icon: 'info',
        text: 'Por favor ingrese algo en la barra de búsqueda',
        showConfirmButton: false,
        timer: 1500
      })
    }

    setIsLoading(true);

    // Fetch data
    const cars = await fetchCars(terminoDeBusqueda);
    setAllCars(cars);

    setIsDataEmpty(!Array.isArray(cars) || cars.length < 1 || !cars);

    setIsLoading(false);
    setCurrentPage(1);
    router.push('', '/'+terminoDeBusqueda.toString(), { shallow: true, scroll: false}); // Cambio url

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

    // Agrega el término de búsqueda actual al historial de búsqueda
    parsedSearchHistory.push(terminoDeBusqueda);

    // Guarda el historial de búsqueda en la cookie
    Cookies.set("searchHistory", JSON.stringify(parsedSearchHistory));
  };

  useEffect(() => {
    handleLoad();
  }), [isLoading, currentPage];

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

      <form className="searchbar mt-3 ml-2" onSubmit={handleSearch}>
        <div className="searchbar__item" ref={searchInputRef}>
          <input
            type="text"
            name="terminoDeBusqueda"
            value={terminoDeBusqueda}
            onChange={handleInputChange}
            placeholder="Busque el carro de sus sueños..."
            className="searchbar__input"
          />
          <SearchButton otherClasses="" />
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
          <div aria-label="Loading..." role="status">
            <svg className="animate-spin w-6 h-6 fill-blue-500" viewBox="3 3 18 18">
              <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
              </path>
              <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
              </path>
            </svg>
          </div>
          <div className="loading-indicator ml-2">Loading...</div>
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
