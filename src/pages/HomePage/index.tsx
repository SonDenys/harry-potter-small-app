import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCharacters } from "../../helpers";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [charactersList, setCharactersList] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await fetchCharacters();
    })();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await getCharacters();
      // Ecran de chargement
      setIsLoading(true);

      if (!response) {
        console.log("the api call getCharacters has failed");
      } else {
        // Met fin à l'écran de chargement
        setIsLoading(false);
        setCharactersList(response);
      }

      console.log("reponse getCharacters :", response);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <div>Chargement..</div>
  ) : (
    <div className=" bg-black sm:grid md:grid-cols-3 xl:grid-cols-3 3xl:flex flex-wrap justify-center px-10">
      {charactersList.map((character: any) => (
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
            <p className=" text-amber-400 items-center opacity-0 group-hover:opacity-100">
              {character.house}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
