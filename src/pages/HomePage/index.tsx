import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCharacters } from "../../helpers";
import SpinningBubbles from "react-loading";
import SearchBox from "../components/SearchBox";

const Home = () => {
  // Il faut utiliser deux listes.
  // Il y a une liste qui va servir de liste par défaut (ticketsList) et une autre qui sera alimentés par la barre de recherche (searchTicketsList)
  // ticketsList: Une liste pour l'ensemble des tickets retournés par l'api
  // searchTicketsList: Une liste qui va servir pour le filtre de la recherche
  const [charactersList, setCharactersList] = useState<any>([]);
  const [searchCharacterList, setSearchCharacterList] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await fetchCharacters();
    })();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await getCharacters();

      if (!response) {
        console.log("the api call getCharacters has failed");
      } else {
        // 1e Liste par défaut
        setCharactersList(response);
        // 2e Liste alimentés par la barre de recherche
        setSearchCharacterList(response);
        // Met fin à l'écran de chargement
        setIsLoading(false);
      }

      console.log("reponse getCharacters :", response);
    } catch (error) {
      console.log(error);
    }
  };

  const searchCharacter = (text: string) => {
    return charactersList.filter((character: any) => {
      const characterName = character.name.toLowerCase();

      // On utilise une expression regulière qui indique qu'on recherche un text qui doit matcher avec le début de character.name

      const regex = new RegExp("^" + text, "i");
      // On retourne l'élément qui match
      return regex.test(characterName);
    });
  };

  const onSearch = (text: string) => {
    // Récupérer dans la liste ticketsList la valeur qui correspond à ce qui est entrée dans la barre de recherche

    const newCharactersList = searchCharacter(text);
    // S'il n'y a pas de rechercher, on retourne tout le tableau
    if (newCharactersList.length <= 0) {
      setSearchCharacterList(charactersList);
      return;
    }
    // Sinon on retourne la nouvelle liste recherchée
    setSearchCharacterList(newCharactersList);
  };

  return isLoading ? (
    <div className="flex justify-center items-center mt-72">
      <SpinningBubbles color="#FFFFFF" />
    </div>
  ) : (
    <div className="">
      <div className="flex justify-center">
        <SearchBox onChange={onSearch} />
      </div>

      <div className="sm:grid md:grid-cols-3 xl:grid-cols-3 3xl:flex flex-wrap justify-center px-10">
        {searchCharacterList.map((character: any) => (
          <div className="">
            <div
              className="group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 mt-5 flex flex-col items-center"
              onClick={() => navigate(`/${character.name}`)}
            >
              <img
                src={character.image}
                alt="character_image"
                className="w-80 h-80 rounded-lg object-contain"
              />

              <h2
                className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold"
                key={character.name}
              >
                {character.name}
              </h2>
              <p className="text-amber-400 items-center opacity-0 group-hover:opacity-100">
                {character.house}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
