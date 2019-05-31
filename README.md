[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

This is a text adventure game built with React and Redux for the view layer and uses an entity component system, nano-ecs.js. It will also store the game data in a local database.

# Features

## Templating Descriptions
Description files utilize [moustace.js](https://github.com/janl/mustache.js/). This means that a description can embedd tags in the format of {{tag}}. These tags are replaced at runtime. 

Example:

```js
  //descriptions.js
  const Descriptions = ({
    Room: {
      standard: "This room has {{color}} walls."
    }
  })

 //template.js
 const Template = (entity) => ({
   color: () => {
     return entity.color
   }
 })
```

<!-- Live preview is not ready yet -->
<!-- This project is far from complete but a [live version](https://agray5.github.io/Text-Adventure) can be viewed.-->

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

