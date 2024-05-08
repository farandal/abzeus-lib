export const removeConnectors = (phrase: string):string => {
    // Remove connectors from phrase
    const connectors = ["is", "es"];
    const nouns = ["el","the"];
    // Create a regular expression that matches any of the connectors
    const connectorsRegex = new RegExp("\\b(" + connectors.join("|") + ")\\b", "gi");
    const nounsRegex = new RegExp("\\b(" + nouns.join("|") + ")\\b", "gi");
    
    // Use the replace() method to remove the connectors
    
    return phrase.replace(nounsRegex, "").replace(connectorsRegex, "").replace(/  +/g, ' ');

}

