import GPT from "./GPT";
import MoleculeStructure from "./MoleculeStructure";
import { useState } from "react";

function ExampleSVG() {
    const chemicals = {
        caffeine: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
        aspirin: "CC(=O)Oc1ccccc1C(=O)O",
        oxytocin: "CCC(C)C1C(=O)NC(C(=O)NC(C(=O)NC(CSSCC(C(=O)NC(C(=O)N1)CC2=CC=C(C=C2)O)N)C(=O)N3CCCC3C(=O)NC(CC(C)C)C(=O)NCC(=O)N)CC(=O)N)CCC(=O)N",
        adrenaline: "CNCC(C1=CC(=C(C=C1)O)O)O",
        dopamine: "C1=CC(=C(C=C1CCN)O)O",
        testosterone: "C[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@@H]2O)CCC4=CC(=O)CC[C@]34C",
      };

  const [selectedChemical, setSelectedChemical] = useState(chemicals.caffeine)

  const handleChemicalChange = (event) => {
    const newOption = event.target.value;
    setSelectedChemical(chemicals[newOption]);
  };
  

  return (
    <div id="component-example-svg" className="container">
      <section className="hero">
        <div className="hero-body">
          <p className="title">Select</p>
          <select value={Object.keys(chemicals).find((key) => chemicals[key] === selectedChemical)} onChange={handleChemicalChange}>
            {Object.keys(chemicals).map((chemical) => (
                <option key={chemical} value={chemical}>
                    {chemical}
                </option>
                ))}
          </select>
        </div>
      </section>

      <div className="columns is-desktop">
        <a id="chemicalLink" href={`https://www.wikiwand.com/en/${Object.keys(chemicals).find((key) => chemicals[key] === selectedChemical)}`} target="_blank">{Object.keys(chemicals).find((key) => chemicals[key] === selectedChemical)}</a>
        
        <div className="column">
          <MoleculeStructure
            id="structure-example-svg-caffeine"
            structure={selectedChemical}
            width={450}
            height={400}
            svgMode
          />
        </div>
      </div>

      <GPT words={['idk']} question={Object.keys(chemicals).find((key) => chemicals[key] === selectedChemical)} />

    </div>
  );
}

export default ExampleSVG;