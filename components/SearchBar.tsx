import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import fuzzysort from "fuzzysort";
import Cookies from "js-cookie";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setTerminoDeBusqueda(searchTerm);
  };

  // useEffect(() => {
  //   const previousSearchTerm = Cookies.get("searchTerm");
  //   if (previousSearchTerm) {
  //     setTerminoDeBusqueda(previousSearchTerm);
  //   }
  // }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (terminoDeBusqueda === "") {
      return alert("Por favor ingrese algo en la barra de búsqueda");
    }

    try {
      const response = await fetch(
        `/api/BusquedaDifusa?terminoDeBusqueda=${terminoDeBusqueda}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error(
          "Error al obtener los datos:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }

    // Guarda el término de búsqueda actual en las cookies
    //Cookies.set("searchTerm", terminoDeBusqueda);

    // Actualiza las sugerencias con el historial de búsquedas desde las cookies
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

    if (!parsedSearchHistory.includes(terminoDeBusqueda)) {
      parsedSearchHistory.push(terminoDeBusqueda);
      Cookies.set("searchHistory", JSON.stringify(parsedSearchHistory), {
        expires: 365,
      });
    }

    setSuggestions(parsedSearchHistory);
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

    // Filtra el historial de búsqueda basado en el término de búsqueda actual
    const filteredSuggestions = parsedSearchHistory.filter((suggestion) =>
      suggestion.toLowerCase().includes(terminoDeBusqueda.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }, [terminoDeBusqueda]);

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
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
      {suggestions.length > 0 && (
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
      )}
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
