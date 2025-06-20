export type SourceId = 'real' | 'instyle' | 'oloygeia' | 'thecars' | 'realplayer';

export const sourceDetails: Record<SourceId, { 
  name: string; 
  description: string;
  logoUrl: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  } 
}> = {
  real: {
    name: "Real.gr",
    description: "",
    logoUrl:"https://www.real.gr/wp-content/themes/realnews/images/realgr-logo.svg",
    theme: {
      primaryColor: "bg-blue-900",
      secondaryColor:"text-white", 
    }
  },
  instyle: {
    name: "InStyle",
    description: "",
    logoUrl:"https://www.instyle.gr/wp-content/uploads/2022/05/Logo_InStyle-1.png",
    theme: {
      primaryColor: "bg-beige-300",
      secondaryColor:"text-white", 
    }
  },
  oloygeia: {
    name: "Ολο Υγεία",
    description: "",
    logoUrl:"https://www.oloygeia.gr/wp-content/uploads/2023/06/olo-ygeia-logo-red.png",
    theme: {
      primaryColor: "bg-white",
      secondaryColor:"text-black", 
    }
  },
  thecars: {
    name: "The Cars",
    description: "",
    logoUrl:"https://www.thecars.gr/wp-content/uploads/2023/05/the-cars-logo-330x44-1.png",
    theme: {
      primaryColor: "bg-white",
      secondaryColor:"text-black", 
    }
  },
  realplayer: {
    name: "Real Player",
    description: "",
    logoUrl:"https://player.real.gr/wp-content/uploads/2024/06/Logo-e1718700920635.png",
    theme: {
      primaryColor: "bg-blue-900",
      secondaryColor:"text-white", 
    }
  }
}