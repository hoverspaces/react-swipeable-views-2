# About the project
 
 ## Description 

 This project lets you swipe swipe on the present component left and right to move the renderer to the component on the right and component on the left respectivly. You can set up an array of components to be selected back and forth.

## Installation

```
npm install --save react-swipeable-views-2
```

 ## Usage

 components to be shown as the swipeable screen is written inside the project component as shown below.

 ```js
 import React from 'react';
 import SwipeableScreens from 'react-swipeable-views-2'

const MyComponent = () => (
 <SwipeableScreens className="w-full">
        
         <div className="h-40 w-full bg-green-500">
            slide number 1
          </div>

           <div className="h-40 w-full bg-red-500">
            slide number 2
          </div>

           <div className="h-40 w-full bg-yellow-400">
            slide number 3
          </div>

           <div className="h-40 w-full bg-blue-500">
            slide number 4
          </div>

 </SwipeableScreens>
 );

export default MyComponent;
 
```
