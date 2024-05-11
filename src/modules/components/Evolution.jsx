import React, { useEffect, useState } from "react";

export default function Evolution({id}) {
    const [evolution, setEvolution] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
            .then(response => response.json())
            .then(json => setEvolution(json.chain))
            .catch(error => console.error('Error fetching evolution chain:', error));
    }, []);
    console.log(evolution)

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold">Evolution Chain:</h2>
            {evolution && (
                <ul>
                    <li>{evolution.species.name}</li>
                    {evolution.evolves_to.map((stage1, index1) => (
                        <ul key={index1}>
                            <li>{stage1.species.name}</li>
                            {stage1.evolves_to.map((stage2, index2) => (
                                <ul key={index2}>
                                    <li>{stage2.species.name}</li>
                                </ul>
                            ))}
                        </ul>
                    ))}
                </ul>
            )}
        </div>
    );
}
