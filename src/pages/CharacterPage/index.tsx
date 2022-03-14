import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../params";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import SpinningBubbles from "react-loading";

const CharacterPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characterData, setCharacterData] = useState<any>([]);

  const navigate = useNavigate();

  const { character_name } = useParams();
  console.log("character_name :", character_name);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/characters/${character_name}`
        );
        // Ecran de chargement

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
    <div className="flex justify-center items-center mt-72 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <SpinningBubbles color="#FFFFFF" />
    </div>
  ) : (
    <div className=" flex justify-center h-screen">
      <ArrowCircleLeftIcon
        className="h-10 w-10 text-white pt-3 cursor-pointer absolute"
        onClick={() => navigate(-1)}
      />

      {characterData.map((character: any) => (
        <>
          <div
            key={character.name}
            className="sm:flex sm:border-2 sm:border-amber-400 p-20 "
          >
            <img
              src={character.image}
              alt="character_image"
              className="w-80 h-80 rounded-lg object-contain"
            />
            <div className="text-white">
              <h2 className="mt-5 text-3xl font-bold">{character.name}</h2>
              <p className="text-lg italic">{character.actor}</p>
              <p className="italic text-md">
                {character.gender} / {character.dateOfBirth}
              </p>
              <p className="text-amber-400">{character.house}</p>

              <div className="mt-4 border-t-2 pt-4">
                <p>Patronus : {character.patronus}</p>
                <p>Species : {character.species}</p>
                <p>Ancestry : {character.ancestry}</p>
                <p>
                  Wand : {character.wand.wood} / {character.wand.core}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CharacterPage;
