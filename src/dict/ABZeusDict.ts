import Dict from "../classes/Dict";

const ABZeusDict = ():Dict => {
  const dictionary = Dict.getInstance();
  
  dictionary.l("es");

  dictionary.c("eto|+><", "es", "");
  dictionary.c("suj|+><", "es", "desde ");
  dictionary.c("obj|+><", "es", "hacia ");
  dictionary.c("*.*|+><", "es", "lo contenido en ");

  dictionary.c("eto|+<>", "es", "");
  dictionary.c("suj|+<>", "es", ", que es ");
  dictionary.c("obj|+<>", "es", "hasta ");
  dictionary.c("*.*|+<>", "es", "lo contenido en ");

  dictionary.c("eto|<+>", "es", "es ");
  dictionary.c("suj|<+>", "es", "desde ");
  dictionary.c("obj|<+>", "es", "hacia ");
  dictionary.c("*.*|<+>", "es", "lo contenido en ");

  dictionary.c("a", "es", "una definición inicial vínculante u origen");
  dictionary.c("b", "es", "una conclusión");
  dictionary.c("c", "es", "un contenido o contenedor");
  dictionary.c("d", "es", "el pensamiento");
  dictionary.c("e", "es", "una representación");
  dictionary.c("f", "es", "el momentum de la información");
  dictionary.c("g", "es", "la magnitud logarítmica de la información");
  dictionary.c("h", "es", "dentro o entre");
  dictionary.c("i", "es", "una descripción");
  dictionary.c("j", "es", "un vínculo");
  dictionary.c("k", "es", "la divergencia de la información");
  dictionary.c("l", "es", "la dirección");
  dictionary.c("m", "es", "la pluralidad");
  dictionary.c("n", "es", "un modelo o conjunto singular");
  dictionary.c("o", "es", "lo definido");
  dictionary.c("p", "es", "una proyección");
  dictionary.c("q", "es", "lo previo");
  dictionary.c("r", "es", "una extensión o radio");
  dictionary.c("s", "es", "la oscilación ");
  dictionary.c("t", "es", "lo que existe");
  dictionary.c("u", "es", "una racionalización");
  dictionary.c("v", "es", "una porción");
  dictionary.c("w", "es", "todo");
  dictionary.c("x", "es", "aquí");
  dictionary.c("y", "es", "una descripción racional");
  dictionary.c("z", "es", "un límite de magnitud");
  dictionary.c("á", "es", "la proyección de un origen");
  dictionary.c("é", "es", "la proyección de una representación");
  dictionary.c("í", "es", "la proyección de una descripción");
  dictionary.c("ó", "es", "la proyección de una definición");
  dictionary.c("ú", "es", "una proyección racional");
  dictionary.c("ñ", "es", "un modelo o conjunto oscilante");

  dictionary.c("A", "es", "una definición inicial vínculante u origen");
  dictionary.c("B", "es", "una conclusión");
  dictionary.c("C", "es", "un contenido o contenedor");
  dictionary.c("D", "es", "el pensamiento");
  dictionary.c("E", "es", "una representación");
  dictionary.c("F", "es", "el momentum de la información");
  dictionary.c("G", "es", "la magnitud logarítmica de la información");
  dictionary.c("H", "es", "dentro o entre");
  dictionary.c("I", "es", "una descripción");
  dictionary.c("J", "es", "un vínculo");
  dictionary.c("K", "es", "la divergencia de la información");
  dictionary.c("L", "es", "la dirección");
  dictionary.c("M", "es", "la pluralidad");
  dictionary.c("N", "es", "un modelo o conjunto singular");
  dictionary.c("O", "es", "lo definido");
  dictionary.c("P", "es", "una proyección");
  dictionary.c("Q", "es", "lo previo");
  dictionary.c("R", "es", "una extensión o radio");
  dictionary.c("S", "es", "una oscilación ");
  dictionary.c("T", "es", "lo que existe");
  dictionary.c("U", "es", "una racionalización");
  dictionary.c("V", "es", "una porción");
  dictionary.c("W", "es", "todo");
  dictionary.c("X", "es", "aquí");
  dictionary.c("Y", "es", "una descripción racional");
  dictionary.c("Z", "es", "un límite de magnitud");
  dictionary.c("Á", "es", "la proyección de un origen");
  dictionary.c("É", "es", "la proyección de una representación");
  dictionary.c("Í", "es", "la proyección de una descripción");
  dictionary.c("Ó", "es", "la proyección de una definición");
  dictionary.c("Ú", "es", "una proyección racional");
  dictionary.c("Ñ", "es", "un modelo o conjunto oscilante");

  dictionary.l("en");

  dictionary.c("eto|+><", "en", "");
  dictionary.c("suj|+><", "en", "from ");
  dictionary.c("obj|+><", "en", "towards ");
  dictionary.c("*.*|+><", "en", "contained in ");

  dictionary.c("eto|+<>", "en", "");
  dictionary.c("suj|+<>", "en", "that is from ");
  dictionary.c("obj|+<>", "en", "to ");
  dictionary.c("*.*|+<>", "en", "what is contained in ");

  dictionary.c("eto|<+>", "en", "is ");
  dictionary.c("suj|<+>", "en", "from ");
  dictionary.c("obj|<+>", "en", "towards ");
  dictionary.c("*.*|<+>", "en", "what is contained in ");

  dictionary.c("a", "en", "an initial definition or origin");
  dictionary.c("b", "en", "conclusion");
  dictionary.c("c", "en", "a content or container");
  dictionary.c("d", "en", "a thought");
  dictionary.c("e", "en", "a representation");
  dictionary.c("f", "en", "the momentum of information");
  dictionary.c("g", "en", "the logarithmic magnitude of information");
  dictionary.c("h", "en", "within or between");
  dictionary.c("i", "en", "a description");
  dictionary.c("j", "en", "a link");
  dictionary.c("k", "en", "the divergence of information");
  dictionary.c("l", "en", "a direction");
  dictionary.c("m", "en", "the plurality");
  dictionary.c("n", "en", "a singular model or set");
  dictionary.c("o", "en", "a definition");
  dictionary.c("p", "en", "a projection");
  dictionary.c("q", "en", "the previous");
  dictionary.c("r", "en", "an extension or radius");
  dictionary.c("s", "en", "oscillation ");
  dictionary.c("t", "en", "what exists");
  dictionary.c("u", "en", "a rationalization");
  dictionary.c("v", "en", "a portion");
  dictionary.c("w", "en", "everything");
  dictionary.c("x", "en", "here");
  dictionary.c("y", "en", "a rational description");
  dictionary.c("z", "en", "a magnitude limit");
  dictionary.c("á", "en", "a projection of an origin");
  dictionary.c("é", "en", "a projection of a representation");
  dictionary.c("í", "en", "a projection of a description");
  dictionary.c("ó", "en", "a projection of a definition");
  dictionary.c("ú", "en", "a rational projection");
  dictionary.c("ñ", "en", "an oscillating set of information");

  dictionary.c("A", "en", "an initial definition or origin");
  dictionary.c("B", "en", "conclusion");
  dictionary.c("C", "en", "a content or container");
  dictionary.c("D", "en", "a thought");
  dictionary.c("E", "en", "a representation");
  dictionary.c("F", "en", "the momentum of information");
  dictionary.c("G", "en", "the logarithmic magnitude of information");
  dictionary.c("H", "en", "within or between");
  dictionary.c("I", "en", "a description");
  dictionary.c("J", "en", "a link");
  dictionary.c("K", "en", "the divergence of information");
  dictionary.c("L", "en", "a direction");
  dictionary.c("M", "en", "the plurality");
  dictionary.c("N", "en", "a singular model or set");
  dictionary.c("O", "en", "a definition");
  dictionary.c("P", "en", "a projection");
  dictionary.c("Q", "en", "the previous");
  dictionary.c("R", "en", "an extension or radius");
  dictionary.c("S", "en", "oscillation");
  dictionary.c("T", "en", "what exists");
  dictionary.c("U", "en", "a rationalization");
  dictionary.c("V", "en", "a portion");
  dictionary.c("W", "en", "everything");
  dictionary.c("X", "en", "here");
  dictionary.c("Y", "en", "a rational description");
  dictionary.c("Z", "en", "a magnitude limit");
  dictionary.c("Á", "en", "a projection of an origin");
  dictionary.c("É", "en", "a projection of a representation");
  dictionary.c("Í", "en", "a projection of a description");
  dictionary.c("Ó", "en", "a projection of a definition");
  dictionary.c("Ú", "en", "a rational projection");
  dictionary.c("Ñ", "en", "an oscillating set of information");

  dictionary.l("gk");

  dictionary.c("eto|+><", "gk", "");
  dictionary.c("suj|+><", "gk", "from ");
  dictionary.c("obj|+><", "gk", "towards ");
  dictionary.c("*.*|+><", "gk", "contained in ");

  dictionary.c("eto|+<>", "gk", "");
  dictionary.c("suj|+<>", "gk", "that is from ");
  dictionary.c("obj|+<>", "gk", "to ");
  dictionary.c("*.*|+<>", "gk", "what is contained in ");

  dictionary.c("eto|<+>", "gk", "is ");
  dictionary.c("suj|<+>", "gk", "from ");
  dictionary.c("obj|<+>", "gk", "towards ");
  dictionary.c("*.*|<+>", "gk", "what is contained in ");

  dictionary.c("a", "gk", "origin [ά] of a direction [λ] that projects the initial definition [ά] to what is within or between a projected description [Φ]","α");
  dictionary.c("b", "gk", "initial definition [α] that projects a singular set [ή] contained in the conclusion [β]","β");
  dictionary.c("c", "gk", "describes [i] here (chi) [x] as what is describable between limits [Ξ]","ξ");
  dictionary.c("d", "gk", "origin or initial definition [α] from what exists [τ] that projects a description between describable limits [έ] towards the plurality of information as a distance from the end towards the origin [λ] from a defined portion of information [δ]","δ");
  dictionary.c("e", "gk", "defines [o] the spread of information [λ] towards a portion of information [ν] that rationally describes [ψ] an integral description [ι] from what is representable (describable between limits) (έψι’λον).* ","ε");
  dictionary.c("f", "gk", "describable [i] within the defined [o] [φ]","φ");
  dictionary.c("g", "gk", "self contained describable rationalization of information [μ] within the origin or initial definition [α] from the spread of information [γ]","γ");
  dictionary.c("h", "gk", "projects a model or singular describable set [ή] towards an initial definition [α] of what exists [t]","η");
  dictionary.c("i", "gk", "origin or initial definition [α] from the projection of everything [ώ] that describes [I] what exists [+] (ιώτ’α) ","ι");
  dictionary.c("j", "gk", "a link","ι");
  dictionary.c("k", "gk", "self contained border, edge [π] contained within an origin or initial definition [a] from the divergence of information [k] (Κ’άππα).* ","κ");
  dictionary.c("l", "gk", "portion of defined information [δ] that concludes [β] its origin [α] as the projected origin [ά] of a direction [λ] (that projects the origin [ά] to what is within or between a description and a projection [λ]) towards a descriptable rationalization [μ] (λάμ’βδα).*","λ");
  dictionary.c("m", "gk", "rationalization from the plurality","μ");
  dictionary.c("n", "gk", "rationalization from a singular set or portion","ν");
  dictionary.c("o", "gk", "radius [ρ] that defines [o] the divergence of information [κ] towards a portion of information [v] that rationalizes [μ] a description [ι] from a projected definition [ό] (όμι’κρο’ν).*","ο");
  dictionary.c("p", "gk", "defines a description of what exists from the 'border' or 'edge' of the conclusion [ π ] describing the portion of information [ v ] or the information between describable limits [II]","π");
  dictionary.c("q", "gk", "origin or initial definition that projects a singular model or set towards what exists from the link/vector within or towards what is defined [θ] (θήτα).* ","Θ");
  dictionary.c("r", "gk", "everything [w] from the radius [ρ] (ρώ)","ρ");
  dictionary.c("s", "gk", "an initial definition or origin from a descriptable rationalization [μα] that projects a description [ί] of the 'spread' of information [γ] from what is projectable within limits [Σ] (σίγ’μα)","ς");
  dictionary.c("t", "gk", "origin or initial definition [ά] that rationalizes [u] what exists [t] (ταυ)","τ");
  dictionary.c("u", "gk", "defines [o] a direction [λ] towards a portion of information [v] that rationally describes [ψ] an integral description [ι] from a projected rationalization [ύ] (ύψι’λον)","υ");
  dictionary.c("v", "gk", "a portion","ν"); // Not in greek originally
  dictionary.c("w", "gk", "origin or initial definition [a] from the spread of information towards the origin [γ] that descriptable rationalizes [μ] everything [ω, a+b] towards a projection of what is describable between limits [έ] (ωμέ’γα)","ω");
  dictionary.c("x", "gk", "here","χ");
  dictionary.c("y", "gk", "describes [i] what is rationally descriptable [ψ]","ψ");
  dictionary.c("z", "gk", "origin or initial definition that projects the describable singular set or model as a magnitude limit towards what exists (ζήτ’α)","ζ");

  dictionary.c("á", "gk", "a projection of an origin","ά");
  dictionary.c("é", "gk", "a projection of a representation","έ");
  dictionary.c("í", "gk", "a projection of a description","ί");
  dictionary.c("ó", "gk", "a projection of a definition","ό");
  dictionary.c("ú", "gk", "a rational projection","ύ");

  dictionary.c("A", "gk", "origin [ά] of a direction [λ] that projects the initial definition [ά] to what is within or between a projected description [Φ].","Α");
  dictionary.c("B", "gk", "initial definition [α] that projects a singular set [ή] contained in the conclusion [β]","Β");
  dictionary.c("C", "gk", "Describes [i] here (chi) [x] as what is describable between limits [Ξ]","Ξ");
  dictionary.c("D", "gk", "Origin or initial definition [α] from what exists [τ] that projects a description between describable limits [έ] towards the plurality of information as a distance from the end towards the origin [λ] from a defined portion of information [δ]","Δ");
  dictionary.c("E", "gk", "defines [o] the spread of information [λ] towards a portion of information [ν] that rationally describes [ψ] an integral description [ι] from what is representable (describable between limits) [έ]","Ε");
  dictionary.c("F", "gk", "describable [i] within the defined [o] [φ]","Φ");
  dictionary.c("G", "gk", "self contained describable rationalization of information [μ] within the origin or initial definition [α] from the spread of information [γ]","Γ");
  dictionary.c("H", "gk", "projects a model or singular describable set [ή] towards an initial definition [α] of what exists [t]","Η");
  dictionary.c("I", "gk", "origin or initial definition [α] from the projection of everything [ώ] that describes [I] what exists [+] (ιώτ’α)","Ι");
  dictionary.c("J", "gk", "a link","J");
  dictionary.c("K", "gk", "self contained border, edge [π] contained within an origin or initial definition [a] from the divergence of information [k] (Κ’άππα)","Κ");
  dictionary.c("L", "gk", "portion of defined information [δ] that concludes [β] its origin [α] as the projected origin [ά] of a direction [λ] (that projects the origin [ά] to what is within or between a description and a projection [λ]) towards a descriptable rationalization [μ] (λάμ’βδα)","Λ");
  //dictionary.c("M", "gk", "(ύψιλον).* a defined portion of information from the spread [λoν] that rationally describes a descriptable rational projection [ύψι]","Μ");
  dictionary.c("M", "gk", "rationalization from the plurality","Μ");
  dictionary.c("N", "gk", "rationalization from a singular set or portion","Ν");
  dictionary.c("O", "gk", "radius [ρ] that defines [o] the divergence of information [κ] towards a portion of information [v] that rationalizes [μ] a description [ι] from a projected definition [ό] (όμι’κρο’ν)","Ο");
  dictionary.c("P", "gk", "defines a description of what exists from the 'border' or 'edge' of the conclusion [ π ] describing the portion of information [ v ] or the information between describable limits [II]","Π");
  dictionary.c("Q", "gk", "origin or initial definition that projects a singular model or set towards what exists from the link/vector within or towards what is defined [θ] (θήτα)","Θ");
  dictionary.c("R", "gk", "everything [w] from the radius [ρ] (ρώ)","Ρ");
  dictionary.c("S", "gk", "an initial definition or origin from a descriptable rationalization [μα] that projects a description [ί] of the 'spread' of information [γ] from what is projectable within limits [Σ] (σίγ’μα)","Σ");
  dictionary.c("T", "gk", "origin or initial definition [ά] that rationalizes [u] what exists [t] (ταυ)","Τ");
  dictionary.c("U", "gk", "defines [o] a direction [λ] towards a portion of information [v] that rationally describes [ψ] an integral description [ι] a projected rationalization [ύ] (ύψι’λον)","Υ");
  dictionary.c("V", "gk", "a portion","Ν"); // Not in greek originally
  dictionary.c("W", "gk", "origin or initial definition [a] from the spread of information towards the origin [γ] that descriptable rationalizes [μ] everything [ω, a+b] towards a projection of what is describable between limits [έ] (ωμέ’γα)","Ω");
  dictionary.c("X", "gk", "here","Χ");
  dictionary.c("Y", "gk", "describes [i] what is rationally descriptable [ψ]","Ψ");
  dictionary.c("Z", "gk", "origin or initial definition that projects the describable singular set or model as a magnitude limit towards what exists (ζήτ’α)","ζ");

  dictionary.c("Á", "gk", "a projection of an origin [ά] as a direction [λ] that projects the initial definition [ά] to what is within or between a projected description [Φ].","Á");
  dictionary.c("É", "gk", "a projection of a definition [o] of the spread direction [λ] towards a singular set or portion of information [ν] that rationally describes [ψ] an integral description [ι] from what is representable (describable between limits) [έ]","É");
  dictionary.c("Í", "gk", "a projection of an origin or initial definition [α] from everything [ώ] that describes [I] what exists [+]","Í");
  dictionary.c("Ó", "gk", "a projection of a radius [ρ] that defines [o] the divergence of information [κ] towards a portion of information [v] that rationalizes [μ] a description [ι] from a projected definition [ό]","Ó");
  dictionary.c("Ú", "gk", "a projection of a definition [o] as a direction [λ] towards a portion of information [v] that rationally describes [ψ] an integral description [ι] from the projection of the rationalization [ύ]","Υ");

  return dictionary;

};

export default ABZeusDict;
