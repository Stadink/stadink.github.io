import GPT from "./GPT";
import MoleculeStructure from "./MoleculeStructure";
import { useState } from "react";

function ChemicalDisplayer() {
    const chemicals = {
        caffeine: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
        aspirin: "CC(=O)Oc1ccccc1C(=O)O",
        oxytocin: "CCC(C)C1C(=O)NC(C(=O)NC(C(=O)NC(CSSCC(C(=O)NC(C(=O)N1)CC2=CC=C(C=C2)O)N)C(=O)N3CCCC3C(=O)NC(CC(C)C)C(=O)NCC(=O)N)CC(=O)N)CCC(=O)N",
        adrenaline: "CNCC(C1=CC(=C(C=C1)O)O)O",
        dopamine: "C1=CC(=C(C=C1CCN)O)O",
        testosterone: "C[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@@H]2O)CCC4=CC(=O)CC[C@]34C",
        acetylcholine: "CC(=O)OCC[N+](C)(C)C",
        nicotine: "CN1CCC[C@H]1C2=CN=CC=C2",
        endorphin: "CC[C@H](C)[C@@H](C(=O)N[C@@H]([C@@H](C)CC)C(=O)N[C@@H](CCCCN)C(=O)N[C@@H](CC(=O)N)C(=O)N[C@@H](C)C(=O)N[C@@H](CC1=CC=C(C=C1)O)C(=O)N[C@@H](CCCCN)C(=O)N[C@@H](CCCCN)C(=O)NCC(=O)N[C@@H](CCC(=O)O)C(=O)O)NC(=O)[C@H](C)NC(=O)[C@H](CC(=O)N)NC(=O)[C@H](CCCCN)NC(=O)[C@H](CC2=CC=CC=C2)NC(=O)[C@H](CC(C)C)NC(=O)[C@H]([C@@H](C)O)NC(=O)[C@H](C(C)C)NC(=O)[C@H](CC(C)C)NC(=O)[C@@H]3CCCN3C(=O)[C@H]([C@@H](C)O)NC(=O)[C@H](CCC(=O)N)NC(=O)[C@H](CO)NC(=O)[C@H](CCCCN)NC(=O)[C@H](CCC(=O)O)NC(=O)[C@H](CO)NC(=O)[C@H]([C@@H](C)O)NC(=O)[C@@H](CCSC)NC(=O)[C@H](CC4=CC=CC=C4)NC(=O)CNC(=O)CNC(=O)[C@H](CC5=CC=C(C=C5)O)N",
        serotonin: "C1=CC2=C(C=C1O)C(=CN2)CCN",
        cortisol: "C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C)O",
      };

      // β-endorphin name not supported tho 🤔

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
        <a id="chemicalLink" href={`https://www.wikiwand.com/en/${Object.keys(chemicals).find((key) => chemicals[key] === selectedChemical)}`} target="_blank" rel='noreferrer'>{Object.keys(chemicals).find((key) => chemicals[key] === selectedChemical)}</a>
        
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

export default ChemicalDisplayer;