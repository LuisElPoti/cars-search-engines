import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import fuzzysort from "fuzzysort";
import Cookies from "js-cookie"; // Importa la biblioteca js-cookie

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

  // Función para manejar cambios en el campo de búsqueda
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setTerminoDeBusqueda(searchTerm);

    // Realiza una búsqueda difusa en la lista de sugerencias y actualiza el estado
    const fuzzyResults = fuzzysort.go(searchTerm, suggestions);
    const fuzzySuggestions = fuzzyResults.map((result) => result.target);
    setSuggestions(fuzzySuggestions);

    // Guarda la búsqueda actual en una cookie
    Cookies.set("searchTerm", searchTerm);
  };

  // Función para manejar la selección de una sugerencia
  const handleSuggestionClick = (suggestion: string) => {
    setTerminoDeBusqueda(suggestion);
  };

  useEffect(() => {
    // Recupera la búsqueda anterior del usuario desde la cookie
    const previousSearchTerm = Cookies.get("searchTerm");
    if (previousSearchTerm) {
      setTerminoDeBusqueda(previousSearchTerm);
    }

    // Aquí puedes hacer una solicitud a tu API para obtener sugerencias iniciales
    // Reemplaza esta simulación con tu lógica de búsqueda real
    const initialSuggestions = ["Nissan", "Toyota", "Honda", "Chevrolet"];
    setSuggestions(initialSuggestions);
  }, []);

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
  };

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
      
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
