import MoleculeStructure from "./MoleculeStructure";

function ExampleSVG() {
  const caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";
  const aspirin = "CC(=O)Oc1ccccc1C(=O)O";
  const oxytocin = "CCC(C)C1C(=O)NC(C(=O)NC(C(=O)NC(CSSCC(C(=O)NC(C(=O)N1)CC2=CC=C(C=C2)O)N)C(=O)N3CCCC3C(=O)NC(CC(C)C)C(=O)NCC(=O)N)CC(=O)N)CCC(=O)N";
  const adrenaline = "CNCC(C1=CC(=C(C=C1)O)O)O";
  

  return (
    <div id="component-example-svg" className="container">
      <section className="hero">
        <div className="hero-body">
          <p className="title">SVG Rendering</p>
          <p className="subtitle">You can render molecules using svg.</p>
        </div>
      </section>
      <div className="columns is-desktop">
        
        Caffeine
        <div className="column">
          <MoleculeStructure
            id="structure-example-svg-caffeine"
            structure={caffeine}
            width={350}
            height={300}
            svgMode
          />
        </div>

        Adrenaline
        <div className="column">
          <MoleculeStructure
            id="structure-example-svg-caffeine"
            structure={adrenaline}
            width={350}
            height={300}
            svgMode
          />
        </div>

        Oxytocin
        <div className="column">
          <MoleculeStructure
            id="structure-example-svg-caffeine"
            structure={oxytocin}
            width={350}
            height={300}
            svgMode
          />
        </div>

        Aspirin
        <div className="column">
          <MoleculeStructure
            id="structure-example-svg-aspirin"
            structure={aspirin}
            width={350}
            height={300}
            svgMode
          />
        </div>
      </div>
    </div>
  );
}

export default ExampleSVG;