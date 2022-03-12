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
    <div className="">
      {charactersList.map((character: any) => (
        <p
          className="text-blue-500"
          key={character.name}
          onClick={() => navigate(`/${character.name}`)}
        >
          {character.name}
        </p>
      ))}
    </div>
  );
};

export default Home;
