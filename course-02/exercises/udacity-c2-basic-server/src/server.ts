import express, { Router, Request, Response } from 'express';
import { request } from 'http';
// import bodyParser from 'body-parser'; deprecated
const bodyParser = require('body-parser')

import { Car, cars as cars_list } from './cars';

(async () => {
  let cars:Car[]  = cars_list;

  //Create an express application
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 
  app.use(express.urlencoded({ extended: true })) //for requests from forms-like data

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name", 
    ( req: Request, res: Response ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}! thaba7`);
  } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post( "/persons", 
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required from post`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater
  app.get("/cars/", (req: Request, res: Response) => {
      let { make } = req.query;

      let carsMadeByMaker = cars;
      
      if ( make ) {
        carsMadeByMaker = cars.filter((car)=> car.make === make)
      }

      return res.status(200).send(carsMadeByMaker);
  })

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found

  app.get("/cars/:id", ( req: Request, res: Response ) => {
    let { id } = req.params;

    if ( !id ) {
      return res.status(400)
      .send(`id is required from get`);
    }
    let carsWithId = cars;
    carsWithId = cars.filter( car => (car.id).toString() == id );

    if(carsWithId && carsWithId.length === 0){
      return res.status(404)
      .send(`Car with ${id} Not found`);
    }

    return res.status(200).send(carsWithId);
})

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
  app.post("/cars/" , (req: Request , res: Response) => {
    let {make , type , model , cost , id} = req.body;

    if(!make || !type || !model || !cost || !id ){
      return res.status(400)
      .send(`make , type , model , cost , id is required from post`);
    }

    const new_car: Car = {
      make: make, type: type, model: model, cost: cost, id: id
    }

    cars.push(new_car);
    return res.status(201).send(new_car);

  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
