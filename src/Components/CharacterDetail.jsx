import React from "react";

const CharacterDetail = ({ character }) => {
  if (!character) return null;

  return (
    <div className="bg-[#1a1a1a] border-2 border-[#39ff14] rounded-lg mt-5 shadow-lg">
      <div className="flex flex-col md:flex-row justify-around items-center p-6 gap-8">
        <div className="order-2 md:order-1 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <p className="text-[#39ff14]">
              <span className="font-bold text-white">Name:</span>{" "}
              {character.name}
            </p>
            <p>
              <span className="font-bold text-white">Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  character.status === "Alive"
                    ? "bg-green-500/20 text-green-400"
                    : character.status === "Dead"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {character.status}
              </span>
            </p>
            <p className="text-[#39ff14]">
              <span className="font-bold text-white">Species:</span>{" "}
              {character.species}
            </p>
            <p className="text-[#39ff14]">
              <span className="font-bold text-white">Type:</span>{" "}
              {character.type || "Unknown"}
            </p>
          </div>
        </div>

        <div className="order-3 md:order-2 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <p className="text-[#39ff14]">
              <span className="font-bold text-white">Gender:</span>{" "}
              {character.gender}
            </p>
            <p className="text-[#39ff14]">
              <span className="font-bold text-white">Origin:</span>{" "}
              {character.origin.name}
            </p>
            <p className="text-[#39ff14]">
              <span className="font-bold text-white">Location:</span>{" "}
              {character.location.name}
            </p>
          </div>
        </div>

        <div className="order-1 md:order-3">
          <img
            src={character.image}
            alt={character.name}
            className="w-48 h-48 rounded-lg border-2 border-[#39ff14] shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
