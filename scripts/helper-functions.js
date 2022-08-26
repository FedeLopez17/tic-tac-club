const helperFunctions = {
    setAttributes: (element, attributes, values)=>{
        for (let index in attributes){
            element.setAttribute(attributes[index], values[index])
        }
    },
    appendChildren: (parent, children)=>{
        for (let child of children){
            parent.appendChild(child);
        }
    },
    clearPreviousScreen: ()=>{
        const body = $("body");
        const previousScreen = $$("body > :not(script):not(.volume-toggle):not(.music-toggle):not(.song-title-container)");
        for (let element of previousScreen){
            body.removeChild(element);
        }
    },
    removeAllChildren: (parentNode)=>{
        while (parentNode.firstChild){
            parentNode.removeChild(parentNode.firstChild)
        }
    },
    toKebabCase: (string)=>{
        return string.toLowerCase().replace(/\s/g, "-");
    }, 
    randomIntFromRangeInclusive: (min, max)=>{
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}