import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../params";

export function refreshPage() {
  window.location.reload();
}

export async function getCharacters() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/characters`);
    if (!response) {
      return;
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOneCharacters(character_name: any) {
  // const query: any = prepare_query({ character_name }, true);
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/characters${character_name}`
    );
    if (!response) {
      return;
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}
