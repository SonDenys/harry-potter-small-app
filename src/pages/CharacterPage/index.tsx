import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneCharacters } from "../../helpers";
import { BACKEND_URL } from "../../params";

const CharacterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [characterData, setCharacterData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { character_name } = useParams();
  console.log("character_name :", character_name);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/characters/${character_name}`
        );
        // Ecran de chargement
        setIsLoading(true);

        if (!response) {
          console.log("the api call getOneCharacters has failed");
        } else {
          // Met fin à l'écran de chargement
          setIsLoading(false);
          setCharacterData(response.data);
        }

        console.log("reponse getOneCharacters :", response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [character_name]);

  return isLoading ? (
    <div>Chargement..</div>
  ) : (
    <div className="bg-black flex justify-center h-screen">
      {characterData.map((character: any) => (
        <div key={character.name} className="sm:flex">
          <img
            src={character.image}
            alt="character_image"
            className="w-80 h-80 rounded-lg object-contain"
          />
          <div>
            <h2 className="mt-5 text-2xl text-white">{character.name}</h2>
            <p className="text-amber-400 items-center">{character.gender}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterPage;
