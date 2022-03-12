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
    <div>
      {characterData.map((character: any) => (
        <div key={character.name}>
          <div>{character.name}</div>
          <div>{character.gender}</div>
          <img src={character.image} alt="character_image" />
        </div>
      ))}
    </div>
  );
};

export default CharacterPage;
