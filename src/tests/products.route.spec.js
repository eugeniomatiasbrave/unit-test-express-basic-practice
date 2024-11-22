import request  from 'supertest'; // para generar una petición http con la libreria supertest
import app from '../app.js'; // importa la aplicación Express

describe('GET: api/products', () => {

  test('Should resoponse with a 200 status code', async () => {
   const response = await request(app).get('/api/products').send(); // hace una petición GET a /api/products
   expect(response.statusCode).toBe(200);  // verifica que el código de estado de la respuesta sea 200
  });
 
  test('Should resoponse with a array', async () => {
   const response = await request(app).get('/api/products').send(); // hace una petición GET a /api/products
   expect(response.body).toBeInstanceOf(Array);  // espera un objeto array
  });
});

describe('POST: api/products', () => {
 describe(' given a title and description', () => {

  const newProduct = {
    title: 'Product 1',
    description: 'Description of product 1'
  };

  test('Should response with a 200 status code', async () => {
    const response = await request(app).post('/api/products').send(newProduct); // hace una petición POST a /api/products
    expect(response.statusCode).toBe(200);  // verifica que el código de estado de la respuesta sea 200
   });
 
   test('Should have a content-type application/json', async () => {
     const response = await request(app).post('/api/products').send(newProduct); // hace una petición POST a /api/products
     expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json')); // verifica que el tipo de contenido de la respuesta sea application/json
   });
 
   test('Should response with a JSON objet', async () => {
     const response = await request(app).post('/api/products').send(newProduct); // hace una petición POST a /api/products
     expect(response.body.id).toBeDefined(); 
   });

  });

  // Test de error: cuando falta el título y la descripción
   describe('When title and description is missing', () => {
    // compruebo tres pocibles casos: {}, sin title y sin description
    // para no repetir el codigo tres veces simplifico creando un array con la tres opciones.
    const testCases = [
      {}, // caso 1. objeto vacio
      { title: 'Product 1'}, // caso 2. con title  pero sin description
      { description: 'Product 1 bla la bla describe...' } // caso 3. con description pero sin title
    ];
    // recorre la tres opciones buscando el error 400
    test.each(testCases)('Should response with a 400 status code', async (testCase) => {
      const response = await request(app).post('/api/products').send(testCase); // se envia el objeto testCase
      expect(response.statusCode).toBe(400); // verifica que el código de estado de la respuesta sea 400
    });
  });
});

// Resultado de la ejecución de los test:
/*
PASS  src/tests/products.route.spec.js
GET: api/products
  √ Should resoponse with a 200 status code (56 ms)                                                                       
  √ Should resoponse with a array (10 ms)                                                                                 
POST: api/products                                                                                                        
   given a title and description                                                                                          
    √ Should response with a 200 status code (22 ms)                                                                      
    √ Should have a content-type application/json (15 ms)                                                                 
    √ Should response with a JSON objet (14 ms)                                                                           
  When title and description is missing                                                                                   
    √ Should response with a 400 status code (18 ms)                                                                      
    √ Should response with a 400 status code (10 ms)                                                                      
    √ Should response with a 400 status code (8 ms)                                                                       
                                                                                                                          
Test Suites: 1 passed, 1 total                                                                                              
Tests:       8 passed, 8 total                                                                                              
Snapshots:   0 total
Time:        0.92 s, estimated 1 s
Ran all test suites matching /src\\tests\\products.route.spec.js/i.
*/
